import { IconPicker, IconRenderer } from '@/components/IconPicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ResumeSection } from '@/types/resume';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Check, Edit, GripVertical, Trash2, X } from 'lucide-react';
import React from 'react';

export interface DraggableSectionItemProps {
  section: ResumeSection;
  isEditing: boolean;
  editingTitle: string;
  onStartEditing: () => void;
  onSaveEditing: () => void;
  onCancelEditing: () => void;
  onTitleChange: (title: string) => void;
  onIconChange: (iconName: string) => void;
  onDelete: () => void;
}

export const DraggableSectionItem: React.FC<DraggableSectionItemProps> = ({
  section,
  isEditing,
  editingTitle,
  onStartEditing,
  onSaveEditing,
  onCancelEditing,
  onTitleChange,
  onIconChange,
  onDelete,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
    disabled: isEditing,
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
      className={`group border border-gray-200 rounded-lg bg-white hover:border-gray-300 transition-all duration-150 ${
        isDragging ? 'shadow-lg scale-[1.02] border-blue-200' : 'shadow-sm hover:shadow-md'
      }`}
    >
      <div className="flex items-center gap-2.5 px-3 py-3">
        <div
          {...attributes}
          {...listeners}
          className={`flex-shrink-0 rounded hover:bg-gray-100 transition-colors cursor-grab active:cursor-grabbing p-0.5 ${
            isEditing ? 'cursor-not-allowed opacity-30' : ''
          }`}
        >
          <GripVertical className="h-4 w-4 text-gray-300" />
        </div>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor={`title-${section.id}`} className="text-xs text-gray-500">
                  模块标题
                </Label>
                <Input
                  id={`title-${section.id}`}
                  value={editingTitle}
                  onChange={(e) => onTitleChange(e.target.value)}
                  placeholder="请输入模块标题"
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <IconPicker value={section.iconName} onChange={onIconChange} label="图标" />
              </div>
              <div className="flex items-center gap-2 pt-0.5">
                <Button onClick={onSaveEditing} size="sm">
                  <Check className="h-3 w-3 mr-1" />
                  保存
                </Button>
                <Button
                  onClick={onCancelEditing}
                  variant="outline"
                  size="sm"
                  className="h-7 px-2.5 text-xs"
                >
                  <X className="h-3 w-3 mr-1" />
                  取消
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 min-w-0">
              {section.iconName && (
                <IconRenderer iconName={section.iconName} className="h-3.5 w-3.5 text-gray-400 shrink-0" />
              )}
              <span className="font-medium text-gray-800 text-sm truncate">{section.title}</span>
              {section.pageNumber && (
                <span className="shrink-0 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
                  P{section.pageNumber}
                </span>
              )}
            </div>
          )}
        </div>

        {!isEditing && (
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <Button
              onClick={onStartEditing}
              variant="ghost"
              size="icon"
              className="h-7 w-7 hover:bg-gray-100 text-gray-400 hover:text-gray-700"
            >
              <Edit className="h-3.5 w-3.5" />
            </Button>
            <Button
              onClick={onDelete}
              variant="ghost"
              size="icon"
              className="h-7 w-7 hover:bg-red-50 hover:text-red-500 text-gray-400"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
