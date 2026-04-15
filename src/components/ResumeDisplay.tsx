import type { Resume } from '@/types/resume';
import { BasicInfoSection } from './theme/BasicInfoSection';
import { TimelineSection } from './theme/TimelineSection';

interface ResumeDisplayProps {
  resume: Resume;
  isEditable?: boolean;
  className?: string;
}

const SinglePageResume = ({
  resume,
  isEditable,
  pageNumber = 1,
  getSectionClassName,
}: {
  resume: Resume;
  isEditable: boolean;
  pageNumber?: number;
  getSectionClassName: (sectionId: string, defaultClass: string) => string;
}) => {
  const basicInfoSection = resume.sections.find((s) => s.type === 'basic');

  const timelineSections = resume.sections
    .filter((s) => s.type === 'timeline')
    .filter((s) => s.visible)
    .filter((s) => {
      if (resume.pageSettings?.enableMultiPage) {
        return (s.pageNumber || 1) === pageNumber;
      }
      return true;
    })
    .sort((a, b) => a.order - b.order);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none print:max-w-none">
      {pageNumber === 1 && basicInfoSection && (
        <BasicInfoSection
          section={basicInfoSection}
          isEditable={isEditable}
          className={getSectionClassName(basicInfoSection.id, 'base-info')}
        />
      )}
      {timelineSections.length > 0 && (
        <div className={`px-8 pb-8 print:px-6 print:pb-6 ${pageNumber !== 1 ? 'pt-8' : ''}`}>
          <div className="space-y-6 print:space-y-4">
            {timelineSections.map((section, index) => (
              <TimelineSection
                key={section.id}
                section={section}
                isEditable={isEditable}
                className={getSectionClassName(section.id, `timeline-${index + 1}`)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const ResumeDisplay = ({ resume, isEditable = false, className = '' }: ResumeDisplayProps) => {
  const getSectionClassName = (sectionId: string, defaultClass: string): string => {
    const custom = resume.style?.sections?.find((s) => s.sectionId === sectionId)?.className;
    return custom ? `${defaultClass} ${custom}` : defaultClass;
  };

  if (!resume.pageSettings?.enableMultiPage || resume.pageSettings.totalPages <= 1) {
    return (
      <div className={`print-container ${className}`}>
        <SinglePageResume resume={resume} isEditable={isEditable} getSectionClassName={getSectionClassName} />
      </div>
    );
  }

  return (
    <div className={`print-container ${className}`}>
      <div className="space-y-8 print:space-y-0">
        {Array.from({ length: resume.pageSettings.totalPages }, (_, i) => (
          <div key={i + 1} className="print:page-break-after-always print:page-break-inside-avoid">
            <SinglePageResume
              resume={resume}
              isEditable={isEditable}
              pageNumber={i + 1}
              getSectionClassName={getSectionClassName}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
