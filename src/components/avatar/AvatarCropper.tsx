/**
 * 头像裁剪组件
 */
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAvatarCropper } from '@/hooks/components/useAvatarCropper';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface AvatarCropperProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  onCropComplete: (croppedImageUrl: string) => void;
}

export const AvatarCropper = ({
  isOpen,
  onClose,
  imageSrc,
  onCropComplete,
}: AvatarCropperProps) => {
  const {
    crop,
    completedCrop,
    imgRef,
    onImageLoad,
    onCropChange,
    onCropComplete: onCropCompleteCallback,
    handleSave,
    handleCancel,
  } = useAvatarCropper(onCropComplete, onClose);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>裁剪头像</DialogTitle>
          <DialogDescription>拖拽调整裁剪区域，点击保存完成头像设置。</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-center overflow-auto max-h-[60vh]">
            <ReactCrop
              crop={crop}
              onChange={onCropChange}
              onComplete={onCropCompleteCallback}
              aspect={3 / 4}
            >
              <img
                ref={imgRef}
                src={imageSrc}
                alt="裁剪头像"
                onLoad={onImageLoad}
                style={{ maxHeight: '55vh', maxWidth: '100%' }}
              />
            </ReactCrop>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel}>
              取消
            </Button>
            <Button onClick={handleSave} disabled={!completedCrop}>
              保存
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// 默认导出用于懒加载
export default AvatarCropper;
