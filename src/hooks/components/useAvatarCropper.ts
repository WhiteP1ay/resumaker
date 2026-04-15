/**
 * 头像裁剪器业务逻辑 Hook
 */
import { useCallback, useRef, useState } from 'react';
import { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop';

function canvasToBase64(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL('image/jpeg', 0.9);
}

// 辅助函数：获取裁剪后的图片
async function getCroppedImg(image: HTMLImageElement, crop: Crop): Promise<string> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context is not available');
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = crop.width * scaleX;
  canvas.height = crop.height * scaleY;

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width * scaleX,
    crop.height * scaleY
  );

  return canvasToBase64(canvas);
}

export const useAvatarCropper = (
  onSave: (croppedImageUrl: string) => void,
  onClose: () => void
) => {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop>();
  const imgRef = useRef<HTMLImageElement>(null);

  // 图片加载完成时设置默认裁剪区域
  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;

    // 创建一个居中的3:4比例裁剪区域
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 80,
        },
        3 / 4, // 3:4的比例，类似证件照
        width,
        height
      ),
      width,
      height
    );

    setCrop(crop);
    setCompletedCrop(crop);
  }, []);

  // 裁剪区域改变
  const onCropChange = (_pixelCrop: Crop, percentCrop: Crop) => {
    setCrop(percentCrop);
  };

  // 裁剪完成
  const onCropComplete = (c: Crop) => {
    setCompletedCrop(c);
  };

  // 保存裁剪结果
  const handleSave = async () => {
    if (completedCrop && imgRef.current) {
      try {
        const croppedImageUrl = await getCroppedImg(imgRef.current, completedCrop);
        onSave(croppedImageUrl);
        onClose();
      } catch (error) {
        console.error('Failed to crop image:', error);
        window.alert('请上传头像后裁剪');
      }
    }
  };

  // 取消裁剪
  const handleCancel = () => {
    onClose();
  };

  return {
    // 状态
    crop,
    completedCrop,
    imgRef,

    // 操作方法
    onImageLoad,
    onCropChange,
    onCropComplete,
    handleSave,
    handleCancel,
  };
};
