import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';

interface ClearConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ClearConfirmDialog = ({ isOpen, onClose, onConfirm }: ClearConfirmDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Trash2 className="h-5 w-5 text-red-600" />
            <span>确认重置简历</span>
          </DialogTitle>
          <DialogDescription>此操作将会导致当前简历内容的永久性丢失，请谨慎操作。</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p className="text-gray-700 mb-4">
            确定要重置整份简历吗？此操作将丢失当前所有已修改的数据，并恢复初始状态！
          </p>
          <p className="text-red-600 text-sm mt-4 font-medium">⚠️ 此操作无法撤销，请谨慎操作！</p>
        </div>

        <DialogFooter className="flex space-x-2">
          <Button variant="outline" onClick={onClose} className="min-w-[80px]">
            取消
          </Button>
          <Button onClick={onConfirm} className="min-w-[80px] bg-red-600 hover:bg-red-700">
            确认重置
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
