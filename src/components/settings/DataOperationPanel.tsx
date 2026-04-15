import { Button } from '@/components/ui/button';
import { useJson } from '@/hooks/useJson';
import { Download, Trash2, Upload } from 'lucide-react';
import { useRef } from 'react';

interface DataOperationPanelProps {
  onClearResume: () => void;
}

export const DataOperationPanel = ({ onClearResume }: DataOperationPanelProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { handleExportJson, handleImportJson } = useJson();

  const handleImportClick = () => {
    inputRef.current?.click();
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
    </div>
  );
};
