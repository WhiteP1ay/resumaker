import { Button } from '@/components/ui/button';
import { useResumeManager } from '@/hooks/useResumeManager';
import { ChevronDown, FileText } from 'lucide-react';
import { useState } from 'react';

export const ResumeQuickSwitcher = () => {
  const {
    resumeList,
    currentResumeId,
    switchResume,
    getResumeMetadata,
  } = useResumeManager();

  const [isOpen, setIsOpen] = useState(false);

  const currentResume = getResumeMetadata(currentResumeId);

  const handleSwitchResume = (resumeId: string) => {
    if (resumeId !== currentResumeId) {
      switchResume(resumeId);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="min-w-[150px] justify-between"
      >
        <div className="flex items-center space-x-2">
          <FileText className="h-4 w-4" />
          <span className="truncate max-w-[100px]">
            {currentResume?.title || '未知简历'}
          </span>
        </div>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {isOpen && (
        <>
          {/* 遮罩层 */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* 下拉菜单 */}
          <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-80 overflow-y-auto">
            <div className="py-1">
              {/* 简历列表 */}
              {resumeList.map((resume) => (
                <button
                  key={resume.id}
                  className={`
                    w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center space-x-2
                    ${resume.id === currentResumeId ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}
                  `}
                  onClick={() => handleSwitchResume(resume.id)}
                >
                  <FileText className="h-4 w-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">
                      {resume.title}
                      {resume.id === currentResumeId && (
                        <span className="ml-2 text-xs bg-blue-100 px-1 rounded">当前</span>
                      )}
                    </div>
                    {resume.description && (
                      <div className="text-xs text-gray-500 truncate">
                        {resume.description}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
