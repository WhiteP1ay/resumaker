import { FileText, Sparkles } from 'lucide-react';
import { MobileResumeDrawer, MobileResumeSwitcher } from '@/components/resume-switcher/MobileResumeDrawer.tsx';
import { useState } from 'react';

interface AppHeaderProps {
  children: React.ReactNode;
}

export const AppHeader = ({ children }: AppHeaderProps) => {
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 mr-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <Sparkles className="absolute -top-0.5 -right-0.5 h-3 w-3 text-yellow-400" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  简历制作工具
                </h1>
                <p className="text-xs text-gray-600">创建专业的个人简历，展示最好的自己</p>
              </div>
            </div>

            {/* 移动端简历切换器 */}
            <div className="block mr-3 lg:hidden">
              <MobileResumeSwitcher onOpenDrawer={() => setShowMobileDrawer(true)} />
            </div>

            {/* 右侧操作区域 */}
            <div className="flex items-center space-x-3">{children}</div>
          </div>
        </div>
      </header>

      {/* 移动端抽屉 */}
      <MobileResumeDrawer
        isOpen={showMobileDrawer}
        onClose={() => setShowMobileDrawer(false)}
      />
    </>
  );
};
