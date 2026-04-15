import { THEME_TOKEN_DEFINITIONS, getThemeTokens } from '@/components/theme/themeTokens';
import { useResumeActions } from '@/hooks/useResumeActions';
import { resumeAtom } from '@/store/resumeStore';
import type { ResumeTheme } from '@/types/resume';
import { useAtomValue } from 'jotai';
import { ChevronDown, ChevronUp, Columns2, RotateCcw, Sparkles } from 'lucide-react';
import type { ComponentType } from 'react';
import { useMemo, useState } from 'react';

interface ThemeOption {
  id: ResumeTheme;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}

const themeOptions: ThemeOption[] = [
  {
    id: 'minimal',
    title: 'Minimal',
    description: '极简布局',
    icon: Sparkles,
  },
  {
    id: 'split',
    title: 'Split',
    description: '左右分栏',
    icon: Columns2,
  },
];

export const ThemeSelectPanel = () => {
  const resume = useAtomValue(resumeAtom);
  const { updateTheme, updateThemeTokens, resetThemeTokens } = useResumeActions();
  const activeTheme = resume.style?.theme ?? 'minimal';
  const [expandedThemes, setExpandedThemes] = useState<Record<ResumeTheme, boolean>>({
    minimal: false,
    split: false,
  });

  const themeTokensByTheme = useMemo(
    () => ({
      minimal: getThemeTokens('minimal', resume.style?.themeColorTokens),
      split: getThemeTokens('split', resume.style?.themeColorTokens),
    }),
    [resume.style?.themeColorTokens],
  );

  const toggleExpand = (theme: ResumeTheme) => {
    setExpandedThemes((prev) => ({ ...prev, [theme]: !prev[theme] }));
  };

  return (
    <div className="space-y-3">
      {themeOptions.map((option) => {
        const Icon = option.icon;
        const isActive = option.id === activeTheme;
        const isExpanded = expandedThemes[option.id];
        const tokenDefinitions = THEME_TOKEN_DEFINITIONS[option.id];
        const currentTokens = themeTokensByTheme[option.id];

        return (
          <div
            key={option.id}
            className={`w-full rounded-lg border p-3 text-left transition-all ${
              isActive
                ? 'border-gray-900 bg-gray-50 shadow-sm'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="min-w-0 flex-1 text-left"
                onClick={() => updateTheme(option.id)}
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 text-gray-500" />
                  <p className="text-sm font-medium text-gray-900">{option.title}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">{option.description}</p>
              </button>
              <button
                type="button"
                className="h-7 w-7 shrink-0 inline-flex items-center justify-center rounded-md hover:bg-gray-100"
                onClick={() => toggleExpand(option.id)}
                aria-label={isExpanded ? `收起 ${option.title} 色卡` : `展开 ${option.title} 色卡`}
              >
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            </div>

            {isExpanded && (
              <div className="mt-3 border-t border-gray-200 pt-3 space-y-2.5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => resetThemeTokens(option.id)}
                    className="inline-flex items-center rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
                  >
                    <RotateCcw className="h-3.5 w-3.5 mr-1" />
                    还原
                  </button>
                </div>
                {tokenDefinitions.map((tokenDefinition) => (
                  <div
                    key={tokenDefinition.key}
                    className="rounded-md border border-gray-200 bg-white p-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-gray-900">{tokenDefinition.label}</p>
                        <p className="text-[11px] text-gray-500">{tokenDefinition.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {(tokenDefinition.editor ?? 'color') === 'color' ? (
                          <>
                            <input
                              type="color"
                              value={
                                currentTokens[tokenDefinition.key] ?? tokenDefinition.defaultValue
                              }
                              onChange={(e) =>
                                updateThemeTokens(option.id, {
                                  ...currentTokens,
                                  [tokenDefinition.key]: e.target.value,
                                })
                              }
                              className="h-7 w-9 rounded border border-gray-200 bg-transparent p-0.5 cursor-pointer"
                              aria-label={`${option.title}-${tokenDefinition.label}`}
                            />
                            <input
                              type="text"
                              value={
                                currentTokens[tokenDefinition.key] ?? tokenDefinition.defaultValue
                              }
                              onChange={(e) =>
                                updateThemeTokens(option.id, {
                                  ...currentTokens,
                                  [tokenDefinition.key]: e.target.value,
                                })
                              }
                              className="h-7 w-24 rounded border border-gray-200 px-2 text-xs font-mono"
                              aria-label={`${option.title}-${tokenDefinition.label}-hex`}
                            />
                          </>
                        ) : (
                          <input
                            type="text"
                            value={
                              currentTokens[tokenDefinition.key] ?? tokenDefinition.defaultValue
                            }
                            onChange={(e) =>
                              updateThemeTokens(option.id, {
                                ...currentTokens,
                                [tokenDefinition.key]: e.target.value,
                              })
                            }
                            placeholder={tokenDefinition.defaultValue}
                            className="h-7 w-32 rounded border border-gray-200 px-2 text-xs font-mono"
                            aria-label={`${option.title}-${tokenDefinition.label}`}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
