import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { X } from 'lucide-react';

const floatingMessageVariants = cva(
  'fixed z-[9999] max-w-sm rounded-lg border shadow-lg transition-all duration-300 ease-in-out print:hidden',
  {
    variants: {
      variant: {
        default: 'bg-white border-gray-200 text-gray-900',
        info: 'bg-blue-50 border-blue-200 text-blue-900',
        success: 'bg-green-50 border-green-200 text-green-900',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
        error: 'bg-red-50 border-red-200 text-red-900',
      },
      position: {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'top-center': 'top-4 left-1/2 -translate-x-1/2',
        'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
      },
      size: {
        sm: 'p-3 text-sm',
        md: 'p-4 text-base',
        lg: 'p-5 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      position: 'top-right',
      size: 'md',
    },
  }
);

export interface FloatingMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof floatingMessageVariants> {
  message: string;
  isVisible: boolean;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
  showCloseButton?: boolean;
  icon?: React.ReactNode;
}

const FloatingMessage = React.forwardRef<HTMLDivElement, FloatingMessageProps>(
  (
    {
      className,
      variant,
      position,
      size,
      message,
      isVisible,
      onClose,
      autoClose = true,
      autoCloseDelay = 3000,
      showCloseButton = true,
      icon,
      ...props
    },
    ref
  ) => {
    const [isAnimating, setIsAnimating] = React.useState(false);

    React.useEffect(() => {
      console.log('FloatingMessage useEffect:', { isVisible, autoClose, autoCloseDelay });
      if (isVisible) {
        console.log('显示消息:', message);
        setIsAnimating(true);

        if (autoClose) {
          const timer = setTimeout(() => {
            handleClose();
          }, autoCloseDelay);

          return () => clearTimeout(timer);
        }
      } else {
        setIsAnimating(false);
      }
    }, [isVisible, autoClose, autoCloseDelay, message]);

    const handleClose = () => {
      setIsAnimating(false);
      setTimeout(() => {
        onClose?.();
      }, 300); // 等待动画完成
    };

    if (!isVisible && !isAnimating) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          floatingMessageVariants({ variant, position, size }),
          isVisible && isAnimating
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-2 scale-95',
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          {icon && <div className="flex-shrink-0 mt-0.5">{icon}</div>}

          <div className="flex-1 min-w-0">
            <p className="font-medium leading-relaxed break-words">{message}</p>
          </div>

          {showCloseButton && onClose && (
            <button
              onClick={handleClose}
              className="flex-shrink-0 p-1 rounded-md hover:bg-black/5 transition-colors duration-200"
              aria-label="Close message"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

FloatingMessage.displayName = 'FloatingMessage';

export { FloatingMessage };
