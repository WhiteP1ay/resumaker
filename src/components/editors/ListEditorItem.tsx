/**
 * 可复用的列表项组件
 */
import { Button } from '@/components/ui/button';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import type { ListItem as ListItemType } from '@/types/resume';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';

interface ListEditorItemProps {
  item: ListItemType;
  index: number;
  onUpdate: (id: string, content: string) => void;
  onRemove: (id: string) => void;
}

export const ListEditorItem = ({ item, index, onUpdate, onRemove }: ListEditorItemProps) => {
  // 使用 useSortable hook
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-start space-x-2 group">
      {/* 拖拽手柄和序号 */}
      <div className="flex flex-col items-center mt-2">
        <div {...attributes} {...listeners} className="cursor-move">
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>
        <span className="text-xs text-gray-500 mt-1">{index + 1}</span>
      </div>

      {/* 内容输入框 */}
      <div className="flex-1">
        <RichTextEditor
          value={item.content}
          onChange={(value) => onUpdate(item.id, value)}
          placeholder={`请输入第 ${index + 1} 项内容...`}
          minHeight="80px"
        />
      </div>

      {/* 删除按钮 */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onRemove(item.id)}
        className="mt-2 text-red-600 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
