import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useJson } from '@/hooks/useJson';
import { Eye, FileJson, Paintbrush, Settings, Trash2 } from 'lucide-react';

interface ActionButtonsProps {
  onPreview: () => void;
  onClear: () => void;
  onManageResume: () => void;
  onCustomStyle: () => void;
}

export const ActionButtons = ({ onPreview, onClear, onManageResume, onCustomStyle }: ActionButtonsProps) => {
  const { handleImportJson } = useJson();
  return (
    <div className="flex items-center gap-1.5">
      <Button
        onClick={onManageResume}
        variant="ghost"
        size="sm"
        className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 px-2.5"
      >
        <Settings className="h-3.5 w-3.5" />
        <span className="hidden md:inline ml-1.5 text-xs">设置</span>
      </Button>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onCustomStyle}
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 px-2.5"
          >
            <Paintbrush className="h-3.5 w-3.5" />
            <span className="hidden md:inline ml-1.5 text-xs">自定义样式</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>自定义CSS样式</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 px-2.5"
            onClick={() => {
              const input = document.getElementById('import-json-input');
              if (input) {
                (input as HTMLInputElement).click();
              }
            }}
          >
            <FileJson className="h-3.5 w-3.5" />
            <span className="hidden md:inline ml-1.5 text-xs">导入</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>导入JSON（覆盖当前简历）</p>
        </TooltipContent>
      </Tooltip>

      <input
        type="file"
        id="import-json-input"
        accept="application/json"
        onChange={(e) => {
          handleImportJson(e.target?.files?.[0] as File);
        }}
        className="hidden"
      />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onClear}
            aria-label="清空简历"
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-red-500 hover:bg-red-50 h-8 px-2.5"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>清空简历</p>
        </TooltipContent>
      </Tooltip>

      <div className="w-px h-5 bg-gray-200 mx-1" />

      <Button onClick={onPreview} size="sm">
        <Eye className="h-3.5 w-3.5" />
        <span className="ml-1.5">预览导出</span>
      </Button>
    </div>
  );
};
