import { ResumeDisplay } from '@/components/ResumeDisplay';
import { PreviewPageFooter } from '@/components/layout/PreviewPageFooter';
import { PrintTipBar } from '@/components/layout/PrintTipBar';
import { useJson } from '@/hooks/useJson';
import { resumeAtom } from '@/store/resumeStore';
import { useAtomValue } from 'jotai';

export const PreviewPageContainer = () => {
  const resume = useAtomValue(resumeAtom);
  const { handleExportJson } = useJson();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      <PrintTipBar onPrint={handlePrint} onExportPdf={handleExportJson} />

      {/* 简历内容 */}
      <ResumeDisplay
        resume={resume}
        isEditable={false}
        className="max-w-4xl mx-auto p-4 bg-white min-h-screen print:p-2 print:max-w-none"
      />

      <PreviewPageFooter />

      {/* 注入自定义CSS */}
      {resume.style?.customCSS && (
        <style id="resume-custom-css" dangerouslySetInnerHTML={{ __html: resume.style.customCSS }} />
      )}
    </div>
  );
};
