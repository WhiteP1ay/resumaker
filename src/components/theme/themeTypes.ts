import type { Resume, ResumeTheme } from '@/types/resume';
import type { CSSProperties } from 'react';

export interface ThemeRenderProps {
  /**
   * 简历完整数据，来自全局 resumeAtom。
   */
  resume: Resume;
  /**
   * 是否处于编辑态（编辑页 true，预览页 false）。
   */
  isEditable: boolean;
  /**
   * 外层容器追加 className。
   */
  className?: string;
  /**
   * 统一生成 section class，确保自定义 CSS 映射仍可用。
   */
  getSectionClassName: (sectionId: string, defaultClass: string) => string;
  /**
   * 当前主题计算后的 CSS Variables。
   */
  themeStyle?: CSSProperties;
}

export const DEFAULT_THEME: ResumeTheme = 'minimal';
