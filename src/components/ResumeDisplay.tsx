import type { Resume } from '@/types/resume';
import { ThemeRenderer } from './theme/ThemeRenderer';
import { DEFAULT_THEME } from './theme/themeTypes';

interface ResumeDisplayProps {
  resume: Resume;
  isEditable?: boolean;
  className?: string;
}

export const ResumeDisplay = ({ resume, isEditable = false, className = '' }: ResumeDisplayProps) => {
  const getSectionClassName = (sectionId: string, defaultClass: string): string => {
    const custom = resume.style?.sections?.find((s) => s.sectionId === sectionId)?.className;
    return custom ? `${defaultClass} ${custom}` : defaultClass;
  };
  const theme = resume.style?.theme === 'split' ? 'split' : DEFAULT_THEME;
  return (
    <ThemeRenderer
      theme={theme}
      resume={resume}
      isEditable={isEditable}
      className={className}
      getSectionClassName={getSectionClassName}
    />
  );
};
