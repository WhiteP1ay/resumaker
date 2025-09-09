import { useEffect, useState } from 'react';

// A4 纸张尺寸 (mm)
const A4_HEIGHT_MM = 297;

// 转换为像素 (96 DPI)
const MM_TO_PX = 96 / 25.4;

const A4_HEIGHT_PX = A4_HEIGHT_MM * MM_TO_PX;

export const usePageCount = (scale: number = 100) => {
  const [pageCount, setPageCount] = useState(1);

  const calculatePageCount = () => {
    // 查找简历内容容器
    const resumeContainer = document.querySelector('.print-container .max-w-4xl');
    if (!resumeContainer) {
      setPageCount(1);
      return;
    }

    // 获取实际内容高度
    const contentHeight = resumeContainer.scrollHeight;
    
    // 考虑缩放比例
    const scaledHeight = contentHeight * (scale / 100);
    
    // 计算需要的页数
    const pages = Math.ceil(scaledHeight / A4_HEIGHT_PX);
    
    setPageCount(Math.max(1, pages));
  };

  useEffect(() => {
    // 初始计算
    calculatePageCount();

    // 监听窗口大小变化
    const handleResize = () => {
      setTimeout(calculatePageCount, 100); // 延迟计算，等待布局完成
    };

    window.addEventListener('resize', handleResize);

    // 使用 ResizeObserver 监听内容变化
    const resumeContainer = document.querySelector('.print-container .max-w-4xl');
    let resizeObserver: ResizeObserver | null = null;

    if (resizeObserver && resumeContainer) {
      resizeObserver = new ResizeObserver(() => {
        setTimeout(calculatePageCount, 100);
      });
      resizeObserver.observe(resumeContainer);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [scale]);

  // 当缩放比例变化时重新计算
  useEffect(() => {
    setTimeout(calculatePageCount, 100);
  }, [scale]);

  return { pageCount, calculatePageCount };
};
