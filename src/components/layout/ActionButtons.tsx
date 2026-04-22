import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

interface ActionButtonsProps {
  onPrint: () => void;
}

export const ActionButtons = ({ onPrint }: ActionButtonsProps) => {
  return (
    <div className="flex items-center gap-1.5">
      <Button onClick={onPrint} size="sm">
        <Printer className="h-3.5 w-3.5" />
        <span className="ml-1.5">打印</span>
      </Button>
    </div>
  );
};
