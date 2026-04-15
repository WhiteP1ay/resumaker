import { Button } from '@/components/ui/button';
import { useRef } from 'react';

interface FileUploadButtonProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
}

export const FileUploadButton = ({
  onFileSelect,
  accept = 'image/*',
  children,
  className,
  variant = 'outline',
  size = 'sm',
}: FileUploadButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <Button onClick={handleClick} size={size} variant={variant} className={className}>
        {children}
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
};
