import { useEffect, useRef } from 'react';

interface CustomCssStyleTagProps {
  cssText: string;
  id?: string;
}

export const CustomCssStyleTag = ({ cssText, id = 'resume-custom-css' }: CustomCssStyleTagProps) => {
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    if (styleRef.current) {
      styleRef.current.textContent = cssText;
    }
  }, [cssText]);

  return <style id={id} ref={styleRef} />;
};
