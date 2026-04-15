import type { LucideIcon } from 'lucide-react';

export interface CustomField {
  id: string;
  label: string;
  value: string;
  icon?: string;
  iconName: string;
}

export interface BasicInfo {
  avatar?: string;
  name: string;
  email: string;
  phone: string;
  gender?: string;
  age?: string;
  location?: string;
  website?: string;
  customFields?: CustomField[];
}

export interface TimelineItem {
  id: string;
  title: string;
  subtitle?: string;
  secondarySubtitle?: string;
  startDate?: string;
  endDate?: string;
  description: string;
}

export interface ResumeSection {
  id: string;
  title: string;
  iconName: string;
  type: 'basic' | 'timeline';
  visible: boolean;
  order: number;
  pageNumber?: number;
  data: BasicInfo | TimelineItem[];
}

export interface SectionStyle {
  sectionId: string;
  className?: string;
}

export type ResumeTheme = 'minimal' | 'split';
export type ThemeColorTokens = Record<string, string>;
export type TimelineTitleStyle = 'style1' | 'style2' | 'style3';

export interface ThemeColorTokenMap {
  minimal?: ThemeColorTokens;
  split?: ThemeColorTokens;
}

export interface ResumeStyle {
  sections: SectionStyle[];
  customCSS?: string;
  theme?: ResumeTheme;
  themeColorTokens?: ThemeColorTokenMap;
  timelineTitleStyle?: TimelineTitleStyle;
}

export interface Resume {
  id: string;
  title: string;
  sections: ResumeSection[];
  template: string;
  layout: 'side-by-side' | 'top-bottom';
  pageSettings?: {
    enableMultiPage: boolean;
    totalPages: number;
  };
  style?: ResumeStyle;
}

export interface IconOption {
  name: string;
  icon: LucideIcon;
}
