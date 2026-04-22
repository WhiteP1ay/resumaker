import { IconRenderer } from '@/components/IconPicker';
import { TimelineContent } from '@/components/theme/TimelineContentRenderer';
import { useResumeEditor } from '@/hooks/components/useResumeEditor';
import { resumeAtom } from '@/store/resumeStore';
import type { ResumeSection, TimelineItem, TimelineTitleStyle } from '@/types/resume';
import { useAtomValue } from 'jotai';

interface MinimalTimelineSectionProps {
  section: ResumeSection;
  isEditable?: boolean;
  className?: string;
}

export const MinimalTimelineSection = ({
  section,
  isEditable,
  className,
}: MinimalTimelineSectionProps) => {
  const { handleTimelineSave } = useResumeEditor(section.id);
  const resume = useAtomValue(resumeAtom);
  const timelineTitleStyle: TimelineTitleStyle = resume.style?.timelineTitleStyle ?? 'style1';

  const handleUpdateItem = (updatedItem: TimelineItem) => {
    const items = section.data as TimelineItem[];
    handleTimelineSave(
      items.map((i) => (i.id === updatedItem.id ? updatedItem : i)),
      section.iconName,
    );
  };

  const titleColor = 'var(--minimal-timeline-title-accent)';
  const titleIconColor = 'var(--minimal-timeline-title-icon-color)';
  const titlePrefixColor = 'var(--minimal-timeline-title-prefix-color)';
  const titleFontSize = 'var(--minimal-timeline-title-font-size, 2rem)';
  const titleMarginLeft = 'var(--minimal-timeline-title-margin-left)';

  const renderTitle = () => {
    if (timelineTitleStyle === 'style2') {
      return (
        <div className="group/header">
          <div
            className="inline-flex items-center px-4 py-2.5 font-bold"
            style={{
              color: titleColor,
              backgroundColor: 'var(--minimal-basic-info-bg)',
              marginLeft: titleMarginLeft,
              clipPath: 'polygon(0 0, 92% 0, 100% 100%, 0 100%)',
            }}
          >
            <h2 className="section-title leading-tight pr-4" style={{ fontSize: titleFontSize }}>
              {section.title}
            </h2>
          </div>
        </div>
      );
    }

    if (timelineTitleStyle === 'style3') {
      return (
        <div className="group/header" style={{ marginLeft: titleMarginLeft }}>
          <div className="inline-flex items-center gap-2.5">
            <div
              className="h-8 w-8 rounded-full border inline-flex items-center justify-center"
              style={{
                borderColor: titlePrefixColor,
                color: titleIconColor,
                backgroundColor: 'var(--minimal-timeline-title-bg)',
              }}
              aria-hidden="true"
            >
              <IconRenderer iconName={section.iconName || 'star'} className="h-4 w-4" />
            </div>
            <h2
              className="section-title font-bold leading-tight"
              style={{ color: titleColor, fontSize: titleFontSize }}
            >
              {section.title}
            </h2>
          </div>
        </div>
      );
    }

    return (
      <div
        className="flex items-center rounded-lg px-3 py-1 border group/header"
        style={{
          backgroundColor: 'var(--minimal-timeline-title-bg)',
          borderColor: 'var(--minimal-timeline-title-border)',
          marginLeft: titleMarginLeft,
        }}
      >
        <span
          className="inline-block h-5 w-1.5 rounded-sm mr-2.5"
          style={{ backgroundColor: titlePrefixColor }}
          aria-hidden="true"
        />
        <h2
          className="section-title font-bold leading-tight"
          style={{ color: titleColor, fontSize: titleFontSize }}
        >
          {section.title}
        </h2>
        {section.iconName && (
          <div className="ml-2" style={{ color: titleIconColor }}>
            <IconRenderer iconName={section.iconName} className="h-4 w-4" />
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className={`relative ${className || ''}`}>
        {renderTitle()}
        <TimelineContent
          data={section.data as TimelineItem[]}
          isEditable={isEditable}
          onUpdateItem={handleUpdateItem}
        />
      </div>
    </>
  );
};
