import { Eye, Trash2, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  onPreview: () => void;
  onClear: () => void;
  onManageTimeline: () => void;
}

export const ActionButtons = ({ onPreview, onClear, onManageTimeline }: ActionButtonsProps) => {
  return (
    <>
      <Button
        onClick={onManageTimeline}
        variant="outline"
        size="sm"
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
      >
        <Settings className="h-4 w-4" />
        <span className="hidden sm:inline">管理模块</span>
      </Button>

      <Button
        onClick={onPreview}
        variant="outline"
        size="sm"
        className="flex items-center space-x-2"
      >
        <Eye className="h-4 w-4" />
        <span className="hidden sm:inline">预览 & 导出</span>
      </Button>

      <Button
        onClick={onClear}
        variant="outline"
        size="sm"
        className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" />
        <span className="hidden sm:inline">重置</span>
      </Button>

      <div className="hidden lg:block text-xs text-gray-500">💡 点击模块右上角编辑按钮修改内容</div>
    </>
  );
};
