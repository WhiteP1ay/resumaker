import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';
import { SectionEditorPanel } from '@/components/section-manager/SectionEditorPanel';
import { ResumePreviewPanel } from '@/components/section-manager/ResumePreviewPanel';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SectionManagerContainer = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <AppHeader>
        <div className="flex items-center gap-4">
          <Button
            onClick={handleBack}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">返回编辑</span>
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">模块管理</h1>
              <p className="text-sm text-gray-600">管理您的简历模块</p>
            </div>
          </div>
        </div>
      </AppHeader>

      <div className="flex h-[calc(100vh-120px)]">
        {/* 左侧编辑面板 */}
        <div className="w-1/2 border-r border-gray-200 bg-white">
          <SectionEditorPanel />
        </div>

        {/* 右侧预览面板 */}
        <div className="w-1/2 bg-gray-50">
          <ResumePreviewPanel />
        </div>
      </div>

      <AppFooter />
    </div>
  );
};
