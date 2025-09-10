import { Eye, FolderOpen, Settings, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AIPlatformDropdown } from '@/components/AIPlatformDropdown';
import { AIPlatformManagerDialog } from '@/components/dialogs/AIPlatformManagerDialog';
import { useState } from 'react';

interface ActionButtonsProps {
  onPreview: () => void;
  onClear: () => void;
  onManageTimeline: () => void;
  onManageResumes: () => void;
}

export const ActionButtons = ({
  onPreview,
  onClear,
  onManageTimeline,
  onManageResumes,
}: ActionButtonsProps) => {
  const [isAIPlatformDialogOpen, setIsAIPlatformDialogOpen] = useState(false);

  return (
    <>
      <Button
        onClick={onManageResumes}
        variant="outline"
        size="sm"
        className="flex items-center space-x-2 text-green-600 hover:text-green-700 hover:bg-green-50"
      >
        <FolderOpen className="h-4 w-4" />
        <span className="hidden sm:inline">简历管理</span>
      </Button>

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

      {/* 常用AI工具平台 */}
      <div className="hidden lg:block">
        <AIPlatformDropdown 
          onManagePlatforms={() => setIsAIPlatformDialogOpen(true)} 
        />
      </div>

      {/* AI平台管理对话框 */}
      <AIPlatformManagerDialog
        isOpen={isAIPlatformDialogOpen}
        onClose={() => setIsAIPlatformDialogOpen(false)}
      />
    </>
  );
};
