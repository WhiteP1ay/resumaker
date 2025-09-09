import { useState } from 'react';

export const usePreviewScale = () => {
  const [scale, setScale] = useState(100);

  const onScaleChange = (value: number) => {
    setScale(value);
  };

  return { scale, setScale, onScaleChange };
};
