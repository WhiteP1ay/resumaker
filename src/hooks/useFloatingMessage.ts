import { useState, useCallback } from 'react';

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

  const [isVisible, setIsVisible] = useState(defaultVisible);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState<'default' | 'info' | 'success' | 'warning' | 'error'>('default');
  const [position, setPosition] = useState<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'>('top-right');

  const showMessage = useCallback((
    newMessage: string,
    messageVariant: 'default' | 'info' | 'success' | 'warning' | 'error' = 'default',
    messagePosition: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center' = 'top-right'
  ) => {
    setMessage(newMessage);
    setVariant(messageVariant);
    setPosition(messagePosition);
    setIsVisible(true);
  }, []);

  const hideMessage = useCallback(() => {
    setIsVisible(false);
  }, []);

  const showInfo = useCallback((msg: string, pos?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center') => {
    showMessage(msg, 'info', pos);
  }, [showMessage]);

  const showSuccess = useCallback((msg: string, pos?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center') => {
    showMessage(msg, 'success', pos);
  }, [showMessage]);

  const showWarning = useCallback((msg: string, pos?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center') => {
    showMessage(msg, 'success', pos);
  }, [showMessage]);

  const showError = useCallback((msg: string, pos?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center') => {
    showMessage(msg, 'error', pos);
  }, [showMessage]);

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
