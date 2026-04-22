import { FileText } from 'lucide-react';
import { IconRenderer } from '../IconPicker';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface AppHeaderProps {
  children: React.ReactNode;
}

export const AppHeader = ({ children }: AppHeaderProps) => {
  return (
    <header className="bg-white/85 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-40 shadow-sm print:hidden">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center shadow-sm">
            <FileText className="h-4 w-4 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-base font-bold text-gray-900 tracking-tight">
            Resumaker
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1">
          {/* Social Links */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                aria-label="GitHub 源码"
                className="flex items-center justify-center w-8 h-8 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-150"
                onClick={() => window.open('https://github.com/WhiteP1ay/resumaker', '_blank')}
              >
                <IconRenderer iconName="github" className="h-4 w-4" aria-hidden="true" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>GitHub 源码，给个⭐️~~</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                aria-label="个人网站"
                className="flex items-center justify-center w-8 h-8 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-150"
                onClick={() => window.open('https://whitemeta.cn', '_blank')}
              >
                <IconRenderer iconName="globe" className="h-4 w-4" aria-hidden="true" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>个人网站，欢迎访问</p>
            </TooltipContent>
          </Tooltip>

          {/* Divider */}
          <div className="w-px h-5 bg-gray-200 mx-2" />

          {/* Action Buttons */}
          {children}
        </div>
      </div>
    </header>
  );
};
