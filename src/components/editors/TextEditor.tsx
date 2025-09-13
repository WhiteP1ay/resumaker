import { IconPicker } from '@/components/IconPicker';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useTextEditor } from '@/hooks/components/useTextEditor';

interface TextEditorProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialData: { content: string };
  onSave: (data: { content: string }, iconName?: string) => void;
  selectedIcon: string;
  iconEnabled: boolean;
}

export const TextEditor = ({
  isOpen,
  onClose,
  title,
  initialData,
  onSave,
  selectedIcon: initialIcon,
}: TextEditorProps) => {
  const {
    content,
    selectedIcon,
    iconEnabled,
    saveStatusText,
    wordCount,
    lineCount,
    setContent,
    setSelectedIcon,
    setIconEnabled,
    handleClose,
  } = useTextEditor(isOpen, initialData, initialIcon, onSave, onClose);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            编辑 {title}
            <span className="text-sm font-normal text-gray-500 mr-auto pl-3">{saveStatusText}</span>
          </DialogTitle>
          <DialogDescription>在此处编辑您的{title}信息，所有更改将自动保存。</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 模块图标选择 */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="icon-toggle"
                checked={iconEnabled}
                onChange={(e) => setIconEnabled(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor="icon-toggle"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                显示模块图标
              </label>
            </div>

            {iconEnabled && (
              <div className="pl-6 border-l-2 border-blue-100">
                <IconPicker value={selectedIcon} onChange={setSelectedIcon} label="图标" />
              </div>
            )}
          </div>

          {/* 内容编辑 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">内容</label>
              <div className="text-xs text-gray-500">
                {wordCount} 字符 · {lineCount} 行
              </div>
            </div>
            <Textarea
              value={content}
              onChange={(value) => setContent(value)}
              placeholder="请输入内容..."
              className="min-h-[200px] resize-y"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
