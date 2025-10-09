/**
 * 文本编辑器业务逻辑 Hook - 自动保存版本
 */
import { useAutoSaveDialog } from '@/hooks/useAutoSaveDialog';
import type { TextContent } from '@/types/resume';
import { useMemo } from 'react';

interface TextEditorData {
  content: string;
  selectedIcon: string;
  iconEnabled: boolean;
}

export const useTextEditor = (
  isOpen: boolean,
  initialData: TextContent,
  currentIcon: string,
  onSave: (data: TextContent, iconName?: string) => void,
  onClose: () => void
) => {
  // 使用通用的自动保存对话框 Hook
  const { data, setData, handleClose, saveStatusText } = useAutoSaveDialog<TextEditorData>({
    isOpen,
    initialData: {
      content: initialData.content,
      selectedIcon: currentIcon,
      iconEnabled: !!currentIcon && currentIcon !== '',
    },
    onSave: (data) => onSave({ content: data.content }, data.iconEnabled ? data.selectedIcon : ''),
    onClose,
    debounceDelay: 300,
  });

  const { content, selectedIcon, iconEnabled } = data;

  // 设置内容
  const setContent = (newContent: string) => {
    setData({ ...data, content: newContent });
  };

  // 设置选中图标
  const setSelectedIcon = (newIcon: string) => {
    setData({ ...data, selectedIcon: newIcon });
  };

  // 设置图标启用状态
  const setIconEnabled = (enabled: boolean) => {
    setData({ ...data, iconEnabled: enabled });
  };

  // 计算字数和行数（去除 HTML 标签后的纯文本）
  const { wordCount, lineCount } = useMemo(() => {
    // 将 HTML 转换为纯文本
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';

    const wordCount = plainText.length;
    const lineCount = plainText.split('\n').length;
    return { wordCount, lineCount };
  }, [content]);

  return {
    // 状态
    content,
    selectedIcon,
    iconEnabled,
    wordCount,
    lineCount,
    saveStatusText,

    // 操作方法
    setContent,
    setSelectedIcon,
    setIconEnabled,
    handleClose,
  };
};
