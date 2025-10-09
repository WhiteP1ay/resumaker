/**
 * 富文本编辑器组件
 * 基于 react-quill 封装，提供简洁的富文本编辑功能
 */
import { cn } from '@/lib/utils';
import { forwardRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

// 常用颜色列表
const EDITOR_COLORS = [
  '#000000', // 黑色
  '#374151', // 深灰
  '#6b7280', // 中灰
  '#ef4444', // 红色
  '#f97316', // 橙色
  '#f59e0b', // 黄色
  '#84cc16', // 绿色
  '#10b981', // 翠绿
  '#06b6d4', // 青色
  '#3b82f6', // 蓝色
  '#6366f1', // 靛蓝
  '#8b5cf6', // 紫色
  '#ec4899', // 粉色
  '#ffffff', // 白色
];

/**
 * 富文本编辑器组件
 * @param value - 编辑器内容（HTML 字符串）
 * @param onChange - 内容变化回调
 * @param placeholder - 占位符文本
 * @param className - 自定义样式类名
 * @param minHeight - 最小高度，默认 200px
 */
export const RichTextEditor = forwardRef<ReactQuill, RichTextEditorProps>(
  ({ value, onChange, placeholder, className, minHeight = '200px' }, ref) => {
    // 配置工具栏
    const modules = useMemo(
      () => ({
        toolbar: [
          [{ header: [1, 2, 3, false] }], // 标题
          [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
          ['bold', 'italic', 'underline', 'strike'], // 文字样式
          [
            { color: EDITOR_COLORS }, // 字体颜色
            { background: EDITOR_COLORS }, // 背景色
          ],
          [{ list: 'ordered' }, { list: 'bullet' }], // 列表
          [{ indent: '-1' }, { indent: '+1' }], // 缩进
          ['clean'], // 清除格式
        ],
      }),
      []
    );

    // 配置格式
    const formats = [
      'header',
      'size',
      'bold',
      'italic',
      'underline',
      'strike',
      'color',
      'background',
      'list',
      'bullet',
      'indent',
    ];

    return (
      <div className={cn('rich-text-editor-wrapper', className)}>
        <ReactQuill
          ref={ref}
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          className="rich-text-editor"
        />
        <style>{`
          .rich-text-editor-wrapper .rich-text-editor .ql-container {
            min-height: ${minHeight};
            font-size: 14px;
            font-family: inherit;
          }
          .rich-text-editor-wrapper .rich-text-editor .ql-editor {
            min-height: ${minHeight};
          }
          /* 让编辑器内的内容样式与外部显示保持一致 */
          .rich-text-editor-wrapper .rich-text-editor .ql-editor p {
            margin-bottom: 0.5rem;
          }
          .rich-text-editor-wrapper .rich-text-editor .ql-editor p:last-child {
            margin-bottom: 0;
          }
          .rich-text-editor-wrapper .rich-text-editor .ql-editor strong {
            font-weight: 600;
          }
          .rich-text-editor-wrapper .rich-text-editor .ql-editor ul,
          .rich-text-editor-wrapper .rich-text-editor .ql-editor ol {
            margin-left: 1.5rem;
            margin-bottom: 0.5rem;
            padding-left: 0;
          }
          .rich-text-editor-wrapper .rich-text-editor .ql-editor li {
            margin-bottom: 0.25rem;
          }
          /* 列表缩进样式 - 与外部显示保持一致 */
          .rich-text-editor-wrapper .rich-text-editor .ql-editor li.ql-indent-1 {
            margin-left: 3em;
            padding-left: 0;
          }
          .rich-text-editor-wrapper .rich-text-editor .ql-editor li.ql-indent-2 {
            margin-left: 6em;
            padding-left: 0;
          }
          .rich-text-editor-wrapper .rich-text-editor .ql-editor li.ql-indent-3 {
            margin-left: 9em;
            padding-left: 0;
          }
          .rich-text-editor-wrapper .rich-text-editor .ql-editor li.ql-indent-4 {
            margin-left: 12em;
            padding-left: 0;
          }
          .rich-text-editor-wrapper .rich-text-editor .ql-editor li.ql-indent-5 {
            margin-left: 15em;
            padding-left: 0;
          }
          .rich-text-editor-wrapper .rich-text-editor .ql-editor li.ql-indent-6 {
            margin-left: 18em;
            padding-left: 0;
          }
          .rich-text-editor-wrapper .rich-text-editor .ql-editor li.ql-indent-7 {
            margin-left: 21em;
            padding-left: 0;
          }
          .rich-text-editor-wrapper .rich-text-editor .ql-editor li.ql-indent-8 {
            margin-left: 24em;
            padding-left: 0;
          }
          .rich-text-editor-wrapper .rich-text-editor .ql-editor a {
            color: rgb(59 130 246);
            text-decoration: underline;
          }
          .rich-text-editor-wrapper .rich-text-editor .ql-toolbar {
            border-top-left-radius: 0.375rem;
            border-top-right-radius: 0.375rem;
            background: #f9fafb;
            border-color: #e5e7eb;
            padding: 0.5rem;
          }
          .rich-text-editor-wrapper .rich-text-editor .ql-container {
            border-bottom-left-radius: 0.375rem;
            border-bottom-right-radius: 0.375rem;
            border-color: #e5e7eb;
          }
          .rich-text-editor-wrapper .rich-text-editor .ql-editor.ql-blank::before {
            color: #9ca3af;
            font-style: normal;
          }
          /* 焦点样式 */
          .rich-text-editor-wrapper .rich-text-editor .ql-container:focus-within {
            border-color: #3b82f6;
            box-shadow: 0 0 0 1px #3b82f6;
          }
          /* 工具栏按钮悬停效果 */
          .rich-text-editor-wrapper .rich-text-editor .ql-toolbar button:hover,
          .rich-text-editor-wrapper .rich-text-editor .ql-toolbar button:focus,
          .rich-text-editor-wrapper .rich-text-editor .ql-toolbar .ql-picker-label:hover,
          .rich-text-editor-wrapper .rich-text-editor .ql-toolbar .ql-picker-label:focus {
            color: #3b82f6;
          }
          .rich-text-editor-wrapper .rich-text-editor .ql-toolbar button.ql-active,
          .rich-text-editor-wrapper .rich-text-editor .ql-toolbar .ql-picker-label.ql-active {
            color: #3b82f6;
          }
          /* 下拉菜单样式 */
          .rich-text-editor-wrapper .rich-text-editor .ql-toolbar .ql-picker-options {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 0.375rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            padding: 0.25rem;
          }
          .rich-text-editor-wrapper .rich-text-editor .ql-toolbar .ql-picker-item:hover {
            background: #f3f4f6;
          }
          /* 颜色选择器样式 */
          .rich-text-editor-wrapper .rich-text-editor .ql-color-picker .ql-picker-options {
            padding: 0.5rem;
            width: auto;
          }
          .rich-text-editor-wrapper .rich-text-editor .ql-color-picker .ql-picker-item {
            border: 1px solid #e5e7eb;
            border-radius: 0.125rem;
            width: 20px;
            height: 20px;
          }
          .rich-text-editor-wrapper .rich-text-editor .ql-color-picker .ql-picker-item:hover {
            border-color: #3b82f6;
            transform: scale(1.1);
          }
        `}</style>
      </div>
    );
  }
);

RichTextEditor.displayName = 'RichTextEditor';
