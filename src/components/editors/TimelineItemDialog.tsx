import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { useAutoSaveDialog } from '@/hooks/useAutoSaveDialog';
import type { TimelineItem } from '@/types/resume';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface TimelineItemDialogProps {
  isOpen: boolean;
  item: TimelineItem;
  onSave: (item: TimelineItem) => void;
  onClose: () => void;
}

export const TimelineItemDialog = ({ isOpen, item, onSave, onClose }: TimelineItemDialogProps) => {
  const [collapsed, setCollapsed] = useState(true);

  const { data, setData, handleClose, saveStatusText } = useAutoSaveDialog<TimelineItem>({
    isOpen,
    initialData: item,
    onSave,
    onClose,
    debounceDelay: 500,
  });

  const update = (field: keyof TimelineItem, value: string) => {
    setData({ ...data, [field]: value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-1">
          <div className="flex items-center justify-between pr-8">
            <DialogTitle className="text-base font-semibold text-gray-900">
              {data.title || '编辑条目'}
            </DialogTitle>
            <span className="text-xs text-gray-400 font-normal">{saveStatusText}</span>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* 折叠区：标题 / 副标题 / 时间 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setCollapsed((c) => !c)}
              className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-50/80 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-600"
            >
              <span>基本信息（标题、时间）</span>
              {collapsed ? (
                <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
              ) : (
                <ChevronUp className="h-3.5 w-3.5 text-gray-400" />
              )}
            </button>

            {!collapsed && (
              <div className="p-4 space-y-4 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-gray-500">标题</Label>
                    <Input
                      value={data.title}
                      onChange={(e) => update('title', e.target.value)}
                      placeholder="例：项目名称、公司名称"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-gray-500">副标题</Label>
                    <Input
                      value={data.subtitle || ''}
                      onChange={(e) => update('subtitle', e.target.value)}
                      placeholder="例：职位、专业"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-gray-500">开始时间</Label>
                    <Input
                      value={data.startDate || ''}
                      onChange={(e) => update('startDate', e.target.value)}
                      placeholder="例：2020年9月"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-gray-500">结束时间</Label>
                    <Input
                      value={data.endDate || ''}
                      onChange={(e) => update('endDate', e.target.value)}
                      placeholder="例：2024年6月"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1.5">
                    <Label className="text-xs font-medium text-gray-500">次要副标题</Label>
                    <Input
                      value={data.secondarySubtitle || ''}
                      onChange={(e) => update('secondarySubtitle', e.target.value)}
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 描述：常驻 */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-gray-500">详细描述</Label>
            <RichTextEditor
              value={data.description}
              onChange={(value) => update('description', value)}
              placeholder="详细描述工作内容、学习经历或项目经验..."
              minHeight="180px"
            />
          </div>

          <div className="flex justify-end pt-1">
            <Button variant="outline" onClick={handleClose} size="sm">
              完成
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
