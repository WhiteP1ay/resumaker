import { IconPicker } from '@/components/IconPicker.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Select } from '@/components/ui/select.tsx';

import type { ResumeSection } from '@/types/resume.ts';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Check, Edit, GripVertical, Trash2, X } from 'lucide-react';
import React from 'react';
import { EDITOR_TYPE_OPTIONS } from './editorTypeConstants.ts';

export interface DraggableSectionItemProps {
  section: ResumeSection;
  isEditing: boolean;
  editingTitle: string;
  onStartEditing: () => void;
  onSaveEditing: () => void;
  onCancelEditing: () => void;
  onTitleChange: (title: string) => void;
  onIconChange: (iconName: string) => void;
  onEditorTypeChange: (editorType: 'timeline' | 'list' | 'text') => void;
  onDelete: () => void;
  getEditorType: (section: ResumeSection) => 'timeline' | 'list' | 'text';
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
  onEditorTypeChange,
  onDelete,
  getEditorType,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
    disabled: isEditing, // 编辑时禁用拖拽
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const currentEditorType = getEditorType(section);
  const currentOption = EDITOR_TYPE_OPTIONS.find((opt) => opt.value === currentEditorType);

  const handleEditorTypeChange = (value: string) => {
    const editorType = value as 'timeline' | 'list' | 'text';
    onEditorTypeChange(editorType);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 ${
        isDragging ? 'shadow-lg scale-105' : ''
      }`}
    >
      <div className="flex items-center gap-3 p-4">
        {/* 拖拽手柄 */}
        <div
          {...attributes}
          {...listeners}
          className={`flex-shrink-0 p-1 rounded hover:bg-gray-100 transition-colors cursor-grab active:cursor-grabbing ${
            isEditing ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>

        {/* 标题和状态 */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              {/* 标题编辑 */}
              <div className="space-y-1">
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

              {/* 图标编辑 */}
              <div className="space-y-1">
                <IconPicker value={section.iconName} onChange={onIconChange} label="图标" />
              </div>

              {/* 编辑器类型 */}
              <div className="space-y-1">
                <Label htmlFor={`editor-${section.id}`} className="text-xs text-gray-500">
                  编辑器类型
                </Label>
                <Select
                  value={currentEditorType}
                  onValueChange={handleEditorTypeChange}
                  placeholder="选择编辑器类型"
                  options={EDITOR_TYPE_OPTIONS}
                />
              </div>

              {/* 操作按钮 */}
              <div className="flex items-center gap-2 pt-1">
                <Button
                  onClick={onSaveEditing}
                  size="sm"
                  className="h-7 px-2 text-xs bg-blue-600 hover:bg-blue-700"
                >
                  <Check className="h-3 w-3 mr-1" />
                  保存
                </Button>
                <Button
                  onClick={onCancelEditing}
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 text-xs"
                >
                  <X className="h-3 w-3 mr-1" />
                  取消
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <h4 className="font-medium text-gray-900 text-sm truncate">{section.title}</h4>
              <p className="text-xs text-gray-500 mt-1">
                {currentOption?.label} • {section.visible ? '显示中' : '已隐藏'}
              </p>
            </div>
          )}
        </div>

        {/* 操作按钮 */}
        {!isEditing && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              onClick={onStartEditing}
              variant="ghost"
              size="icon"
              className="h-7 w-7 hover:bg-gray-100"
            >
              <Edit className="h-3 w-3 text-gray-600" />
            </Button>
            <Button
              onClick={onDelete}
              variant="ghost"
              size="icon"
              className="h-7 w-7 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
