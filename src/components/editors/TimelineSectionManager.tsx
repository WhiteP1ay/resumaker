import { IconPicker } from '@/components/IconPicker';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useTimelineEditor } from '@/hooks/components/useTimelineEditor';
import type { TimelineItem } from '@/types/resume';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Check, GripVertical, Plus, Trash2, X } from 'lucide-react';
import { useRef, useState } from 'react';

interface TimelineSectionManagerProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: TimelineItem[];
  onSave: (data: TimelineItem[], iconName?: string) => void;
  title: string;
  currentIcon?: string;
}

const SortableRow = ({
  item,
  index,
  onRemove,
}: {
  item: TimelineItem;
  index: number;
  onRemove: (id: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
      }}
      className="flex items-center gap-2 px-3 py-2 bg-white border rounded-lg group hover:bg-gray-50"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-move text-gray-300 hover:text-gray-500 shrink-0"
      >
        <GripVertical className="h-4 w-4" />
      </div>

      <span className="flex-1 text-sm text-gray-700 truncate">
        {item.title || <span className="text-gray-400 italic">第 {index + 1} 项（未填写）</span>}
      </span>

      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 shrink-0 text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onRemove(item.id)}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
};

export const TimelineSectionManager = ({
  isOpen,
  onClose,
  initialData,
  onSave,
  title,
  currentIcon = 'briefcase',
}: TimelineSectionManagerProps) => {
  const {
    items,
    selectedIcon,
    saveStatusText,
    dragConfig,
    addItem,
    removeItem,
    setSelectedIcon,
    handleClose,
  } = useTimelineEditor(isOpen, initialData, currentIcon, onSave, onClose);

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const startAdding = () => {
    setNewTitle('');
    setIsAdding(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const confirmAdd = () => {
    addItem(newTitle.trim());
    setNewTitle('');
    setIsAdding(false);
  };

  const cancelAdd = () => {
    setNewTitle('');
    setIsAdding(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between pr-6">
            <DialogTitle>{title} · 管理条目</DialogTitle>
            <span className="text-xs text-gray-400">{saveStatusText}</span>
          </div>
        </DialogHeader>

        <div className="space-y-4 pt-1">
          <IconPicker value={selectedIcon} onChange={setSelectedIcon} label="图标" />

          {items.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                <GripVertical className="h-3 w-3" /> 拖拽调整顺序，悬浮条目可在预览区直接编辑内容
              </p>
              <DndContext sensors={dragConfig.sensors} onDragEnd={dragConfig.onDragEnd}>
                <SortableContext items={dragConfig.sortableItems} strategy={dragConfig.strategy}>
                  <div className="space-y-1.5">
                    {items.map((item, index) => (
                      <SortableRow key={item.id} item={item} index={index} onRemove={removeItem} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          )}

          {isAdding ? (
            <div className="flex items-center gap-2">
              <Input
                ref={inputRef}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') confirmAdd();
                  if (e.key === 'Escape') cancelAdd();
                }}
                placeholder="输入标题，按 Enter 确认"
                className="flex-1"
              />
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 shrink-0 hover:bg-green-50 hover:text-green-600"
                onClick={confirmAdd}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 shrink-0 hover:bg-red-50 hover:text-red-500"
                onClick={cancelAdd}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              onClick={startAdding}
              variant="outline"
              className="w-full border-dashed border-2 hover:bg-blue-50 text-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              添加条目
            </Button>
          )}

          <div className="flex justify-end">
            <Button variant="outline" onClick={handleClose}>
              完成
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
