/**
 * 富文本迁移检测和转换 Hook
 */
import { convertPlainTextToHtml, isPlainText } from '@/lib/textToHtmlConverter';
import { resumeAtom } from '@/store/resumeStore';
import type { ListItem, Resume, TextContent, TimelineItem } from '@/types/resume';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

// localStorage 中存储迁移状态的 key
const MIGRATION_STATUS_KEY = 'rich-text-migration-handled';

export const useRichTextMigration = () => {
  const [resume, setResume] = useAtom(resumeAtom);
  const [needsMigration, setNeedsMigration] = useState(false);

  // 检测是否需要迁移（仅在组件挂载时执行一次）
  useEffect(() => {
    // 检查是否已经处理过迁移（用户已转换或选择了暂不升级）
    const migrationHandled = localStorage.getItem(MIGRATION_STATUS_KEY);
    if (migrationHandled === 'true') {
      return;
    }

    // 直接从 localStorage 读取数据，避免读取到 initialResume
    const resumeDataStr = localStorage.getItem('resume-data');
    if (!resumeDataStr) {
      // 如果 localStorage 中没有数据，说明是全新用户，不需要迁移
      return;
    }

    let resumeData: Resume;
    try {
      resumeData = JSON.parse(resumeDataStr);
    } catch (error) {
      console.error('Failed to parse resume data:', error);
      return;
    }

    let needsConversion = false;

    // 检查所有 section 的数据
    for (const section of resumeData.sections) {
      if (section.type === 'basic') continue;

      if (section.editorType === 'text') {
        // 文本类型
        const data = section.data as TextContent;
        if (data.content && isPlainText(data.content)) {
          needsConversion = true;
          break;
        }
      } else if (section.editorType === 'timeline') {
        // 时间线类型
        const data = section.data as TimelineItem[];
        for (const item of data) {
          if (item.description && isPlainText(item.description)) {
            needsConversion = true;
            break;
          }
        }
        if (needsConversion) break;
      } else if (section.editorType === 'list') {
        // 列表类型
        const data = section.data as ListItem[];
        for (const item of data) {
          if (item.content && isPlainText(item.content)) {
            needsConversion = true;
            break;
          }
        }
        if (needsConversion) break;
      }
    }

    setNeedsMigration(needsConversion);
  }, []); // 只在组件挂载时执行一次

  // 执行迁移
  const migrate = () => {
    const updatedResume: Resume = {
      ...resume,
      sections: resume.sections.map((section) => {
        if (section.type === 'basic') {
          return section;
        }

        if (section.editorType === 'text') {
          // 转换文本类型
          const data = section.data as TextContent;
          return {
            ...section,
            data: {
              ...data,
              content: convertPlainTextToHtml(data.content),
            },
          };
        } else if (section.editorType === 'timeline') {
          // 转换时间线类型
          const data = section.data as TimelineItem[];
          return {
            ...section,
            data: data.map((item) => ({
              ...item,
              description: convertPlainTextToHtml(item.description),
            })),
          };
        } else if (section.editorType === 'list') {
          // 转换列表类型
          const data = section.data as ListItem[];
          return {
            ...section,
            data: data.map((item) => ({
              ...item,
              content: convertPlainTextToHtml(item.content),
            })),
          };
        }

        return section;
      }),
    };

    setResume(updatedResume);
    setNeedsMigration(false);
    // 标记为已处理，下次不再提示
    localStorage.setItem(MIGRATION_STATUS_KEY, 'true');
  };

  // 取消迁移（不再提示）
  const cancelMigration = () => {
    setNeedsMigration(false);
    // 标记为已处理，下次不再提示
    localStorage.setItem(MIGRATION_STATUS_KEY, 'true');
  };

  return {
    needsMigration,
    migrate,
    cancelMigration,
  };
};
