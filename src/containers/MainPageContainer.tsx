import { AppHeader } from '@/components/layout/AppHeader';
import { ResumeDisplay } from '@/components/ResumeDisplay';
import { ResumeSidebar } from '@/components/resume-switcher/ResumeSidebar.tsx';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { ClearConfirmDialog } from '@/components/dialogs/ClearConfirmDialog';
import { ActionButtons } from '@/components/layout/ActionButtons';
import { AppFooter } from '@/components/layout/AppFooter';
import { resetResumeAtom, resumeAtom } from '@/store/resumeStore';
import { ResumeManagerDialog } from '@/components/dialogs/ResumeManagerDialog';
import { FloatingMessage } from '@/components/ui/floating-message.tsx';
import { useFloatingMessage } from '@/hooks/useFloatingMessage.ts';

// 移除懒加载模块管理器，现在使用独立页面

export const MainPageContainer = () => {
  const resume = useAtomValue(resumeAtom);
  const resetResume = useSetAtom(resetResumeAtom);
  const [showClearDialog, setShowClearDialog] = useState(false);
  // 移除showTimelineManager状态，现在使用独立页面
  const [showResumeManager, setShowResumeManager] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const { isVisible, message, variant, position, hideMessage, autoClose, autoCloseDelay } =
    useFloatingMessage();

  useEffect(() => {
    console.log('FloatingMessage:', { isVisible, message, variant, position });
  }, [isVisible]);

  const handlePreview = () => {
    window.open('/preview', '_blank');
  };

  const handleClear = () => {
    resetResume();
    setShowClearDialog(false);
  };

  // 移除handleManageTimeline，现在使用路由导航

  const handleManageResumes = () => {
    setShowResumeManager(true);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <AppHeader>
          <ActionButtons
            onPreview={handlePreview}
            onClear={() => setShowClearDialog(true)}
            onManageResumes={handleManageResumes}
          />
        </AppHeader>

        <div className="flex">
          {/* 左侧边栏 */}
          <div className="hidden p-4 lg:block">
            <ResumeSidebar
              isCollapsed={sidebarCollapsed}
              onToggleCollapse={toggleSidebar}
            />
          </div>

          {/* 主内容区域 */}
          <main className="flex-1 overflow-hidden">
            <div className="max-w-6xl mx-auto p-4">
              <ResumeDisplay
                resume={resume}
                isEditable={true}
                className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen"
              />
            </div>
          </main>
        </div>

        <ClearConfirmDialog
          isOpen={showClearDialog}
          onClose={() => setShowClearDialog(false)}
          onConfirm={handleClear}
        />

        {/* 移除模块管理对话框，现在使用独立页面 */}

        {/* 简历管理对话框 */}
        <ResumeManagerDialog
          isOpen={showResumeManager}
          onClose={() => setShowResumeManager(false)}
        />

        <AppFooter />
      </div>

      {/* 浮动消息 */}
      <FloatingMessage
        message={message}
        isVisible={isVisible}
        variant={variant}
        position={position}
        onClose={hideMessage}
        autoClose={autoClose}
        autoCloseDelay={autoCloseDelay}
      />
    </>
  );
};
