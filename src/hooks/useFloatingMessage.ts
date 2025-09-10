import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  isVisibleAtom,
  messageAtom,
  variantAtom,
  positionAtom,
  showMessageAtom,
  hideMessageAtom,
  showInfoAtom,
  showSuccessAtom,
  showWarningAtom,
  showErrorAtom,
} from '../store/floatingMessageStore';

interface UseFloatingMessageOptions {
  autoClose?: boolean;
  autoCloseDelay?: number;
  defaultVisible?: boolean;
}

export const useFloatingMessage = (options: UseFloatingMessageOptions = {}) => {
  const {
    autoClose = true,
    autoCloseDelay = 3000,
    defaultVisible = false,
  } = options;

  // 使用Jotai原子来管理状态
  const [isVisible, setIsVisible] = useAtom(isVisibleAtom);
  const message = useAtomValue(messageAtom);
  const variant = useAtomValue(variantAtom);
  const position = useAtomValue(positionAtom);

  // 使用Jotai原子进行操作
  const showMessage = useSetAtom(showMessageAtom);
  const hideMessage = useSetAtom(hideMessageAtom);
  const showInfo = useSetAtom(showInfoAtom);
  const showSuccess = useSetAtom(showSuccessAtom);
  const showWarning = useSetAtom(showWarningAtom);
  const showError = useSetAtom(showErrorAtom);

  // 如果默认可见，则设置初始可见性
  if (defaultVisible && !isVisible) {
    setIsVisible(true);
  }

  return {
    isVisible,
    message,
    variant,
    position,
    showMessage,
    hideMessage,
    showInfo,
    showSuccess,
    showWarning,
    showError,
    autoClose,
    autoCloseDelay,
  };
};
