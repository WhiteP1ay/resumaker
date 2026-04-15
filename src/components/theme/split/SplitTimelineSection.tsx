import { IconRenderer } from '@/components/IconPicker';
import { TimelineContent } from '@/components/theme/TimelineContentRenderer';
import { useResumeEditor } from '@/hooks/components/useResumeEditor';
import { resumeAtom } from '@/store/resumeStore';
import type { ResumeSection, TimelineItem, TimelineTitleStyle } from '@/types/resume';
import { useAtomValue } from 'jotai';

interface SplitTimelineSectionProps {
  section: ResumeSection;
  isEditable?: boolean;
  className?: string;
}

export const SplitTimelineSection = ({ section, isEditable, className }: SplitTimelineSectionProps) => {
  const { handleTimelineSave } = useResumeEditor(section.id);
  const resume = useAtomValue(resumeAtom);
  const timelineTitleStyle: TimelineTitleStyle = resume.style?.timelineTitleStyle ?? 'style1';

  const handleUpdateItem = (updatedItem: TimelineItem) => {
    const items = section.data as TimelineItem[];
    handleTimelineSave(
      items.map((i) => (i.id === updatedItem.id ? updatedItem : i)),
      section.iconName
    );
  };
  const titlePrefixColor = 'var(--split-title-prefix)';
  const titleIconColor = 'var(--split-title-icon-color)';

  const renderTitle = () => {
    if (timelineTitleStyle === 'style2') {
      return (
        <div className="group/header">
          <div
            className="inline-flex items-center px-4 py-2.5 font-bold"
            style={{
              color: titlePrefixColor,
              backgroundColor: 'var(--split-info-card-bg)',
              clipPath: 'polygon(0 0, 92% 0, 100% 100%, 0 100%)',
            }}
          >
            <h2 className="section-title text-[2rem] leading-tight pr-4">{section.title}</h2>
          </div>
        </div>
      );
    }

    if (timelineTitleStyle === 'style3') {
      return (
        <div className="group/header">
          <div className="inline-flex items-center gap-2.5">
            <div
              className="h-8 w-8 rounded-full border inline-flex items-center justify-center bg-white"
              style={{ borderColor: titlePrefixColor, color: titleIconColor }}
              aria-hidden="true"
            >
              <IconRenderer iconName={section.iconName || 'star'} className="h-4 w-4" />
            </div>
            <h2 className="section-title text-[2rem] font-bold text-slate-900 leading-tight">{section.title}</h2>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center pb-2 border-b border-slate-300 group/header">
        <span
          className="inline-block h-5 w-1.5 rounded-sm mr-2.5"
          style={{ backgroundColor: titlePrefixColor }}
          aria-hidden="true"
        />
        <h2 className="section-title text-[2rem] font-bold text-slate-900 leading-tight">{section.title}</h2>
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
      <section className={className || ''}>
        {renderTitle()}
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
