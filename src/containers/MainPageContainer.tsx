import { AppHeader } from '@/components/layout/AppHeader';
import { ResumeDisplay } from '@/components/ResumeDisplay';
import { useAtomValue, useSetAtom } from 'jotai';
import React, { Suspense, useState } from 'react';
// import { LayoutSelector } from '@/components/LayoutSelector'
import { ClearConfirmDialog } from '@/components/dialogs/ClearConfirmDialog';
import { ActionButtons } from '@/components/layout/ActionButtons';
import { AppFooter } from '@/components/layout/AppFooter';
import { resetResumeAtom, resumeAtom } from '@/store/resumeStore';
import { ResumeManagerDialog } from '@/components/dialogs/ResumeManagerDialog';

// 懒加载模块管理器（无loading，包很小会一闪而过）
const SectionManager = React.lazy(() => import('@/components/dialogs/TimelineManagerDialog'));

export const MainPageContainer = () => {
  const resume = useAtomValue(resumeAtom);
  const resetResume = useSetAtom(resetResumeAtom);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showTimelineManager, setShowTimelineManager] = useState(false);
  const [showResumeManager, setShowResumeManager] = useState(false);

  const handlePreview = () => {
    window.open('/preview', '_blank');
  };

  const handleClear = () => {
    resetResume();
    setShowClearDialog(false);
  };

  // const handleLayoutChange = (layout: 'side-by-side' | 'top-bottom') => {
  //   setResume({ ...resume, layout })
  // }

  const handleManageTimeline = () => {
    setShowTimelineManager(true);
  };

  const handleManageResumes = () => {
    setShowResumeManager(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <AppHeader>
        {/* <LayoutSelector
          onLayoutChange={handleLayoutChange}
        /> */}
        <ActionButtons
          onPreview={handlePreview}
          onClear={() => setShowClearDialog(true)}
          onManageTimeline={handleManageTimeline}
          onManageResumes={handleManageResumes}
        />
      </AppHeader>

      <main className="max-w-6xl mx-auto p-4">
        <ResumeDisplay
          resume={resume}
          isEditable={true}
          className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen"
        />
      </main>

      <ClearConfirmDialog
        isOpen={showClearDialog}
        onClose={() => setShowClearDialog(false)}
        onConfirm={handleClear}
      />

      {/* 懒加载模块管理器（无loading避免闪烁） */}
      {showTimelineManager && (
        <Suspense fallback={null}>
          <SectionManager
            isOpen={showTimelineManager}
            onClose={() => setShowTimelineManager(false)}
          />
        </Suspense>
      )}

      {/* 简历管理对话框 */}
      <ResumeManagerDialog isOpen={showResumeManager} onClose={() => setShowResumeManager(false)} />

      <AppFooter />
    </div>
  );
};
