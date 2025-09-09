import { ResumeDisplay } from '@/components/ResumeDisplay';
import { PreviewPageFooter } from '@/components/layout/PreviewPageFooter';
import { PrintTipBar } from '@/components/layout/PrintTipBar';
import { usePreviewScale } from '@/hooks/components/usePreviewScale';
import { usePageCount } from '@/hooks/components/usePageCount';
import { resumeAtom } from '@/store/resumeStore';
import { useAtomValue } from 'jotai';

export const PreviewPageContainer = () => {
  const resume = useAtomValue(resumeAtom);
  const { scale, onScaleChange } = usePreviewScale();
  const { pageCount } = usePageCount(scale);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      <PrintTipBar
        onPrint={handlePrint}
        scale={scale}
        onScaleChange={onScaleChange}
        pageCount={pageCount}
      />

      {/* 简历内容 */}
      <ResumeDisplay
        resume={resume}
        isEditable={false}
        scale={scale}
        className="max-w-4xl mx-auto p-4 bg-white min-h-screen print:p-2 print:max-w-none"
      />

      <PreviewPageFooter />
    </div>
  );
};
