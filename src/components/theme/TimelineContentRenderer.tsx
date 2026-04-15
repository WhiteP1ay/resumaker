import { TimelineItemDialog } from '@/components/editors/TimelineItemDialog';
import { Button } from '@/components/ui/button';
import type { TimelineItem } from '@/types/resume';
import { Edit3 } from 'lucide-react';
import { useState } from 'react';

interface TimelineContentProps {
  data: TimelineItem[];
  isEditable?: boolean;
  onUpdateItem?: (item: TimelineItem) => void;
}

export const TimelineContent = ({ data, isEditable, onUpdateItem }: TimelineContentProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.id} className="relative group/item">
          {isEditable && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-0 right-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 hover:bg-gray-100 h-7 w-7 print:hidden z-10"
              onClick={() => setEditingId(item.id)}
            >
              <Edit3 className="h-3.5 w-3.5 text-gray-500" />
            </Button>
          )}

          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              {item.title && (
                <div className="flex items-center space-x-3 mb-1">
                  <h3 className="title text-xl font-semibold text-gray-900 whitespace-pre">
                    {item.title}
                  </h3>
                  <span className="subtitle text-sm text-gray-600 whitespace-pre">
                    {item.subtitle}
                  </span>
                </div>
              )}
              {item.secondarySubtitle && (
                <div className="secondary-subtitle text-sm text-gray-700 font-medium whitespace-pre">
                  {item.secondarySubtitle}
                </div>
              )}
            </div>
            {(item.startDate || item.endDate) && (
              <div className="date text-sm text-gray-600 ml-4 shrink-0 whitespace-pre">
                {item.startDate} {item.startDate && item.endDate && '-'} {item.endDate}
              </div>
            )}
          </div>

          {item.description && (
            <div
              className="description text-sm text-gray-700 leading-relaxed mt-2 rich-text-display"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          )}

          {isEditable && onUpdateItem && (
            <TimelineItemDialog
              isOpen={editingId === item.id}
              item={item}
              onSave={onUpdateItem}
              onClose={() => setEditingId(null)}
            />
          )}
        </div>
      ))}
    </div>
  );
};
