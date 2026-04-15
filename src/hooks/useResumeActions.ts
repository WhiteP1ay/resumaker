import {
  addSectionAtom,
  deleteSectionAtom,
  getNonBasicSectionsAtom,
  getSectionAtom,
  resetResumeAtom,
  updateMultipleSectionsPageAtom,
  updatePageSettingsAtom,
  updateSectionDataAtom,
  updateResumeStyleAtom,
  updateSectionPropsAtom,
  updateSectionsOrderAtom,
} from '@/store/resumeStore';
import type {
  BasicInfo,
  ResumeTheme,
  SectionStyle,
  ThemeColorTokens,
  TimelineItem,
  TimelineTitleStyle,
} from '@/types/resume';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { DEFAULT_THEME_COLOR_TOKENS } from '@/components/theme/themeTokens';

export const useResumeActions = () => {
  const updateSectionData = useSetAtom(updateSectionDataAtom);
  const updateSectionProps = useSetAtom(updateSectionPropsAtom);
  const updateSectionsOrder = useSetAtom(updateSectionsOrderAtom);
  const addSection = useSetAtom(addSectionAtom);
  const deleteSection = useSetAtom(deleteSectionAtom);
  const updatePageSettings = useSetAtom(updatePageSettingsAtom);
  const updateMultipleSectionsPage = useSetAtom(updateMultipleSectionsPageAtom);
  const updateResumeStyle = useSetAtom(updateResumeStyleAtom);
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

  const updateTheme = (theme: ResumeTheme) => {
    updateResumeStyle({ theme });
  };

  const updateTimelineTitleStyle = (timelineTitleStyle: TimelineTitleStyle) => {
    updateResumeStyle({ timelineTitleStyle });
  };

  const updateCustomStyle = (customCSS: string, sections: SectionStyle[]) => {
    updateResumeStyle({ customCSS, sections });
  };

  const updateThemeTokens = useCallback(
    (theme: ResumeTheme, tokens: ThemeColorTokens) => {
      updateResumeStyle((prevStyle) => ({
        ...prevStyle,
        themeColorTokens: {
          ...DEFAULT_THEME_COLOR_TOKENS,
          ...(prevStyle?.themeColorTokens ?? {}),
          [theme]: {
            ...DEFAULT_THEME_COLOR_TOKENS[theme],
            ...tokens,
          },
        },
      }));
    },
    [updateResumeStyle]
  );

  const resetThemeTokens = useCallback(
    (theme: ResumeTheme) => {
      updateResumeStyle((prevStyle) => ({
        ...prevStyle,
        themeColorTokens: {
          ...DEFAULT_THEME_COLOR_TOKENS,
          ...(prevStyle?.themeColorTokens ?? {}),
          [theme]: { ...DEFAULT_THEME_COLOR_TOKENS[theme] },
        },
      }));
    },
    [updateResumeStyle]
  );

  return {
    updateSection,
    updateSectionIcon,
    updateSectionTitle,
    toggleSectionVisibility,
    toggleMultiPageMode,
    batchSetSectionsPage,
    updateTheme,
    updateTimelineTitleStyle,
    updateThemeTokens,
    resetThemeTokens,
    updateCustomStyle,
    updateSectionsOrder,
    addSection,
    deleteSection,
    getSection,
    getNonBasicSections,
    clearResume: resetResume,
  };
};
