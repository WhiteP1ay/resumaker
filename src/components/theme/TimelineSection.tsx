import { TimelineSectionManager } from '@/components/editors/TimelineSectionManager';
import { IconRenderer } from '@/components/IconPicker';
import { TimelineContent } from '@/components/theme/TimelineContentRenderer';
import { Button } from '@/components/ui/button';
import { useResumeEditor } from '@/hooks/components/useResumeEditor';
import type { ResumeSection, TimelineItem } from '@/types/resume';
import { Settings2 } from 'lucide-react';
import React, { useState } from 'react';

interface TimelineSectionProps {
  section: ResumeSection;
  isEditable?: boolean;
  className?: string;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ section, isEditable, className }) => {
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
      <div className={`relative ${className || ''}`}>
        <div className="mb-6 print:mb-6">
          <div className="flex items-center pb-[.5rem] border-b-gray-400 border-b-[1px] group/header">
            <h2 className="section-title text-2xl font-bold text-gray-900">{section.title}</h2>
            {section.iconName && (
              <div className="p-2">
                <IconRenderer iconName={section.iconName} className="h-4 w-4" />
              </div>
            )}
            {isEditable && (
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto opacity-0 group-hover/header:opacity-100 transition-opacity duration-200 hover:bg-gray-100 h-7 w-7 print:hidden"
                onClick={() => setIsManagerOpen(true)}
                title="管理条目"
              >
                <Settings2 className="h-3.5 w-3.5 text-gray-500" />
              </Button>
            )}
          </div>

          <div className="mt-[.5rem]">
            <TimelineContent
              data={section.data as TimelineItem[]}
              isEditable={isEditable}
              onUpdateItem={handleUpdateItem}
            />
          </div>
        </div>
      </div>

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
