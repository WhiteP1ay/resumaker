import type { LucideIcon } from 'lucide-react';

interface BasicInfoSectionItemProps {
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export const BasicInfoSectionItem = ({
  icon: Icon,
  children,
  className = '',
}: BasicInfoSectionItemProps) => {
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <Icon className="h-4 w-4" />
      <span>{children}</span>
    </div>
  );
};
