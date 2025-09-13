import { ResumeDisplay } from '@/components/ResumeDisplay';
import { Button } from '@/components/ui/button';
import { resumeAtom } from '@/store/resumeStore';
import { useAtomValue } from 'jotai';
import { Eye, ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';

export const ResumePreviewPanel = () => {
  const resume = useAtomValue(resumeAtom);
  const [scale, setScale] = useState(100);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 10, 150));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 10, 50));
  };

  const handleFullPreview = () => {
    window.open('/preview', '_blank');
  };

  return (
    <div className="h-full flex flex-col">
      {/* 头部控制栏 */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">实时预览</h2>
            <p className="text-sm text-gray-600 mt-1">
              左侧的修改会立即在此处显示
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {/* 缩放控制 */}
            <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-lg">
              <Button
                onClick={handleZoomOut}
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                disabled={scale <= 50}
              >
                <ZoomOut className="h-3 w-3" />
              </Button>
              
              <span className="text-xs font-medium text-gray-600 min-w-[3rem] text-center">
                {scale}%
              </span>
              
              <Button
                onClick={handleZoomIn}
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                disabled={scale >= 150}
              >
                <ZoomIn className="h-3 w-3" />
              </Button>
            </div>

            {/* 全屏预览 */}
            <Button
              onClick={handleFullPreview}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">预览 & 导出</span>
            </Button>
          </div>
        </div>
      </div>

      {/* 预览内容 */}
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <div className="flex justify-center">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <ResumeDisplay
              resume={resume}
              isEditable={false}
              scale={scale}
              className="min-h-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
