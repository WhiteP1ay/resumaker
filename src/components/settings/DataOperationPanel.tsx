import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useJson } from '@/hooks/useJson';
import { useResumeActions } from '@/hooks/useResumeActions';
import { AlertTriangle, Download, RotateCcw, Save, Trash2, Upload } from 'lucide-react';
import { useRef, useState } from 'react';

interface DataOperationPanelProps {
  onClearResume: () => void;
}

export const DataOperationPanel = ({ onClearResume }: DataOperationPanelProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { handleExportJson, handleImportJson } = useJson();
  const { setAsDefault, clearCustomDefault, clearResume } = useResumeActions();
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);

  const handleImportClick = () => {
    inputRef.current?.click();
  };

  const handleRestoreFactory = () => {
    clearCustomDefault();
    clearResume();
    setShowRestoreDialog(false);
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500">支持导入/导出 JSON，以及清空当前简历数据。</p>
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline" size="sm" onClick={handleImportClick}>
          <Upload className="h-3.5 w-3.5 mr-1" />
          导入 JSON
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={handleExportJson}>
          <Download className="h-3.5 w-3.5 mr-1" />
          导出 JSON
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setAsDefault()}
        >
          <Save className="h-3.5 w-3.5 mr-1" />
          设为默认
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-orange-200 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
          onClick={() => setShowRestoreDialog(true)}
        >
          <RotateCcw className="h-3.5 w-3.5 mr-1" />
          恢复出厂
        </Button>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50"
        onClick={onClearResume}
      >
        <Trash2 className="h-3.5 w-3.5 mr-1" />
        清空当前简历
      </Button>

      <input
        ref={inputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleImportJson(file);
          }
          e.currentTarget.value = '';
        }}
      />

      <Dialog open={showRestoreDialog} onOpenChange={setShowRestoreDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-4.5 w-4.5 text-orange-500" />
              </div>
              <span className="text-base font-semibold text-gray-900">恢复出厂默认</span>
            </DialogTitle>
          </DialogHeader>

          <div className="py-2 space-y-2">
            <DialogDescription className="text-sm text-gray-600">
              这将清除你自定义的默认数据，并将当前简历恢复为项目内置的初始数据。此操作不可撤销。
            </DialogDescription>
            <p className="text-xs text-orange-500 font-medium">建议操作前先导出 JSON 备份。</p>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowRestoreDialog(false)} className="flex-1">
              取消
            </Button>
            <Button
              onClick={handleRestoreFactory}
              variant="destructive"
              className="flex-1"
            >
              确认恢复
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
