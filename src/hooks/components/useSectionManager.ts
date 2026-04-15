import { useResumeActions } from '@/hooks/useResumeActions';
import type { ResumeSection, TimelineItem } from '@/types/resume';
import type { DragEndEvent } from '@dnd-kit/core';
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';

export const useSectionManager = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const {
    getNonBasicSections,
    updateSectionsOrder,
    updateSectionTitle,
    updateSectionIcon,
    deleteSection: deleteSectionFromStore,
    addSection,
  } = useResumeActions();

  const managedSections = getNonBasicSections;

  const reorderSections = (newManagedSections: ResumeSection[]) => {
    updateSectionsOrder(
      newManagedSections.map((section, index) => ({ ...section, order: index + 2 }))
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = managedSections.findIndex((s) => s.id === active.id);
    const newIndex = managedSections.findIndex((s) => s.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      reorderSections(arrayMove(managedSections, oldIndex, newIndex));
    }
  };

  const startEditing = (section: ResumeSection) => {
    setEditingId(section.id);
    setEditingTitle(section.title);
  };

  const saveEditing = () => {
    if (editingId && editingTitle.trim()) {
      updateSectionTitle(editingId, editingTitle.trim());
      setEditingId(null);
      setEditingTitle('');
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  /**
   * 新建自定义模块时预置一个默认条目。
   * 避免空模块在编辑流程中没有可操作入口，导致用户无法继续新增条目。
   */
  const addCustomSection = () => {
    const defaultItem: TimelineItem = {
      id: `${Date.now()}-1`,
      title: '新条目',
      subtitle: '',
      secondarySubtitle: '',
      startDate: '',
      endDate: '',
      description: '',
    };

    const newSection: ResumeSection = {
      id: `custom-${Date.now()}`,
      title: '新模块',
      iconName: 'star',
      type: 'timeline',
      visible: true,
      order: managedSections.length + 2,
      // 预置默认条目，保证创建后立刻可编辑。
      data: [defaultItem],
    };
    addSection(newSection);
    startEditing(newSection);
  };

  return {
    managedSections,
    editingId,
    editingTitle,
    setEditingTitle,
    deleteSection: deleteSectionFromStore,
    addCustomSection,
    startEditing,
    saveEditing,
    cancelEditing,
    updateSectionIcon: (sectionId: string, iconName: string) =>
      updateSectionIcon(sectionId, iconName),
    dragConfig: {
      sensors,
      onDragEnd: handleDragEnd,
      sortableItems: managedSections.map((s) => s.id),
      strategy: verticalListSortingStrategy,
    },
  };
};
