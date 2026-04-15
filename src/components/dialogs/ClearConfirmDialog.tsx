import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AlertTriangle } from 'lucide-react';

interface ClearConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ClearConfirmDialog = ({ isOpen, onClose, onConfirm }: ClearConfirmDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center shrink-0">
              <AlertTriangle className="h-4.5 w-4.5 text-red-500" />
            </div>
            <span className="text-base font-semibold text-gray-900">清空简历</span>
          </DialogTitle>
        </DialogHeader>

        <div className="py-2 space-y-2">
          <p className="text-sm text-gray-600">
            此操作将删除所有已保存的简历数据并恢复到初始状态，无法撤销。
          </p>
          <p className="text-xs text-red-500 font-medium">建议操作前先导出 JSON 备份。</p>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            取消
          </Button>
          <Button
            onClick={onConfirm}
            variant="destructive"
            className="flex-1"
          >
            确认清空
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
