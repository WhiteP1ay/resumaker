import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface ActionButtonsProps {
  onPreview: () => void;
}

export const ActionButtons = ({ onPreview }: ActionButtonsProps) => {
  return (
    <div className="flex items-center gap-1.5">
      <Button onClick={onPreview} size="sm">
        <Eye className="h-3.5 w-3.5" />
        <span className="ml-1.5">预览导出</span>
      </Button>
    </div>
  );
};
