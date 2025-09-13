import * as React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { cn } from '@/lib/utils';

interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  theme?: 'snow' | 'bubble';
  modules?: object;
  formats?: string[];
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className,
    value = '',
    onChange,
    placeholder = '请输入内容...',
    readOnly = false,
    theme = 'snow',
    modules,
    formats
  }) => {
    const defaultModules = React.useMemo(() => ({
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['clean']
      ],
    }), []);

    const defaultFormats = [
       'bold', 'italic', 'underline', 'strike',
      'color', 'background', 'list', 'bullet'
    ];

    return (
      <div className={cn('w-full', className)}>
        <ReactQuill
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          theme={theme}
          modules={modules || defaultModules}
          formats={formats || defaultFormats}
          style={{
            minHeight: '80px',
          }}
          className={cn(
            'rounded-md border border-input bg-background outline-none',
            'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
            readOnly && 'opacity-50 cursor-not-allowed'
          )}
        />
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
