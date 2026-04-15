import { Button } from '@/components/ui/button';
import { useSectionManager } from '@/hooks/components/useSectionManager';
import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { GripVertical, Plus } from 'lucide-react';
import { DraggableSectionItem } from '../dialogs/DraggableSectionItem';

export const ModuleManagementTab = () => {
  const {
    managedSections,
    editingId,
    editingTitle,
    setEditingTitle,
    deleteSection,
    addCustomSection,
    startEditing,
    saveEditing,
    cancelEditing,
    updateSectionIcon,
    dragConfig,
  } = useSectionManager();

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <GripVertical className="h-3 w-3" />
          <span>拖拽调整顺序</span>
        </div>
        <Button
          onClick={addCustomSection}
          size="sm"
          variant="outline"
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          添加模块
        </Button>
      </div>

      {/* Section List */}
      <DndContext sensors={dragConfig.sensors} onDragEnd={dragConfig.onDragEnd}>
        <SortableContext items={dragConfig.sortableItems} strategy={dragConfig.strategy}>
          <div className="space-y-2">
            {managedSections.map((section) => (
              <DraggableSectionItem
                key={section.id}
                section={section}
                isEditing={editingId === section.id}
                editingTitle={editingTitle}
                onStartEditing={() => startEditing(section)}
                onSaveEditing={saveEditing}
                onCancelEditing={cancelEditing}
                onTitleChange={setEditingTitle}
                onIconChange={(iconName) => updateSectionIcon(section.id, iconName)}
                onDelete={() => deleteSection(section.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {managedSections.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          <p className="text-sm">还没有模块，点击"添加模块"开始</p>
        </div>
      )}
    </div>
  );
};
