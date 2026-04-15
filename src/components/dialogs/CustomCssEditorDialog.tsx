import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { resumeAtom } from '@/store/resumeStore';
import { useAtom } from 'jotai';
import { Palette } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CustomCssEditorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export const CustomCssEditorDialog = ({ isOpen, onClose }: CustomCssEditorDialogProps) => {
  const [resume, setResume] = useAtom(resumeAtom);
  const [customCSS, setCustomCSS] = useState('');
  const [sectionClasses, setSectionClasses] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      const initial = resume.style?.customCSS ?? '';
      setCustomCSS(initial);

      const initialSectionClasses: Record<string, string> = {};
      resume.style?.sections?.forEach((s) => {
        initialSectionClasses[s.sectionId] = s.className ?? '';
      });
      setSectionClasses(initialSectionClasses);
    }
  }, [isOpen, resume]);

  const handleSave = () => {
    const sections = Object.entries(sectionClasses)
      .filter(([, className]) => className)
      .map(([sectionId, className]) => ({ sectionId, className }));

    setResume((prev) => ({
      ...prev,
      style: {
        ...prev.style,
        sections,
        customCSS,
      },
    }));
    onClose();
  };

  const timelineSections = resume.sections
    .filter((s) => s.type === 'timeline')
    .map((s) => ({
      id: s.id,
      title: s.title,
      defaultClass: `timeline-${resume.sections.filter((x) => x.type === 'timeline').indexOf(s) + 1}`,
    }));

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col gap-0 p-0">
        <DialogHeader className="px-5 pt-5 pb-4 border-b border-gray-100">
          <DialogTitle className="flex items-center gap-2.5 text-base font-semibold text-gray-900">
            <div className="w-7 h-7 bg-gray-800 rounded-md flex items-center justify-center shrink-0">
              <Palette className="h-3.5 w-3.5 text-white" />
            </div>
            自定义样式
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          {/* CSS 类名说明 */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">可用类名</h3>
            <div className="bg-gray-50 rounded-md p-3 text-xs font-mono text-gray-600 leading-relaxed whitespace-pre">
              {CSS_CLASS_GUIDE}
            </div>
          </div>

          {/* Section 类名映射 */}
          {timelineSections.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">模块类名映射</h3>
              <div className="space-y-2">
                {timelineSections.map(({ id, title, defaultClass }) => (
                  <div key={id} className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 w-20 shrink-0 truncate" title={title}>
                      {title}
                    </span>
                    <span className="text-xs text-gray-400">→</span>
                    <input
                      type="text"
                      value={sectionClasses[id] ?? defaultClass}
                      onChange={(e) =>
                        setSectionClasses((prev) => ({ ...prev, [id]: e.target.value }))
                      }
                      placeholder={defaultClass}
                      className="flex-1 h-8 rounded-md border border-gray-200 px-2.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CSS 编辑器 */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">自定义 CSS</h3>
            <textarea
              value={customCSS}
              onChange={(e) => setCustomCSS(e.target.value)}
              placeholder="在此编写 CSS..."
              rows={12}
              className="w-full rounded-md border border-gray-200 p-3 text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 pt-3 border-t border-gray-100 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button onClick={handleSave}>
            保存并应用
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
