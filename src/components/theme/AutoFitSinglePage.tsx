import type { CSSProperties, ReactNode } from 'react';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

const A4_HEIGHT_RATIO = 297 / 210;
const MIN_SCALE = 0.8;
const SCALE_EPSILON = 0.003;
const HEIGHT_EPSILON = 1;

type FitRenderProps = {
  pageRef: (node: HTMLDivElement | null) => void;
  contentRef: (node: HTMLDivElement | null) => void;
  pageStyle: CSSProperties;
  contentStyle: CSSProperties & { zoom?: number };
};

interface AutoFitSinglePageProps {
  enabled: boolean;
  children: (props: FitRenderProps) => ReactNode;
}

const clampScale = (scale: number) => Math.min(1, Math.max(MIN_SCALE, scale));

export const AutoFitSinglePage = ({ enabled, children }: AutoFitSinglePageProps) => {
  const pageNodeRef = useRef<HTMLDivElement | null>(null);
  const contentNodeRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const scaleRef = useRef(1);
  const [scale, setScale] = useState(1);
  const [targetHeight, setTargetHeight] = useState<number | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const measure = useCallback(() => {
    if (!enabled) {
      scaleRef.current = 1;
      setScale(1);
      setTargetHeight(null);
      setIsOverflowing(false);
      return;
    }

    const pageNode = pageNodeRef.current;
    const contentNode = contentNodeRef.current;
    if (!pageNode || !contentNode) return;

    const pageWidth = pageNode.getBoundingClientRect().width;
    if (!pageWidth) return;

    const nextTargetHeight = pageWidth * A4_HEIGHT_RATIO;
    const contentHeight = contentNode.getBoundingClientRect().height;
    if (!contentHeight) return;

    setTargetHeight(nextTargetHeight);

    const nextScale = clampScale(scaleRef.current * (nextTargetHeight / contentHeight));
    if (Math.abs(nextScale - scaleRef.current) > SCALE_EPSILON) {
      scaleRef.current = nextScale;
      setScale(nextScale);
    }

    setIsOverflowing(nextScale <= MIN_SCALE + SCALE_EPSILON && contentHeight > nextTargetHeight + HEIGHT_EPSILON);
  }, [enabled]);

  const scheduleMeasure = useCallback(() => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null;
      measure();
    });
  }, [measure]);

  useLayoutEffect(() => {
    scheduleMeasure();
  }, [scheduleMeasure]);

  useLayoutEffect(() => {
    if (!enabled) return;

    const pageNode = pageNodeRef.current;
    const contentNode = contentNodeRef.current;
    if (!pageNode || !contentNode) return;

    const resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(pageNode);
    resizeObserver.observe(contentNode);
    window.addEventListener('resize', scheduleMeasure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', scheduleMeasure);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [enabled, scheduleMeasure]);

  const pageRef = useCallback((node: HTMLDivElement | null) => {
    pageNodeRef.current = node;
  }, []);

  const contentRef = useCallback((node: HTMLDivElement | null) => {
    contentNodeRef.current = node;
  }, []);

  const pageStyle: CSSProperties = enabled && targetHeight ? { height: targetHeight } : {};
  const contentStyle: CSSProperties & { zoom?: number } =
    enabled && scale < 1
      ? {
          width: `${100 / scale}%`,
          zoom: scale,
        }
      : {};

  return (
    <>
      {enabled && isOverflowing && (
        <div className="resume-fit-warning mb-3 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 print:hidden">
          当前内容过多，已压缩到最小字号仍无法放入单页，请删减内容或开启多页模式。
        </div>
      )}
      {children({ pageRef, contentRef, pageStyle, contentStyle })}
    </>
  );
};
