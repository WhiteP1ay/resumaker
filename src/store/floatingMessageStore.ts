import { atom } from 'jotai';

export interface FloatingMessageState {
  isVisible: boolean;
  message: string;
  variant: 'default' | 'info' | 'success' | 'warning' | 'error';
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export const floatingMessageAtom = atom<FloatingMessageState>({
  isVisible: false,
  message: '',
  variant: 'default',
  position: 'top-center',
});

export const floatingMessageConfigAtom = atom({
  autoClose: true,
  autoCloseDelay: 3000,
  defaultVisible: false,
});

// 各个属性的衍生原子
export const isVisibleAtom = atom(
  (get) => get(floatingMessageAtom).isVisible,
  (get, set, newValue: boolean) => {
    set(floatingMessageAtom, { ...get(floatingMessageAtom), isVisible: newValue });
  }
);

export const messageAtom = atom(
  (get) => get(floatingMessageAtom).message,
  (get, set, newValue: string) => {
    set(floatingMessageAtom, { ...get(floatingMessageAtom), message: newValue });
  }
);

export const variantAtom = atom(
  (get) => get(floatingMessageAtom).variant,
  (get, set, newValue: 'default' | 'info' | 'success' | 'warning' | 'error') => {
    set(floatingMessageAtom, { ...get(floatingMessageAtom), variant: newValue });
  }
);

export const positionAtom = atom(
  (get) => get(floatingMessageAtom).position,
  (get, set, newValue: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center') => {
    set(floatingMessageAtom, { ...get(floatingMessageAtom), position: newValue });
  }
);

// Action atoms
export const showMessageAtom = atom(
  null,
  (get, set, 
    newMessage: string,
    messageVariant: 'default' | 'info' | 'success' | 'warning' | 'error' = 'default',
    messagePosition: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center' = 'top-center'
  ) => {
    set(floatingMessageAtom, {
      ...get(floatingMessageAtom),
      message: newMessage,
      variant: messageVariant,
      position: messagePosition,
      isVisible: true,
    });
    console.log('showMessage', newMessage, messageVariant, messagePosition, get(floatingMessageAtom).isVisible);
  }
);

export const hideMessageAtom = atom(
  null,
  (get, set) => {
    set(floatingMessageAtom, { ...get(floatingMessageAtom), isVisible: false });
  }
);

export const showInfoAtom = atom(
  null,
  (_, set, msg: string, pos?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center') => {
    set(showMessageAtom, msg, 'info', pos);
  }
);

export const showSuccessAtom = atom(
  null,
  (_, set, msg: string, pos?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center') => {
    set(showMessageAtom, msg, 'success', pos);
  }
);

export const showWarningAtom = atom(
  null,
  (_, set, msg: string, pos?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center') => {
    set(showMessageAtom, msg, 'warning', pos);
  }
);

export const showErrorAtom = atom(
  null,
  (_, set, msg: string, pos?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center') => {
    set(showMessageAtom, msg, 'error', pos);
  }
);
