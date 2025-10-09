/**
 * 富文本迁移提示对话框
 */
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AlertCircle, Sparkles } from 'lucide-react';

interface RichTextMigrationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const RichTextMigrationDialog = ({
  isOpen,
  onConfirm,
  onCancel,
}: RichTextMigrationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Sparkles className="h-6 w-6 text-blue-600" />
            </div>
            <DialogTitle className="text-xl">检测到旧版数据格式</DialogTitle>
          </div>
          <DialogDescription className="text-left space-y-3 pt-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
              <div className="space-y-2 text-sm">
                <p className="text-gray-700">
                  您的简历数据使用的是旧版纯文本格式，现在编辑器已升级支持
                  <strong className="text-blue-600">富文本编辑</strong>啦！
                </p>
                <p className="text-gray-600">
                  为了更好的编辑体验，建议升级为富文本格式。升级后您可以：
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                  <li>
                    使用<strong>加粗</strong>、<em>斜体</em>等文字样式
                  </li>
                  <li>
                    设置字体<span className="text-blue-600">颜色</span>和大小
                  </li>
                  <li>创建有序/无序列表</li>
                  <li>获得更专业的简历展示效果</li>
                </ul>
                <p className="text-amber-600 text-xs mt-3 bg-amber-50 p-2 rounded border border-amber-200">
                  ⚠️
                  升级过程会自动处理换行和列表格式，但可能与原有格式略有差异。建议升级后检查一遍内容。
                </p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onCancel}>
            暂不升级
          </Button>
          <Button onClick={onConfirm} className="bg-blue-600 hover:bg-blue-700">
            <Sparkles className="h-4 w-4 mr-2" />
            立即升级
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
