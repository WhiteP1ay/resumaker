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
  currentIcon?: string;
}

export const TimelineEditor = ({
  isOpen,
  onClose,
  initialData,
  onSave,
  title,
  currentIcon = 'briefcase',
}: TimelineEditorProps) => {
  const {
    items,
    selectedIcon,
    saveStatusText,
    dragConfig,
    addItem,
    removeItem,
    updateItem,
    setSelectedIcon,
    handleClose,
  } = useTimelineEditor(isOpen, initialData, currentIcon, onSave, onClose);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center space-x-3">
            <span>编辑{title}</span>
            <span className="text-sm font-normal text-gray-500 mr-auto pl-3">{saveStatusText}</span>
          </DialogTitle>
          <DialogDescription>在此处编辑您的{title}信息，所有更改将自动保存。</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 图标选择区域 */}
          <IconPicker value={selectedIcon} onChange={setSelectedIcon} label="图标" />

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
