import { useEffect, useRef, useState } from 'react';

import { useAppSelector } from '@/store/hooks';
import { handleLogOut, selectUserData } from '@/modules/Auth';
import defaultAvatar from '@/assets/default-avatar.png';
import CloseButton from '@/UI/CloseButton/CloseButton';
import styles from './UserMenu.module.scss';

const UserMenu = () => {
    const [userMenuShow, setUserMenuShow] = useState(false);
    const userData = useAppSelector(selectUserData);
    const userMenuRef = useRef<HTMLDivElement>(null);

    if (!userData) return null;

    const handleUserMenu = () => {
        setUserMenuShow((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target as Node)
            ) {
                setUserMenuShow(false);
            }
        };

        const handleCloseMenuViaEsc = (e: KeyboardEvent) => {
            if (e.key == 'Escape') {
                setUserMenuShow(false);
            }
        };

        if (userMenuShow) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleCloseMenuViaEsc);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleCloseMenuViaEsc);
        };
    }, [userMenuShow]);

    return (
        <div
            className={styles['user-menu']}
            title={userData.full_name || undefined}
            ref={userMenuRef}
        >
            <button
                onClick={handleUserMenu}
                type="button"
                aria-haspopup="true"
                aria-expanded={userMenuShow}
            >
                <img
                    className={styles['user-menu__avatar']}
                    src={userData.avatar_url || defaultAvatar}
                    alt="User avatar"
                />
            </button>

            <div
                className={`${styles['user-menu__menu']} ${
                    userMenuShow ? styles['user-menu__menu-show'] : ''
                }`}
            >
                <div className={styles['user-menu__menu-top']}>
                    <CloseButton onClick={handleUserMenu} />
                    <span className={styles['user-menu__username']}>
                        {userData.full_name}
                    </span>
                </div>
                <button
                    className={styles['user-menu__logout-btn']}
                    onClick={handleLogOut}
                >
                    Log out
                </button>
            </div>
        </div>
    );
};

export default UserMenu;
