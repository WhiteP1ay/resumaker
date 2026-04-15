import { DEFAULT_THEME_COLOR_TOKENS } from '@/components/theme/themeTokens';
import type { BasicInfo, Resume, ResumeSection, ResumeStyle, TimelineItem } from '@/types/resume';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { initialResume } from './initialResume';


export const resumeAtom = atomWithStorage<Resume>('resume-data', initialResume);

export const resetResumeAtom = atom(null, (_get, set) => {
  set(resumeAtom, initialResume);
});

export const updateSectionDataAtom = atom(
  null,
  (
    get,
    set,
    update: { sectionId: string; data: BasicInfo | TimelineItem[]; iconName?: string }
  ) => {
    const resume = get(resumeAtom);
    const updatedSections = resume.sections.map((section) => {
      if (section.id === update.sectionId) {
        return {
          ...section,
          data: update.data,
          ...(update.iconName !== undefined && { iconName: update.iconName }),
        };
      }
      return section;
    });
    set(resumeAtom, { ...resume, sections: updatedSections });
  }
);

export const updateSectionPropsAtom = atom(
  null,
  (get, set, update: { sectionId: string; props: Partial<Omit<ResumeSection, 'id' | 'data'>> }) => {
    const resume = get(resumeAtom);
    const updatedSections = resume.sections.map((section) => {
      if (section.id === update.sectionId) {
        return { ...section, ...update.props };
      }
      return section;
    });
    set(resumeAtom, { ...resume, sections: updatedSections });
  }
);

export const updateSectionsOrderAtom = atom(null, (get, set, sections: ResumeSection[]) => {
  const resume = get(resumeAtom);
  const basicSection = resume.sections.find((section) => section.type === 'basic');
  const allSections = basicSection ? [basicSection, ...sections] : sections;
  set(resumeAtom, { ...resume, sections: allSections });
});

export const addSectionAtom = atom(null, (get, set, section: ResumeSection) => {
  const resume = get(resumeAtom);
  set(resumeAtom, { ...resume, sections: [...resume.sections, section] });
});

export const deleteSectionAtom = atom(null, (get, set, sectionId: string) => {
  const resume = get(resumeAtom);
  const updatedSections = resume.sections.filter((section) => section.id !== sectionId);
  set(resumeAtom, { ...resume, sections: updatedSections });
});

export const getSectionAtom = atom((get) => {
  return (sectionId: string) => {
    const resume = get(resumeAtom);
    return resume.sections.find((section) => section.id === sectionId);
  };
});

export const getNonBasicSectionsAtom = atom((get) => {
  const resume = get(resumeAtom);
  return resume.sections
    .filter((section) => section.type !== 'basic')
    .sort((a, b) => a.order - b.order);
});

export const updatePageSettingsAtom = atom(
  null,
  (get, set, pageSettings: { enableMultiPage: boolean; totalPages: number }) => {
    const resume = get(resumeAtom);
    set(resumeAtom, { ...resume, pageSettings });
  }
);

export const updateMultipleSectionsPageAtom = atom(
  null,
  (get, set, updates: Array<{ sectionId: string; pageNumber: number }>) => {
    const resume = get(resumeAtom);
    const updatedSections = resume.sections.map((section) => {
      const update = updates.find((u) => u.sectionId === section.id);
      return update ? { ...section, pageNumber: update.pageNumber } : section;
    });
    set(resumeAtom, { ...resume, sections: updatedSections });
  }
);

export const updateResumeStyleAtom = atom(
  null,
  (get, set, styleUpdate: Partial<ResumeStyle> | ((prev: ResumeStyle) => Partial<ResumeStyle>)) => {
    const resume = get(resumeAtom);
    const rawTokens = (resume.style?.themeColorTokens ?? {}) as Record<string, Record<string, string> | undefined>;
    const currentStyle: ResumeStyle = {
      sections: resume.style?.sections ?? [],
      customCSS: resume.style?.customCSS ?? '',
      theme: resume.style?.theme === 'split' ? 'split' : 'minimal',
      themeColorTokens: {
        ...DEFAULT_THEME_COLOR_TOKENS,
        ...(rawTokens.minimal ? { minimal: { ...DEFAULT_THEME_COLOR_TOKENS.minimal, ...rawTokens.minimal } } : {}),
        ...(rawTokens.split ? { split: { ...DEFAULT_THEME_COLOR_TOKENS.split, ...rawTokens.split } } : {}),
      },
    };
    const resolvedUpdate = typeof styleUpdate === 'function' ? styleUpdate(currentStyle) : styleUpdate;
    const nextStyle: ResumeStyle = { ...currentStyle, ...resolvedUpdate };
    set(resumeAtom, { ...resume, style: nextStyle });
  }
);

