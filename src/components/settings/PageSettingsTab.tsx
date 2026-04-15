import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import type { ResumeSection } from '@/types/resume';
import { RotateCcw, Settings } from 'lucide-react';
import { PagePreviewBox } from './PagePreviewBox';
import { SectionPageAssignment } from './SectionPageAssignment';

interface PageSettingsTabProps {
  pageSettings: {
    isMultiPageEnabled: boolean;
    sections: ResumeSection[];
    localPageAssignments: Record<string, number>;
    handleEnableMultiPage: () => void;
    handleDisableMultiPage: () => void;
    handleSectionPageChange: (sectionId: string, pageNumber: number) => void;
    handleAutoAssign: () => void;
    handleResetAssignments: () => void;
    getPageSectionCount: (pageNumber: number) => number;
    applyPageAssignments: () => void;
  };
}

export const PageSettingsTab = ({ pageSettings }: PageSettingsTabProps) => {
  const {
    isMultiPageEnabled,
    sections,
    localPageAssignments,
    handleEnableMultiPage,
    handleDisableMultiPage,
    handleSectionPageChange,
    handleAutoAssign,
    handleResetAssignments,
    getPageSectionCount,
  } = pageSettings;

  return (
    <div className="space-y-6">
      {/* 多页模式开关 */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-medium text-gray-700">
              多页模式 {isMultiPageEnabled ? '（已启用）' : '（已禁用）'}
            </Label>
            <p className="text-xs text-gray-500 mt-1">
              {isMultiPageEnabled
                ? '简历将分为两页显示，你可以自由分配模块到不同页面'
                : '点击启用后，可以将简历分为两页'}
            </p>
          </div>
          <div className="flex gap-2">
            {!isMultiPageEnabled ? (
              <Button onClick={handleEnableMultiPage}>
                启用多页
              </Button>
            ) : (
              <Button onClick={handleDisableMultiPage} variant="outline">
                禁用多页
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* 模块页面分配 */}
      {isMultiPageEnabled && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-gray-700">模块页面分配</Label>
            <div className="flex gap-2">
              <Button onClick={handleAutoAssign} size="sm" variant="outline">
                <Settings className="h-4 w-4 mr-1" />
                自动分配
              </Button>
              <Button onClick={handleResetAssignments} size="sm" variant="outline">
                <RotateCcw className="h-4 w-4 mr-1" />
                重置
              </Button>
            </div>
          </div>

          {/* 页面预览 */}
          <div className="grid grid-cols-2 gap-4">
            <PagePreviewBox
              pageNumber={1}
              sections={sections}
              sectionCount={getPageSectionCount(1)}
              localPageAssignments={localPageAssignments}
            />
            <PagePreviewBox
              pageNumber={2}
              sections={sections}
              sectionCount={getPageSectionCount(2)}
              localPageAssignments={localPageAssignments}
            />
          </div>

          {/* 模块分配列表 */}
          <div className="space-y-2">
            {sections.map((section) => (
              <SectionPageAssignment
                key={section.id}
                section={section}
                currentPage={localPageAssignments[section.id] || 1}
                onPageChange={handleSectionPageChange}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
