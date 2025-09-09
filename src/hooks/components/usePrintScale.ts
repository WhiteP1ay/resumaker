import { useEffect, useState } from 'react';

export const usePrintScale = () => {
  const [scale, setScale] = useState(100);

  const updatePrintStyle = (value: number) => {
    const printStyleId = 'custom-print-scale-style';
    let styleTag = document.getElementById(printStyleId) as HTMLStyleElement | null;
    if (styleTag) {
      styleTag.remove();
    }
    styleTag = document.createElement('style');
    styleTag.id = printStyleId;
    styleTag.innerHTML = `
      @media print {
        body {
          zoom: ${value / 100};
        }
      }
    `;
    document.head.appendChild(styleTag);
  };

  const onScaleChange = (value: number) => {
    setScale(value);
    updatePrintStyle(value);
  };

  // 初始化时注入一次样式
  useEffect(() => {
    updatePrintStyle(scale);
    // 组件卸载时清理样式
    return () => {
      const printStyleId = 'custom-print-scale-style';
      const styleTag = document.getElementById(printStyleId);
      if (styleTag) {
        styleTag.remove();
      }
    };
  }, []);

  return { scale, setScale, onScaleChange };
};
