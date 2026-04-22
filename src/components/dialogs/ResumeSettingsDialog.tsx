import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { usePageSettings } from '@/hooks/components/usePageSettings';
import { Settings as SettingsIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ModuleManagementTab } from '../settings/ModuleManagementTab';
import { PageSettingsTab } from '../settings/PageSettingsTab';
import { TabNavigation } from '../settings/TabNavigation';

interface ResumeSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeSettingsDialog = ({ isOpen, onClose }: ResumeSettingsDialogProps) => {
  const [activeTab, setActiveTab] = useState<'modules' | 'pages'>('modules');

  const pageSettings = usePageSettings();

  const handleClose = () => {
    pageSettings.applyPageAssignments();
    onClose();
  };

  useEffect(() => {
    pageSettings.applyPageAssignments();
  }, [pageSettings]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-hidden flex flex-col gap-0 p-0">
        {/* Header */}
        <DialogHeader className="px-5 pt-5 pb-4 border-b border-gray-100">
          <DialogTitle className="flex items-center gap-2.5 text-base font-semibold text-gray-900">
            <div className="w-7 h-7 bg-gray-800 rounded-md flex items-center justify-center shrink-0">
              <SettingsIcon className="h-3.5 w-3.5 text-white" />
            </div>
            简历设置
          </DialogTitle>
          <DialogDescription className="sr-only">
            管理简历模块与分页设置。
          </DialogDescription>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="px-5 pt-3">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 pb-5 pt-4">
          {activeTab === 'modules' && <ModuleManagementTab />}
          {activeTab === 'pages' && <PageSettingsTab pageSettings={pageSettings} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};
