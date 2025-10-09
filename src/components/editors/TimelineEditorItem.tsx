/**
 * 可复用的时间线项目组件
 */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import type { TimelineItem as TimelineItemType } from '@/types/resume';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';

interface TimelineEditorItemProps {
  item: TimelineItemType;
  index: number;
  onUpdate: (id: string, field: keyof TimelineItemType, value: string) => void;
  onRemove: (id: string) => void;
}

export const TimelineEditorItem = ({
  item,
  index,
  onUpdate,
  onRemove,
}: TimelineEditorItemProps) => {
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
    <div
      ref={setNodeRef}
      style={style}
      className="border rounded-lg p-4 space-y-4 bg-white shadow-sm group"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {/* 拖拽手柄 */}
          <div
            {...attributes}
            {...listeners}
            className="cursor-move opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <GripVertical className="h-4 w-4 text-gray-400" />
          </div>
          <h4 className="font-medium text-gray-800">第 {index + 1} 项</h4>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRemove(item.id)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">标题</Label>
          <Input
            value={item.title}
            onChange={(e) => onUpdate(item.id, 'title', e.target.value)}
            placeholder="例：项目名称、公司名称"
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">副标题</Label>
          <Input
            value={item.subtitle || ''}
            onChange={(e) => onUpdate(item.id, 'subtitle', e.target.value)}
            placeholder="例：职位、专业"
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">开始时间</Label>
          <Input
            value={item.startDate || ''}
            onChange={(e) => onUpdate(item.id, 'startDate', e.target.value)}
            placeholder="例：2020年9月"
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">结束时间</Label>
          <Input
            value={item.endDate || ''}
            onChange={(e) => onUpdate(item.id, 'endDate', e.target.value)}
            placeholder="例：2024年6月"
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label className="text-sm font-medium text-gray-700">次要副标题</Label>
          <Input
            value={item.secondarySubtitle || ''}
            onChange={(e) => onUpdate(item.id, 'secondarySubtitle', e.target.value)}
            placeholder=""
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">详细描述</Label>
        <RichTextEditor
          value={item.description}
          onChange={(value) => onUpdate(item.id, 'description', value)}
          placeholder="详细描述工作内容、学习经历或项目经验..."
          minHeight="150px"
        />
      </div>
    </div>
  );
};
