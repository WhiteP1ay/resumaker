import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface DeleteResumeConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  resumeTitle: string;
  isLastResume?: boolean;
}

export const DeleteResumeConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  resumeTitle,
  isLastResume = false,
}: DeleteResumeConfirmDialogProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-gray-900">
                删除简历
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                此操作不可恢复
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          {isLastResume ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">
                    无法删除最后一份简历
                  </h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    系统需要至少保留一份简历。请先创建新简历后再删除此简历。
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-700">
                确定要删除简历 <span className="font-medium text-gray-900">"{resumeTitle}"</span> 吗？
              </p>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Trash2 className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">警告</p>
                    <p className="text-xs text-red-700 mt-1">
                      删除后，该简历的所有数据将永久丢失，无法恢复。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLastResume}
          >
            取消
          </Button>
          
          {!isLastResume && (
            <Button
              variant="destructive"
              onClick={handleConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              确认删除
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
