import { IconRenderer } from '@/components/IconPicker';
import { TimelineContent } from '@/components/theme/TimelineContentRenderer';
import { useResumeEditor } from '@/hooks/components/useResumeEditor';
import type { ResumeSection, TimelineItem } from '@/types/resume';
import React from 'react';

interface TimelineSectionProps {
  section: ResumeSection;
  isEditable?: boolean;
  className?: string;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  section,
  isEditable,
  className,
}) => {
  const { handleTimelineSave } = useResumeEditor(section.id);

  const handleUpdateItem = (updatedItem: TimelineItem) => {
    const items = section.data as TimelineItem[];
    handleTimelineSave(
      items.map((i) => (i.id === updatedItem.id ? updatedItem : i)),
      section.iconName,
    );
  };

  return (
    <>
      <div className={`relative ${className || ''}`}>
        <div className="mb-6 print:mb-6">
          <div className="flex items-center pb-[.5rem] border-b-gray-400 border-b-[1px] group/header">
            <h2 className="section-title text-2xl font-bold leading-tight text-gray-900">
              {section.title}
            </h2>
            {section.iconName && (
              <div className="p-2">
                <IconRenderer iconName={section.iconName} className="h-4 w-4" />
              </div>
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
    </>
  );
};
