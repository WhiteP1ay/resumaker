/**
 * 时间线组件 - 简历模块显示
 */
import { ListEditor } from '@/components/editors/ListEditor';
import { TextEditor } from '@/components/editors/TextEditor';
import { TimelineEditor } from '@/components/editors/TimelineEditor';
import { IconRenderer } from '@/components/IconPicker';
import {
  ListContent,
  TextContentRenderer,
  TimelineContent,
} from '@/components/theme/TimelineContentRenderer';
import { Button } from '@/components/ui/button';
import { useTimelineSection } from '@/hooks/components/useTimelineSection';
import type { ListItem, ResumeSection, TextContent, TimelineItem } from '@/types/resume';
import { Edit3 } from 'lucide-react';
import React from 'react';

interface TimelineSectionProps {
  section: ResumeSection;
  isEditable?: boolean;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ section, isEditable }) => {
  const { isEditing, editorType, startEditing, getEditorProps } = useTimelineSection(section);

  // 渲染内容
  const renderContent = () => {
    if (editorType === 'list') {
      return <ListContent data={section.data as ListItem[]} />;
    } else if (editorType === 'text') {
      return <TextContentRenderer data={section.data as TextContent} />;
    } else {
      return <TimelineContent data={section.data as TimelineItem[]} />;
    }
  };

  // 根据编辑器类型渲染对应的编辑器
  const renderEditor = () => {
    if (!isEditing) return null;

    const editorProps = getEditorProps();

    switch (editorType) {
      case 'text':
        return (
          <TextEditor
            {...editorProps}
            initialData={editorProps.initialData as TextContent}
            selectedIcon={section.iconName || 'briefcase'}
            iconEnabled={true}
          />
        );
      case 'list':
        return <ListEditor {...editorProps} initialData={editorProps.initialData as ListItem[]} />;
      case 'timeline':
      default:
        return (
          <TimelineEditor
            {...editorProps}
            initialData={editorProps.initialData as TimelineItem[]}
            selectedIcon={section.iconName || 'briefcase'}
            iconEnabled={true}
          />
        );
    }
  };

  return (
    <>
      {/* 模块内容 */}
      <div className="relative group">
        {/* 编辑按钮 */}
        {isEditable && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-[.5rem] right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-100 h-8 w-8 print:hidden z-10"
            onClick={startEditing}
          >
            <Edit3 className="h-4 w-4 text-gray-600" />
          </Button>
        )}

        <div className="mb-6 print:mb-6">
          {/* 模块标题 */}
          <div className="flex items-center pb-[.5rem] border-b-gray-400 border-b-[1px]">
            <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
            {/* 图标 */}
            {section.iconName && (
              <div className="p-2">
                <IconRenderer iconName={section.iconName} className="h-4 w-4" />
              </div>
            )}
          </div>

          <div className="mt-[.5rem]">{renderContent()}</div>
        </div>
      </div>
      {renderEditor()}
    </>
  );
};
