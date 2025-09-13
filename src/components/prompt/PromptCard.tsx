import { Edit2, Trash2, Copy, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ResumePrompt } from '@/types/prompt';

interface PromptCardProps {
  prompt: ResumePrompt;
  onEdit: (prompt: ResumePrompt) => void;
  onDelete: (promptId: string) => void;
  onCopy: (content: string) => void;
}

export const PromptCard = ({ prompt, onEdit, onDelete, onCopy }: PromptCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* 卡片头部 */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
              {prompt.title}
            </h3>
          </div>
          <div className="flex items-center space-x-1 ml-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCopy(prompt.content)}
              className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
              title="复制提示词"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(prompt)}
              className="h-8 w-8 p-0 text-gray-400 hover:text-blue-600"
              title="编辑"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(prompt.id)}
              className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
              title="删除"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 卡片内容 */}
      <div className="p-4">
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {truncateContent(prompt.content)}
        </p>

        {/* 标签 */}
        {prompt.tags.length > 0 && (
          <div className="flex items-center space-x-1 mb-4">
            <Tag className="h-3 w-3 text-gray-400" />
            <div className="flex flex-wrap gap-1">
              {prompt.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 时间信息 */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>创建: {formatDate(prompt.createdAt)}</span>
          </div>
          {prompt.updatedAt !== prompt.createdAt && (
            <span>更新: {formatDate(prompt.updatedAt)}</span>
          )}
        </div>
      </div>
    </div>
  );
};
