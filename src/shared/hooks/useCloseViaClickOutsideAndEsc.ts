import { RefObject, useEffect } from 'react';

export const useCloseViaClickOutsideAndEsc = (
    ref: RefObject<HTMLElement | null>,
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
) => {
    useEffect(() => {
        const handleClickOutside = (e: Event) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        const handleCloseDropDownViaEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            window.addEventListener('pointerdown', handleClickOutside);
            window.addEventListener('keydown', handleCloseDropDownViaEsc);
        }

        return () => {
            window.removeEventListener('pointerdown', handleClickOutside);
            window.removeEventListener('keydown', handleCloseDropDownViaEsc);
        };
    }, [isOpen]);
};
