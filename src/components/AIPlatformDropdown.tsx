import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Settings, ExternalLink } from 'lucide-react';
import { useAtomValue } from 'jotai';
import { aiPlatformsAtom } from '@/store/aiPlatformStore';

interface AIPlatformDropdownProps {
  onManagePlatforms: () => void;
}

export const AIPlatformDropdown = ({ onManagePlatforms }: AIPlatformDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const platforms = useAtomValue(aiPlatformsAtom);

  const handlePlatformClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleManageClick = () => {
    onManagePlatforms();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 text-xs px-2 py-1 h-auto"
      >
        <span>常用AI工具平台</span>
        <ChevronDown className="h-3 w-3 ml-1" />
      </Button>

      {isOpen && (
        <>
          {/* 遮罩层 */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* 下拉菜单 */}
          <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <div className="py-1">
              {/* AI平台列表 */}
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center space-x-2 text-gray-700"
                  onClick={() => handlePlatformClick(platform.url)}
                >
                  <span className="text-base">{platform.icon}</span>
                  <span className="flex-1">{platform.name}</span>
                  <ExternalLink className="h-3 w-3 text-gray-400" />
                </button>
              ))}
              
              {platforms.length === 0 && (
                <div className="px-3 py-2 text-sm text-gray-500 text-center">
                  暂无AI平台
                </div>
              )}

              {/* 分隔线 */}
              {platforms.length > 0 && (
                <div className="border-t border-gray-200 my-1" />
              )}

              {/* 管理按钮 */}
              <button
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center space-x-2 text-blue-600"
                onClick={handleManageClick}
              >
                <Settings className="h-4 w-4" />
                <span>管理AI平台</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
