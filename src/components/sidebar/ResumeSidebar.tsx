import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useResumeManager } from '@/hooks/useResumeManager';
import { ChevronLeft, ChevronRight, FileText, Plus, Search, X } from 'lucide-react';
import MiniSearch from 'minisearch';
import { useMemo, useState } from 'react';
import type { ResumeMetadata } from '@/types/resume';

interface ResumeSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const ResumeSidebar = ({ isCollapsed, onToggleCollapse }: ResumeSidebarProps) => {
  const { resumeList, currentResumeId, switchResume, createResume } = useResumeManager();

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
    const searchData = resumeList.map((resume) => ({
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
        .map((result) => resumeList.find((resume) => resume.id === result.id))
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
  };

  const handleCreateResume = () => {
    createResume(`新简历 ${resumeList.length + 1}`, '简历描述');
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  if (isCollapsed) {
    return (
      <div className="w-12 bg-white border-r border-gray-200 flex flex-col items-center py-4">
        <Button variant="ghost" size="sm" onClick={onToggleCollapse} className="p-2 mb-4">
          <ChevronRight className="h-4 w-4" />
        </Button>

        <div className="flex flex-col space-y-2">
          {resumeList.slice(0, 3).map((resume) => (
            <Button
              key={resume.id}
              variant={resume.id === currentResumeId ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleSwitchResume(resume.id)}
              className="p-2 w-8 h-8"
              title={resume.title}
            >
              <FileText className="h-4 w-4" />
            </Button>
          ))}

          {resumeList.length > 3 && (
            <div className="text-xs text-gray-400 text-center">+{resumeList.length - 3}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* 头部 */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">简历列表</h2>
          <Button variant="ghost" size="sm" onClick={onToggleCollapse} className="p-2">
            <ChevronLeft className="h-4 w-4" />
          </Button>
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
                  hover:bg-gray-50 flex items-start space-x-3
                  ${
                    resume.id === currentResumeId
                      ? 'bg-blue-50 border border-blue-200 text-blue-700'
                      : 'border border-transparent text-gray-700 hover:border-gray-200'
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
                    <div className="text-sm text-gray-500 truncate">{resume.description}</div>
                  )}
                  <div className="text-xs text-gray-400 mt-1">
                    创建时间: {new Date(resume.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* 底部信息 */}
      <div className="p-3 border-t border-gray-200 text-xs text-gray-500">
        共 {resumeList.length} 份简历
        {searchQuery && filteredResumes.length !== resumeList.length && (
          <span className="ml-2">({filteredResumes.length} 匹配)</span>
        )}
      </div>
    </div>
  );
};
