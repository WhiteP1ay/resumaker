import { TimelineSectionManager } from '@/components/editors/TimelineSectionManager';
import { IconRenderer } from '@/components/IconPicker';
import { TimelineContent } from '@/components/theme/TimelineContentRenderer';
import { Button } from '@/components/ui/button';
import { useResumeEditor } from '@/hooks/components/useResumeEditor';
import type { ResumeSection, TimelineItem } from '@/types/resume';
import { Settings2 } from 'lucide-react';
import { useState } from 'react';

interface SplitTimelineSectionProps {
  section: ResumeSection;
  isEditable?: boolean;
  className?: string;
}

export const SplitTimelineSection = ({ section, isEditable, className }: SplitTimelineSectionProps) => {
  const { handleTimelineSave } = useResumeEditor(section.id);
  const [isManagerOpen, setIsManagerOpen] = useState(false);

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
          {isEditable && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto opacity-0 group-hover/header:opacity-100 transition-opacity duration-200 hover:bg-slate-100 h-7 w-7 print:hidden"
              onClick={() => setIsManagerOpen(true)}
              title="管理条目"
            >
              <Settings2 className="h-3.5 w-3.5 text-slate-500" />
            </Button>
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

      {isEditable && (
        <TimelineSectionManager
          isOpen={isManagerOpen}
          onClose={() => setIsManagerOpen(false)}
          initialData={section.data as TimelineItem[]}
          onSave={(data, iconName) => handleTimelineSave(data, iconName)}
          title={section.title}
          currentIcon={section.iconName || 'briefcase'}
        />
      )}
    </>
  );
};
