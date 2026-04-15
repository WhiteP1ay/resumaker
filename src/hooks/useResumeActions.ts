import {
  addSectionAtom,
  deleteSectionAtom,
  getNonBasicSectionsAtom,
  getSectionAtom,
  resetResumeAtom,
  updateMultipleSectionsPageAtom,
  updatePageSettingsAtom,
  updateSectionDataAtom,
  updateSectionPropsAtom,
  updateSectionsOrderAtom,
} from '@/store/resumeStore';
import type { BasicInfo, TimelineItem } from '@/types/resume';
import { useAtomValue, useSetAtom } from 'jotai';

export const useResumeActions = () => {
  const updateSectionData = useSetAtom(updateSectionDataAtom);
  const updateSectionProps = useSetAtom(updateSectionPropsAtom);
  const updateSectionsOrder = useSetAtom(updateSectionsOrderAtom);
  const addSection = useSetAtom(addSectionAtom);
  const deleteSection = useSetAtom(deleteSectionAtom);
  const updatePageSettings = useSetAtom(updatePageSettingsAtom);
  const updateMultipleSectionsPage = useSetAtom(updateMultipleSectionsPageAtom);
  const resetResume = useSetAtom(resetResumeAtom);

  const getSection = useAtomValue(getSectionAtom);
  const getNonBasicSections = useAtomValue(getNonBasicSectionsAtom);

  const updateSection = (
    sectionId: string,
    data: BasicInfo | TimelineItem[],
    iconName?: string
  ) => {
    updateSectionData({ sectionId, data, iconName });
  };

  const updateSectionIcon = (sectionId: string, iconName: string) => {
    updateSectionProps({ sectionId, props: { iconName } });
  };

  const updateSectionTitle = (sectionId: string, title: string) => {
    updateSectionProps({ sectionId, props: { title } });
  };

  const toggleSectionVisibility = (sectionId: string) => {
    const section = getSection(sectionId);
    if (section) {
      updateSectionProps({ sectionId, props: { visible: !section.visible } });
    }
  };

  const toggleMultiPageMode = (enabled: boolean, totalPages = 2) => {
    updatePageSettings({ enableMultiPage: enabled, totalPages });
  };

  const batchSetSectionsPage = (updates: Array<{ sectionId: string; pageNumber: number }>) => {
    updateMultipleSectionsPage(updates);
  };

  return {
    updateSection,
    updateSectionIcon,
    updateSectionTitle,
    toggleSectionVisibility,
    toggleMultiPageMode,
    batchSetSectionsPage,
    updateSectionsOrder,
    addSection,
    deleteSection,
    getSection,
    getNonBasicSections,
    clearResume: resetResume,
  };
};
