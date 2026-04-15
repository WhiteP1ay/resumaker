import { ClearConfirmDialog } from '@/components/dialogs/ClearConfirmDialog';
import { ActionButtons } from '@/components/layout/ActionButtons';
import { AppFooter } from '@/components/layout/AppFooter';
import { AppHeader } from '@/components/layout/AppHeader';
import { ResumeDisplay } from '@/components/ResumeDisplay';
import { ResumeSettingsSidebar } from '@/components/settings/ResumeSettingsSidebar';
import { CustomCssStyleTag } from '@/components/style/CustomCssStyleTag';
import { useResumeActions } from '@/hooks/useResumeActions';
import { resumeAtom } from '@/store/resumeStore';
import { useAtomValue } from 'jotai';
import { useState } from 'react';

export const MainPageContainer = () => {
  const resume = useAtomValue(resumeAtom);
  const { clearResume } = useResumeActions();
  const [showClearDialog, setShowClearDialog] = useState(false);

  const style = resume.style;
  const resumeStyleCSS = style?.customCSS;

  const handlePreview = () => {
    window.open('/resume/preview', '_blank');
  };

  const handleClear = () => {
    clearResume();
    setShowClearDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader>
        <ActionButtons onPreview={handlePreview} />
      </AppHeader>

      <main className="max-w-[1480px] mx-auto p-4">
        <div className="flex items-start gap-4">
          <ResumeSettingsSidebar onClearResume={() => setShowClearDialog(true)} />
          <div className="flex-1 min-w-0">
            <ResumeDisplay resume={resume} isEditable={true} className="min-h-screen" />
          </div>
        </div>
      </main>

      <ClearConfirmDialog
        isOpen={showClearDialog}
        onClose={() => setShowClearDialog(false)}
        onConfirm={handleClear}
      />

      {/* 注入自定义CSS */}
      {resumeStyleCSS && <CustomCssStyleTag cssText={resumeStyleCSS} />}

      <AppFooter />
    </div>
  );
};
