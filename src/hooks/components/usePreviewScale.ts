import { useState } from 'react';

export const usePreviewScale = () => {
  const [scale, setScale] = useState(80);

  const onScaleChange = (value: number) => {
    setScale(value);
  };

  return { scale, setScale, onScaleChange };
};
