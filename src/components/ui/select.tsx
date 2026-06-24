/**
 * Select 下拉选择组件
 */
import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  options: SelectOption[];
  className?: string;
}

export const Select = ({ value, onValueChange, placeholder, options, className }: SelectProps) => {
  return (
    <select
      value={value || ''}
      onChange={(e) => onValueChange?.(e.target.value)}
      className={cn(
        'flex h-8 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-1 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        className
      )}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
