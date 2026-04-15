import { useResumeEditor } from '@/hooks/components/useResumeEditor';
import type { ResumeSection, TimelineItem } from '@/types/resume';
import { useState } from 'react';

export const useTimelineSection = (section: ResumeSection) => {
  const [isEditing, setIsEditing] = useState(false);
  const { handleTimelineSave } = useResumeEditor(section.id);

  const startEditing = () => setIsEditing(true);
  const closeEditing = () => setIsEditing(false);

  const handleSave = (data: TimelineItem[], iconName?: string) => {
    handleTimelineSave(data, iconName);
  };

  const getEditorProps = () => ({
    isOpen: isEditing,
    onClose: closeEditing,
    onSave: handleSave,
    title: section.title,
    currentIcon: section.iconName || 'briefcase',
    initialData: section.data as TimelineItem[],
  });

  return { isEditing, startEditing, closeEditing, handleSave, getEditorProps };
};
