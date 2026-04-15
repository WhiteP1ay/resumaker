import clsx from 'clsx';

interface AvatarDisplayProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-16 h-20 print:w-14 print:h-18',
  md: 'w-24 h-32 print:w-20 print:h-28',
  lg: 'w-32 h-40 print:w-28 print:h-36',
};

export const AvatarDisplay = ({
  src,
  alt = '头像',
  size = 'md',
  className = '',
}: AvatarDisplayProps) => {
  return (
    <>
      {src && (
        <div
          className={clsx(
            `${sizeClasses[size]} rounded-lg overflow-hidden ${className}`,
            'bg-gray-200 border border-gray-300',
          )}
        >
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
      )}
    </>
  );
};
