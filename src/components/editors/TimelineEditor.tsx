/**
 * 时间线编辑器 - 自动保存版本
 */
import { IconPicker } from '@/components/IconPicker';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useTimelineEditor } from '@/hooks/components/useTimelineEditor';
import type { TimelineItem as TimelineItemType } from '@/types/resume';
import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { GripVertical, Plus } from 'lucide-react';
import { TimelineEditorItem } from './TimelineEditorItem';

interface TimelineEditorProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: TimelineItemType[];
  onSave: (data: TimelineItemType[], iconName?: string) => void;
  title: string;
  selectedIcon: string;
  iconEnabled: boolean;
}

export const TimelineEditor = ({
  isOpen,
  onClose,
  initialData,
  onSave,
  title,
  selectedIcon: initialIcon,
}: TimelineEditorProps) => {
  const {
    items,
    selectedIcon,
    iconEnabled,
    saveStatusText,
    dragConfig,
    addItem,
    removeItem,
    updateItem,
    setSelectedIcon,
    setIconEnabled,
    handleClose,
  } = useTimelineEditor(isOpen, initialData, initialIcon, onSave, onClose);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center space-x-3">
            <span>编辑{title}</span>
            <span className="text-sm font-normal text-gray-500 ml-auto">{saveStatusText}</span>
          </DialogTitle>
          <DialogDescription>在此处编辑您的{title}信息，所有更改将自动保存。</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 图标选择区域 */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="icon-toggle"
                checked={iconEnabled}
                onChange={(e) => setIconEnabled(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor="icon-toggle"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                显示模块图标
              </label>
            </div>

            {iconEnabled && (
              <div className="pl-6 border-l-2 border-blue-100">
                <IconPicker value={selectedIcon} onChange={setSelectedIcon} label="图标" />
              </div>
            )}
          </div>

          {/* 时间线项目列表 */}
          {items.length > 0 && (
            <div className="space-y-4">
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <GripVertical className="h-3 w-3" />
                拖拽调整项目顺序
              </div>
              <DndContext sensors={dragConfig.sensors} onDragEnd={dragConfig.onDragEnd}>
                <SortableContext items={dragConfig.sortableItems} strategy={dragConfig.strategy}>
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <TimelineEditorItem
                        key={item.id}
                        item={item}
                        index={index}
                        onUpdate={updateItem}
                        onRemove={removeItem}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          )}

          {/* 添加新项目按钮 */}
          <Button
            onClick={addItem}
            variant="outline"
            className="w-full border-dashed border-2 hover:bg-blue-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            添加一项
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
