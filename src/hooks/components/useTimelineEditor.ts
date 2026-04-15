import { useAutoSaveDialog } from '@/hooks/useAutoSaveDialog';
import type { TimelineItem } from '@/types/resume';
import type { DragEndEvent } from '@dnd-kit/core';
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface TimelineEditorData {
  items: TimelineItem[];
  selectedIcon: string;
  iconEnabled: boolean;
}

export const useTimelineEditor = (
  isOpen: boolean,
  initialData: TimelineItem[],
  currentIcon: string,
  onSave: (data: TimelineItem[], iconName?: string) => void,
  onClose: () => void
) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const { data, setData, handleClose, saveStatusText } = useAutoSaveDialog<TimelineEditorData>({
    isOpen,
    initialData: {
      items: initialData,
      selectedIcon: currentIcon,
      iconEnabled: !!currentIcon && currentIcon !== '',
    },
    onSave: (data) => onSave(data.items, data.iconEnabled ? data.selectedIcon : ''),
    onClose,
    debounceDelay: 500,
  });

  const { items, selectedIcon } = data;

  const setItems = (newItems: TimelineItem[]) => setData({ ...data, items: newItems });

  const setSelectedIcon = (newIcon: string) => setData({ ...data, selectedIcon: newIcon });

  const addItem = (title = '') => {
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        title,
        subtitle: '',
        secondarySubtitle: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const removeItem = (id: string) => setItems(items.filter((item) => item.id !== id));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  return {
    items,
    selectedIcon,
    saveStatusText,
    dragConfig: {
      sensors,
      onDragEnd: handleDragEnd,
      sortableItems: items.map((item) => item.id),
      strategy: verticalListSortingStrategy,
    },
    addItem,
    removeItem,
    setSelectedIcon,
    handleClose,
  };
};
