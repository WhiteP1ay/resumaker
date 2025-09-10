import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useResumeManager } from '@/hooks/useResumeManager';
import { FileText, Menu, Plus, Search, X } from 'lucide-react';
import MiniSearch from 'minisearch';
import { useMemo, useState } from 'react';
import type { ResumeMetadata } from '@/types/resume';

interface MobileResumeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileResumeDrawer = ({ isOpen, onClose }: MobileResumeDrawerProps) => {
  const {
    resumeList,
    currentResumeId,
    switchResume,
    getResumeMetadata,
    createResume,
  } = useResumeManager();

  const [searchQuery, setSearchQuery] = useState('');

  // 创建搜索索引
  const miniSearch = useMemo(() => {
    const ms = new MiniSearch({
      fields: ['title', 'description'], // 搜索字段
      storeFields: ['id', 'title', 'description'], // 存储字段
      searchOptions: {
        boost: { title: 2 }, // 标题权重更高
        fuzzy: 0.2, // 模糊搜索
        prefix: true, // 前缀匹配
      },
    });

    // 添加所有简历到搜索索引
    const searchData = resumeList.map(resume => ({
      id: resume.id,
      title: resume.title,
      description: resume.description || '',
    }));

    ms.addAll(searchData);
    return ms;
  }, [resumeList]);

  // 过滤简历列表
  const filteredResumes = useMemo(() => {
    if (!searchQuery.trim()) {
      return resumeList;
    }

    try {
      const searchResults = miniSearch.search(searchQuery);
      const filteredList = searchResults
        .map(result => resumeList.find(resume => resume.id === result.id))
        .filter((resume): resume is ResumeMetadata => resume !== undefined);
      return filteredList;
    } catch (error) {
      console.error('Search error:', error);
      return resumeList;
    }
  }, [searchQuery, resumeList, miniSearch]);

  const handleSwitchResume = (resumeId: string) => {
    if (resumeId !== currentResumeId) {
      switchResume(resumeId);
    }
    onClose();
  };

  const handleCreateResume = () => {
    createResume(`新简历 ${resumeList.length + 1}`, '简历描述');
    onClose();
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const currentResume = getResumeMetadata(currentResumeId);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* 遮罩层 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* 抽屉内容 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg z-50 max-h-[80vh] flex flex-col">
        {/* 头部 */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">简历列表</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* 当前简历显示 */}
          <div className="mb-3 p-2 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">
                当前: {currentResume?.title || '未知简历'}
              </span>
            </div>
          </div>

          {/* 搜索框 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="搜索简历标题或内容..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* 新建按钮 */}
          <Button
            onClick={handleCreateResume}
            className="w-full mt-3 flex items-center space-x-2"
            size="sm"
          >
            <Plus className="h-4 w-4" />
            <span>新建简历</span>
          </Button>
        </div>

        {/* 简历列表 */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            {filteredResumes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {searchQuery ? '未找到匹配的简历' : '暂无简历'}
              </div>
            ) : (
              filteredResumes.map((resume) => (
                <button
                  key={resume.id}
                  className={`
                    w-full p-3 text-left rounded-lg transition-colors mb-2
                    flex items-start space-x-3
                    ${resume.id === currentResumeId 
                      ? 'bg-blue-50 border border-blue-200 text-blue-700' 
                      : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                    }
                  `}
                  onClick={() => handleSwitchResume(resume.id)}
                >
                  <FileText className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate mb-1">
                      {resume.title}
                      {resume.id === currentResumeId && (
                        <span className="ml-2 text-xs bg-blue-100 px-2 py-0.5 rounded-full">
                          当前
                        </span>
                      )}
                    </div>
                    {resume.description && (
                      <div className="text-sm text-gray-500 truncate">
                        {resume.description}
                      </div>
                    )}
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(resume.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* 底部信息 */}
        <div className="p-3 border-t border-gray-200 text-xs text-gray-500 text-center">
          共 {resumeList.length} 份简历
          {searchQuery && filteredResumes.length !== resumeList.length && (
            <span className="ml-2">({filteredResumes.length} 匹配)</span>
          )}
        </div>
      </div>
    </>
  );
};

// 移动端简历切换按钮
interface MobileResumeSwitcherProps {
  onOpenDrawer: () => void;
}

export const MobileResumeSwitcher = ({ onOpenDrawer }: MobileResumeSwitcherProps) => {
  const { getResumeMetadata, currentResumeId } = useResumeManager();
  const currentResume = getResumeMetadata(currentResumeId);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onOpenDrawer}
      className="flex items-center space-x-2"
    >
      <Menu className="h-4 w-4" />
      <div className="flex items-center space-x-1">
        <FileText className="h-4 w-4" />
        <span className="truncate max-w-[120px]">
          {currentResume?.title || '未知简历'}
        </span>
      </div>
    </Button>
  );
};
