import type { ThemeRenderProps } from '@/components/theme/themeTypes';
import { MinimalBasicInfoSection } from './MinimalBasicInfoSection';
import { MinimalTimelineSection } from './MinimalTimelineSection';

const MinimalSinglePage = ({
  resume,
  isEditable,
  pageNumber = 1,
  getSectionClassName,
}: Omit<ThemeRenderProps, 'className'> & { pageNumber?: number }) => {
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
    <div
      className="minimal-theme-root max-w-4xl mx-auto bg-white shadow-lg print:shadow-none print:max-w-none"
      style={{
        backgroundColor: 'var(--minimal-paper-bg)',
      }}
    >
      {pageNumber === 1 && basicInfoSection && (
        <div
          className="minimal-basic-info-scope"
          style={{
            backgroundColor: 'var(--minimal-basic-info-bg)',
            marginBottom: 'var(--minimal-basic-info-bottom-spacing)',
          }}
        >
          <MinimalBasicInfoSection
            section={basicInfoSection}
            isEditable={isEditable}
            className={getSectionClassName(basicInfoSection.id, 'base-info')}
          />
        </div>
      )}
      {timelineSections.length > 0 && (
        <div className={`px-8 pb-8 print:px-6 print:pb-6 ${pageNumber !== 1 ? 'pt-8' : ''}`}>
          <div className="space-y-6 print:space-y-4">
            {timelineSections.map((section, index) => (
              <MinimalTimelineSection
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

export const MinimalTheme = ({
  resume,
  isEditable,
  className = '',
  getSectionClassName,
  themeStyle,
}: ThemeRenderProps) => {
  if (!resume.pageSettings?.enableMultiPage || resume.pageSettings.totalPages <= 1) {
    return (
      <div className={`print-container ${className}`} style={themeStyle}>
        <MinimalSinglePage
          resume={resume}
          isEditable={isEditable}
          getSectionClassName={getSectionClassName}
        />
      </div>
    );
  }

  return (
    <div className={`print-container ${className}`} style={themeStyle}>
      <div className="space-y-8 print:space-y-0">
        {Array.from({ length: resume.pageSettings.totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <div
              key={`page-${pageNumber}`}
              className="print:page-break-after-always print:page-break-inside-avoid"
            >
              <MinimalSinglePage
                resume={resume}
                isEditable={isEditable}
                pageNumber={pageNumber}
                getSectionClassName={getSectionClassName}
              />
            </div>
          ),
        )}
      </div>
    </div>
  );
};
