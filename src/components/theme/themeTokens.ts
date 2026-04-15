import type { ResumeTheme, ThemeColorTokenMap, ThemeColorTokens } from '@/types/resume';

export type ThemeTokenEditor = 'color' | 'length';
export type ThemeTokenGroup = 'paper' | 'basicInfo' | 'timeline';

export interface ThemeTokenDefinition {
  key: string;
  label: string;
  description: string;
  cssVar: string;
  defaultValue: string;
  /** 默认 color：取色器 + 文本；length：仅文本（如 rem/px） */
  editor?: ThemeTokenEditor;
  /** token 所属分组，用于主题设置分区渲染 */
  group?: ThemeTokenGroup;
}

export const THEME_TOKEN_DEFINITIONS: Record<ResumeTheme, ThemeTokenDefinition[]> = {
  minimal: [
    {
      key: 'paperBackground',
      label: '纸张颜色',
      description: '整页纸张背景色',
      cssVar: '--minimal-paper-bg',
      defaultValue: '#ffffff',
      group: 'paper',
    },
    {
      key: 'basicInfoBackground',
      label: '基础信息背景色',
      description: '仅基础信息区域背景色',
      cssVar: '--minimal-basic-info-bg',
      defaultValue: '#ffffff',
      group: 'basicInfo',
    },
    {
      key: 'textPrimary',
      label: '字体颜色1',
      description: '仅基础信息区域标题文字颜色',
      cssVar: '--minimal-text-primary',
      defaultValue: '#111827',
      group: 'basicInfo',
    },
    {
      key: 'basicInfoText',
      label: '字体颜色2',
      description: '仅基础信息区域字段字体颜色',
      cssVar: '--minimal-basic-info-text',
      defaultValue: '#4b5563',
      group: 'basicInfo',
    },
    {
      key: 'basicInfoBottomSpacing',
      label: '基本信息下间距',
      description: '基础信息区域底部外侧间距（如 1.5rem、24px）',
      cssVar: '--minimal-basic-info-bottom-spacing',
      defaultValue: '0rem',
      editor: 'length',
      group: 'basicInfo',
    },
    {
      key: 'timelineTitleBackground',
      label: '标题背景色',
      description: '时间线大标题背景色',
      cssVar: '--minimal-timeline-title-bg',
      defaultValue: '#ffffff',
      group: 'timeline',
    },
    {
      key: 'timelineTitleBorder',
      label: '标题边框色',
      description: '时间线大标题边框色',
      cssVar: '--minimal-timeline-title-border',
      defaultValue: '#ffffff',
      group: 'timeline',
    },
    {
      key: 'timelineTitleAccent',
      label: '标题强调色',
      description: '时间线大标题文字强调色',
      cssVar: '--minimal-timeline-title-accent',
      defaultValue: '#000000',
      group: 'timeline',
    },
    {
      key: 'timelineTitleIconColor',
      label: '标题图标颜色',
      description: '时间线标题图标颜色（独立于标题文字颜色）',
      cssVar: '--minimal-timeline-title-icon-color',
      defaultValue: '#000000',
      group: 'timeline',
    },
    {
      key: 'timelineTitleMarginLeft',
      label: '标题左外边距',
      description: '时间线标题整体左外边距（如 0px、12px、1rem）',
      cssVar: '--minimal-timeline-title-margin-left',
      defaultValue: '-1rem',
      editor: 'length',
      group: 'timeline',
    },
    {
      key: 'timelineTitleFontSize',
      label: '标题字体大小',
      description: '时间线标题字号（如 2rem、32px）',
      cssVar: '--minimal-timeline-title-font-size',
      defaultValue: '2rem',
      editor: 'length',
      group: 'timeline',
    },
    {
      key: 'timelineTitlePrefixColor',
      label: '标题前方块颜色',
      description: '时间线标题前的小方块颜色',
      cssVar: '--minimal-timeline-title-prefix-color',
      defaultValue: '#000000',
      group: 'timeline',
    },
  ],
  split: [
    {
      key: 'sidebarBackground',
      label: '背景色1',
      description: '左侧栏背景',
      cssVar: '--split-sidebar-bg',
      defaultValue: '#f1f5f9',
    },
    {
      key: 'sidebarBorder',
      label: '背景色2',
      description: '左侧栏分割线',
      cssVar: '--split-sidebar-border',
      defaultValue: '#cbd5e1',
    },
    {
      key: 'accentBlock',
      label: '主题色1',
      description: '左侧顶部装饰色块',
      cssVar: '--split-accent-block',
      defaultValue: '#bef264',
    },
    {
      key: 'titlePrefix',
      label: '主题色2',
      description: '右侧标题前缀色',
      cssVar: '--split-title-prefix',
      defaultValue: '#f0abfc',
    },
    {
      key: 'infoCardBackground',
      label: '主题色3',
      description: '左栏信息卡背景',
      cssVar: '--split-info-card-bg',
      defaultValue: '#f5f3ff',
    },
    {
      key: 'titleIconColor',
      label: '标题图标颜色',
      description: '右侧时间线标题图标颜色（独立于标题文字颜色）',
      cssVar: '--split-title-icon-color',
      defaultValue: '#475569',
    },
  ],
};

export const DEFAULT_THEME_COLOR_TOKENS: Required<ThemeColorTokenMap> = {
  minimal: Object.fromEntries(
    THEME_TOKEN_DEFINITIONS.minimal.map((definition) => [definition.key, definition.defaultValue]),
  ),
  split: Object.fromEntries(
    THEME_TOKEN_DEFINITIONS.split.map((definition) => [definition.key, definition.defaultValue]),
  ),
};

const normalizeTheme = (theme: string): ResumeTheme => {
  return theme === 'split' ? 'split' : 'minimal';
};

/**
 * 历史 watermelon token（仅用于兼容迁移）。
 */
export const LEGACY_WATERMELON_TOKEN_KEYS = {
  headerBorder: 'headerBorder',
  titleBackground: 'titleBackground',
  titleBorder: 'titleBorder',
  titleAccent: 'titleAccent',
} as const;

export const getThemeTokens = (
  theme: ResumeTheme | string,
  tokenMap?: ThemeColorTokenMap,
): ThemeColorTokens => ({
  ...DEFAULT_THEME_COLOR_TOKENS[normalizeTheme(theme)],
  ...(tokenMap?.[normalizeTheme(theme)] ?? {}),
});

export const getThemeCssVariables = (
  theme: ResumeTheme | string,
  tokenMap?: ThemeColorTokenMap,
): Record<string, string> => {
  const safeTheme = normalizeTheme(theme);
  const tokens = getThemeTokens(safeTheme, tokenMap);
  const definitions = THEME_TOKEN_DEFINITIONS[safeTheme];
  return definitions.reduce<Record<string, string>>((vars, definition) => {
    vars[definition.cssVar] = tokens[definition.key] ?? definition.defaultValue;
    return vars;
  }, {});
};
