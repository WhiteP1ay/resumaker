import { useMemo, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { Plus, Search } from 'lucide-react';
import MiniSearch from 'minisearch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FloatingMessage } from '@/components/ui/floating-message';
import {
  addPromptAtom,
  deletePromptAtom,
  promptsAtom,
  searchKeywordAtom,
  updatePromptAtom,
} from '@/store/promptStore';
import { type ResumePrompt } from '@/types/prompt';
import { PromptCard } from '@/components/prompt/PromptCard';
import { PromptDialog } from '@/components/prompt/PromptDialog';
import { DeletePromptConfirmDialog } from '@/components/dialogs/DeletePromptConfirmDialog';
import { useFloatingMessage } from '@/hooks/useFloatingMessage';

export const PromptManagePage = () => {
  const prompts = useAtomValue(promptsAtom);
  const [searchKeyword, setSearchKeyword] = useAtom(searchKeywordAtom);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<ResumePrompt | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    promptId: string;
    promptTitle: string;
  }>({ isOpen: false, promptId: '', promptTitle: '' });
  const [, addPrompt] = useAtom(addPromptAtom);
  const [, updatePrompt] = useAtom(updatePromptAtom);
  const [, deletePrompt] = useAtom(deletePromptAtom);

  // Floating message hook
  const {
    isVisible,
    message,
    variant,
    position,
    showSuccess,
    showError,
    hideMessage,
    autoClose,
    autoCloseDelay,
  } = useFloatingMessage();

  // 创建搜索索引
  const miniSearch = useMemo(() => {
    const ms = new MiniSearch({
      fields: ['title', 'content', 'tags'], // 搜索字段
      storeFields: ['id', 'title', 'content', 'tags', 'createdAt', 'updatedAt'], // 存储字段
      searchOptions: {
        boost: { title: 3, tags: 2, content: 1 }, // 字段权重
        fuzzy: 0.2, // 模糊搜索
        prefix: true, // 前缀匹配
      },
    });

    // 添加所有提示词到搜索索引
    const searchData = prompts.map((prompt) => ({
      id: prompt.id,
      title: prompt.title,
      content: prompt.content,
      tags: prompt.tags || [],
    }));

    ms.addAll(searchData);
    return ms;
  }, [prompts]);

  // 过滤和搜索逻辑
  const filteredPrompts = useMemo(() => {
    let result = prompts;

    // 按搜索关键词过滤
    if (searchKeyword.trim()) {
      try {
        const searchResults = miniSearch.search(searchKeyword);
        const searchResultIds = new Set(searchResults.map((result) => result.id));
        result = result.filter((prompt) => searchResultIds.has(prompt.id));
      } catch (error) {
        console.error('Search error:', error);
        // 如果搜索出错，返回所有结果
      }
    }

    return result;
  }, [prompts, searchKeyword, miniSearch]);

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const handleAddPrompt = () => {
    setEditingPrompt(null);
    setIsDialogOpen(true);
  };

  const handleEditPrompt = (prompt: ResumePrompt) => {
    setEditingPrompt(prompt);
    setIsDialogOpen(true);
  };

  const handleDeletePrompt = (promptId: string) => {
    const prompt = prompts.find((p) => p.id === promptId);
    if (prompt) {
      setDeleteConfirm({
        isOpen: true,
        promptId,
        promptTitle: prompt.title,
      });
    }
  };

  const confirmDeletePrompt = () => {
    deletePrompt(deleteConfirm.promptId);
    showSuccess('提示词删除成功');
    setDeleteConfirm({ isOpen: false, promptId: '', promptTitle: '' });
  };

  const cancelDeletePrompt = () => {
    setDeleteConfirm({ isOpen: false, promptId: '', promptTitle: '' });
  };

  const handleCopyPrompt = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      showSuccess('提示词已复制到剪贴板');
    } catch (error) {
      console.error('复制失败:', error);
      showError('复制失败，请手动复制');
    }
  };

  const handleSavePrompt = (promptData: Omit<ResumePrompt, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingPrompt) {
      updatePrompt({ ...promptData, id: editingPrompt.id });
    } else {
      addPrompt(promptData);
    }
    setIsDialogOpen(false);
    setEditingPrompt(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部导航 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">简历优化提示词管理</h1>
            </div>
            <Button onClick={handleAddPrompt} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              添加提示词
            </Button>
          </div>
        </div>
      </div>

      {/* 搜索 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="搜索提示词标题、内容或标签..."
            value={searchKeyword}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* 统计信息 */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-600">
            共找到 {filteredPrompts.length} 个提示词
            {searchKeyword && (
              <span className="ml-2">
                搜索: "<span className="font-medium">{searchKeyword}</span>"
              </span>
            )}
          </div>
        </div>

        {/* 提示词卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onEdit={handleEditPrompt}
              onDelete={handleDeletePrompt}
              onCopy={handleCopyPrompt}
            />
          ))}
        </div>

        {/* 空状态 */}
        {filteredPrompts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg font-medium">没有找到匹配的提示词</p>
              <p className="text-sm mt-2">
                {searchKeyword ? '尝试调整搜索条件' : '还没有添加任何提示词'}
              </p>
            </div>
            {!searchKeyword && (
              <Button onClick={handleAddPrompt} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                添加第一个提示词
              </Button>
            )}
          </div>
        )}
      </div>

      {/* 提示词编辑对话框 */}
      <PromptDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingPrompt(null);
        }}
        onSave={handleSavePrompt}
        prompt={editingPrompt}
      />

      {/* 浮动消息 */}
      <FloatingMessage
        isVisible={isVisible}
        message={message}
        variant={variant}
        position={position}
        onClose={hideMessage}
        autoClose={autoClose}
        autoCloseDelay={autoCloseDelay}
      />

      {/* 删除确认对话框 */}
      <DeletePromptConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={cancelDeletePrompt}
        onConfirm={confirmDeletePrompt}
        promptTitle={deleteConfirm.promptTitle}
      />
    </div>
  );
};
