import { useResumeActions } from '@/hooks/useResumeActions';
import { resumeAtom } from '@/store/resumeStore';
import { useAtomValue } from 'jotai';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const CSS_CLASS_GUIDE = `/* 基本信息区域 */
.base-info { }                 /* 整个基本信息区域 */
.base-info .name { }           /* 姓名 */
.base-info .info-row { }       /* 基本信息行容器 */
.base-info .item { }           /* 每个基本信息条目（动态字段通用） */
.base-info .avatar { }         /* 头像区域 */

/* 时间线区域（每个 section 独立） */
.timeline-1 { }                /* 第一个时间线 section */
.timeline-2 { }                /* 第二个时间线 section */
.timeline-1 .section-title { } /* section 标题 */

/* 时间线条目（在 timeline-N 下） */
.timeline-1 .title { }           /* 条目标题 */
.timeline-1 .subtitle { }        /* 条目副标题 */
.timeline-1 .secondary-subtitle { } /* 条目次要副标题 */
.timeline-1 .date { }            /* 开始/结束时间 */
.timeline-1 .description { }     /* 正文描述 */
`;

export const CustomCssSettingsPanel = () => {
  const resume = useAtomValue(resumeAtom);
  const { updateCustomStyle } = useResumeActions();
  const [customCSS, setCustomCSS] = useState('');
  const [sectionClasses, setSectionClasses] = useState<Record<string, string>>({});
  const [collapsedBlocks, setCollapsedBlocks] = useState({
    classGuide: true,
    classMapping: true,
    customCss: false,
  });

  useEffect(() => {
    setCustomCSS(resume.style?.customCSS ?? '');

    const initialSectionClasses: Record<string, string> = {};
    resume.style?.sections?.forEach((s) => {
      initialSectionClasses[s.sectionId] = s.className ?? '';
    });
    setSectionClasses(initialSectionClasses);
  }, [resume.style?.customCSS, resume.style?.sections]);

  const timelineSections = useMemo(
    () =>
      resume.sections
        .filter((s) => s.type === 'timeline')
        .map((s) => ({
          id: s.id,
          title: s.title,
          defaultClass: `timeline-${resume.sections.filter((x) => x.type === 'timeline').indexOf(s) + 1}`,
        })),
    [resume.sections]
  );

  const handleApply = () => {
    const sections = Object.entries(sectionClasses)
      .filter(([, className]) => className.trim())
      .map(([sectionId, className]) => ({ sectionId, className: className.trim() }));
    updateCustomStyle(customCSS, sections);
  };

  const toggleBlock = (blockKey: keyof typeof collapsedBlocks) => {
    setCollapsedBlocks((prev) => ({ ...prev, [blockKey]: !prev[blockKey] }));
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-500">支持写 CSS 微调排版，点击“应用样式”后实时生效。</p>

      <div className="rounded-md border border-gray-200">
        <button
          type="button"
          className="w-full px-3 py-2 flex items-center justify-between text-sm font-medium text-gray-700"
          onClick={() => toggleBlock('classGuide')}
        >
          <span>可用类名</span>
          {collapsedBlocks.classGuide ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </button>
        {!collapsedBlocks.classGuide && (
          <div className="px-3 pb-3">
            <div className="bg-gray-50 rounded-md p-3 text-xs font-mono text-gray-600 leading-relaxed whitespace-pre-wrap">
              {CSS_CLASS_GUIDE}
            </div>
          </div>
        )}
      </div>

      {timelineSections.length > 0 && (
        <div className="rounded-md border border-gray-200">
          <button
            type="button"
            className="w-full px-3 py-2 flex items-center justify-between text-sm font-medium text-gray-700"
            onClick={() => toggleBlock('classMapping')}
          >
            <span>模块类名映射</span>
            {collapsedBlocks.classMapping ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </button>
          {!collapsedBlocks.classMapping && (
            <div className="px-3 pb-3 space-y-2">
              {timelineSections.map(({ id, title, defaultClass }) => (
                <div key={id} className="flex items-center gap-3">
                  <span className="text-sm text-gray-500 w-20 shrink-0 truncate" title={title}>
                    {title}
                  </span>
                  <span className="text-xs text-gray-400">→</span>
                  <input
                    type="text"
                    value={sectionClasses[id] ?? defaultClass}
                    onChange={(e) => setSectionClasses((prev) => ({ ...prev, [id]: e.target.value }))}
                    placeholder={defaultClass}
                    className="flex-1 h-8 rounded-md border border-gray-200 px-2.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="rounded-md border border-gray-200">
        <button
          type="button"
          className="w-full px-3 py-2 flex items-center justify-between text-sm font-medium text-gray-700"
          onClick={() => toggleBlock('customCss')}
        >
          <span>自定义 CSS</span>
          {collapsedBlocks.customCss ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </button>
        {!collapsedBlocks.customCss && (
          <div className="px-3 pb-3">
            <textarea
              value={customCSS}
              onChange={(e) => setCustomCSS(e.target.value)}
              placeholder="在此编写 CSS..."
              rows={10}
              className="w-full rounded-md border border-gray-200 p-3 text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleApply}
          className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-xs font-medium text-white hover:bg-gray-800 transition-colors"
        >
          应用样式
        </button>
      </div>
    </div>
  );
};
