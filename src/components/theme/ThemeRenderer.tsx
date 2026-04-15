import type { ResumeTheme } from '@/types/resume';
import { MinimalTheme } from './minimal/MinimalTheme';
import { SplitTheme } from './split/SplitTheme';
import { getThemeCssVariables } from './themeTokens';
import type { ThemeRenderProps } from './themeTypes';

interface ThemeRendererProps extends ThemeRenderProps {
  theme: ResumeTheme;
}

export const ThemeRenderer = ({ theme, ...props }: ThemeRendererProps) => {
  const themeStyle = getThemeCssVariables(theme, props.resume.style?.themeColorTokens);
  switch (theme) {
    case 'split':
      return <SplitTheme {...props} themeStyle={themeStyle} />;
    default:
      return <MinimalTheme {...props} themeStyle={themeStyle} />;
  }
};
