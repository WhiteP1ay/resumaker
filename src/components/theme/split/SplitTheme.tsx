import type { ThemeRenderProps } from '@/components/theme/themeTypes';
import { SplitBasicInfoSection } from './SplitBasicInfoSection';
import { SplitTimelineSection } from './SplitTimelineSection';

const SplitSinglePage = ({
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
    <div className="max-w-5xl mx-auto bg-white shadow-lg print:shadow-none">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] min-h-[1120px]">
        <aside
          className="relative border-r p-6"
          style={{
            backgroundColor: 'var(--split-sidebar-bg)',
            borderColor: 'var(--split-sidebar-border)',
          }}
        >
          <div
            className="absolute top-0 left-0 h-10 w-[65%]"
            style={{ backgroundColor: 'var(--split-accent-block)' }}
          />
          {pageNumber === 1 && basicInfoSection ? (
            <SplitBasicInfoSection
              section={basicInfoSection}
              isEditable={isEditable}
              className={getSectionClassName(basicInfoSection.id, 'base-info')}
            />
          ) : (
            <div className="text-xs text-slate-400 print:hidden">第 {pageNumber} 页</div>
          )}
        </aside>
        <div className="p-7">
          <div className="space-y-6">
            {timelineSections.map((section, index) => (
              <SplitTimelineSection
                key={section.id}
                section={section}
                isEditable={isEditable}
                className={getSectionClassName(section.id, `timeline-${index + 1}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SplitTheme = ({
  resume,
  isEditable,
  className = '',
  getSectionClassName,
  themeStyle,
}: ThemeRenderProps) => {
  if (!resume.pageSettings?.enableMultiPage || resume.pageSettings.totalPages <= 1) {
    return (
      <div className={`print-container ${className}`} style={themeStyle}>
        <SplitSinglePage resume={resume} isEditable={isEditable} getSectionClassName={getSectionClassName} />
      </div>
    );
  }

  return (
    <div className={`print-container ${className}`} style={themeStyle}>
      <div className="space-y-8">
        {Array.from({ length: resume.pageSettings.totalPages }, (_, index) => index + 1).map((pageNumber) => {
          const isLastPage = pageNumber === resume.pageSettings?.totalPages;
          return (
            <div
              key={`page-${pageNumber}`}
              className={`print:break-inside-avoid-page ${isLastPage ? '' : 'print:break-after-page'}`}
            >
              <SplitSinglePage
                resume={resume}
                isEditable={isEditable}
                pageNumber={pageNumber}
                getSectionClassName={getSectionClassName}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
