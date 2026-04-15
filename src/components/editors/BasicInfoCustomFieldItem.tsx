import { IconPicker } from '@/components/IconPicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CustomField } from '@/types/resume';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface BasicInfoCustomFieldItemProps {
  field: CustomField;
  onUpdate: (fieldId: string, updates: Partial<CustomField>) => void;
  onDelete: (fieldId: string) => void;
}

export const BasicInfoCustomFieldItem = ({
  field,
  onUpdate,
  onDelete,
}: BasicInfoCustomFieldItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingLabel, setEditingLabel] = useState(field.label);
  const [editingValue, setEditingValue] = useState(field.value);
  const [editingIcon, setEditingIcon] = useState(field.iconName);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: field.id,
    disabled: isEditing,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    onUpdate(field.id, {
      label: editingLabel,
      value: editingValue,
      iconName: editingIcon,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingLabel(field.label);
    setEditingValue(field.value);
    setEditingIcon(field.iconName);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`label-${field.id}`}>字段名称</Label>
            <Input
              id={`label-${field.id}`}
              value={editingLabel}
              onChange={(e) => setEditingLabel(e.target.value)}
              placeholder="如：个人网站、GitHub等"
            />
          </div>
          <div>
            <Label htmlFor={`value-${field.id}`}>字段值</Label>
            <Input
              id={`value-${field.id}`}
              value={editingValue}
              onChange={(e) => setEditingValue(e.target.value)}
              placeholder="如：https://example.com"
            />
          </div>
        </div>

        <div>
          <IconPicker value={editingIcon} onChange={setEditingIcon} label="图标" />
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" size="sm" onClick={handleCancel}>
            取消
          </Button>
          <Button size="sm" onClick={handleSave}>
            保存
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
    >
      <div className="flex items-center space-x-3">
        <div
          {...attributes}
          {...listeners}
          className="cursor-move opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>
        <div>
          <span className="text-sm font-medium text-gray-900">{field.label}</span>
          <span className="text-sm font-medium text-gray-900">{field.value}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
          编辑
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(field.id)}>
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
};
