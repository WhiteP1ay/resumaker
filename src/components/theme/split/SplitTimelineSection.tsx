import { IconRenderer } from '@/components/IconPicker';
import { TimelineContent } from '@/components/theme/TimelineContentRenderer';
import { useResumeEditor } from '@/hooks/components/useResumeEditor';
import type { ResumeSection, TimelineItem } from '@/types/resume';

interface SplitTimelineSectionProps {
  section: ResumeSection;
  isEditable?: boolean;
  className?: string;
}

export const SplitTimelineSection = ({ section, isEditable, className }: SplitTimelineSectionProps) => {
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
      <section className={className || ''}>
        <div className="flex items-center pb-2 border-b border-slate-300 group/header">
          <span
            className="inline-block h-5 w-1.5 rounded-sm mr-2.5"
            style={{ backgroundColor: 'var(--split-title-prefix)' }}
            aria-hidden="true"
          />
          <h2 className="section-title text-[2rem] font-bold text-slate-900 leading-tight">{section.title}</h2>
          {section.iconName && (
            <div className="ml-2 text-slate-600">
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
      </section>
    </>
  );
};
