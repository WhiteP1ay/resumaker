import { IconRenderer } from '@/components/IconPicker';
import { TimelineContent } from '@/components/theme/TimelineContentRenderer';
import { useResumeEditor } from '@/hooks/components/useResumeEditor';
import type { ResumeSection, TimelineItem } from '@/types/resume';

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

  const handleUpdateItem = (updatedItem: TimelineItem) => {
    const items = section.data as TimelineItem[];
    handleTimelineSave(
      items.map((i) => (i.id === updatedItem.id ? updatedItem : i)),
      section.iconName
    );
  };

  return (
    <>
      <div className={`relative ${className || ''}`}>
        <div className="mb-6 print:mb-5">
          <div
            className="flex items-center rounded-lg px-3 py-2 border group/header"
            style={{
              backgroundColor: 'var(--minimal-timeline-title-bg)',
              borderColor: 'var(--minimal-timeline-title-border)',
              marginLeft: 'var(--minimal-timeline-title-margin-left)',
            }}
          >
            <span
              className="inline-block h-5 w-1.5 rounded-sm mr-2.5"
              style={{ backgroundColor: 'var(--minimal-timeline-title-prefix-color)' }}
              aria-hidden="true"
            />
            <h2
              className="section-title font-bold leading-tight"
              style={{
                color: 'var(--minimal-timeline-title-accent)',
                fontSize: 'var(--minimal-timeline-title-font-size, 2rem)',
              }}
            >
              {section.title}
            </h2>
            {section.iconName && (
              <div className="ml-2" style={{ color: 'var(--minimal-timeline-title-accent)' }}>
                <IconRenderer iconName={section.iconName} className="h-4 w-4" />
              </div>
            )}
          </div>
          <div className="mt-3">
            <TimelineContent
              data={section.data as TimelineItem[]}
              isEditable={isEditable}
              onUpdateItem={handleUpdateItem}
            />
          </div>
        </div>
      </div>
    </>
  );
};
