import { ClearConfirmDialog } from '@/components/dialogs/ClearConfirmDialog';
import { CustomCssEditorDialog } from '@/components/dialogs/CustomCssEditorDialog';
import { ResumeSettingsDialog } from '@/components/dialogs/ResumeSettingsDialog';
import { ActionButtons } from '@/components/layout/ActionButtons';
import { AppFooter } from '@/components/layout/AppFooter';
import { AppHeader } from '@/components/layout/AppHeader';
import { ResumeDisplay } from '@/components/ResumeDisplay';
import { useResumeActions } from '@/hooks/useResumeActions';
import { resumeAtom } from '@/store/resumeStore';
import { useAtomValue } from 'jotai';
import { useState } from 'react';

export const MainPageContainer = () => {
  const resume = useAtomValue(resumeAtom);
  const { clearResume } = useResumeActions();
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showResumeSettings, setShowResumeSettings] = useState(false);
  const [showCustomStyle, setShowCustomStyle] = useState(false);

  const style = resume.style;
  const resumeStyleCSS = style?.customCSS;

  const handlePreview = () => {
    window.open('/resume/preview', '_blank');
  };

  const handleClear = () => {
    clearResume();
    setShowClearDialog(false);
  };

  const handleManageResume = () => {
    setShowResumeSettings(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader>
        <ActionButtons
          onPreview={handlePreview}
          onClear={() => setShowClearDialog(true)}
          onManageResume={handleManageResume}
          onCustomStyle={() => setShowCustomStyle(true)}
        />
      </AppHeader>

      <main className="max-w-6xl mx-auto p-4">
        <ResumeDisplay resume={resume} isEditable={true} className="min-h-screen" />
      </main>

      <ClearConfirmDialog
        isOpen={showClearDialog}
        onClose={() => setShowClearDialog(false)}
        onConfirm={handleClear}
      />

      <ResumeSettingsDialog
        isOpen={showResumeSettings}
        onClose={() => setShowResumeSettings(false)}
      />

      <CustomCssEditorDialog
        isOpen={showCustomStyle}
        onClose={() => setShowCustomStyle(false)}
      />

      {/* 注入自定义CSS */}
      {resumeStyleCSS && (
        <style id="resume-custom-css" dangerouslySetInnerHTML={{ __html: resumeStyleCSS }} />
      )}

      <AppFooter />
    </div>
  );
};
