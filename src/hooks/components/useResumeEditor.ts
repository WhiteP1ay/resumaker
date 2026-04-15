import { useResumeActions } from '@/hooks/useResumeActions';
import type { BasicInfo, TimelineItem } from '@/types/resume';

export const useResumeEditor = (sectionId: string) => {
  const { updateSection } = useResumeActions();

  const handleTimelineSave = (data: TimelineItem[], iconName?: string) => {
    updateSection(sectionId, data, iconName);
  };

  const handleBasicInfoSave = (data: BasicInfo) => {
    updateSection(sectionId, data);
  };

  return { handleTimelineSave, handleBasicInfoSave };
};
