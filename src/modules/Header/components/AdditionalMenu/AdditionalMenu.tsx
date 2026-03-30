import { NavLink, useLocation } from 'react-router-dom';
import {
    MdFavoriteBorder,
    MdOutlineAssignment,
    MdOutlineChatBubbleOutline,
} from 'react-icons/md';

import { useAppSelector } from '@/store/hooks';
import { selectUserData } from '@/modules/Auth';
import UnreadMessagesCounter from '@/shared/UI/UnreadMessagesCounter/UnreadMessagesCounter';
import { useUnreadMessagesCount } from '../../hooks/useUnreadMessagesCount';
import styles from './AdditionalMenu.module.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles['additional-menu__link']} ${
        isActive ? styles['additional-menu__link_active'] : ''
    }`;

export const AdditionalMenu = () => {
    const userData = useAppSelector(selectUserData);
    const { pathname } = useLocation();

    if (!userData) return null;

    const { unreadCount } = useUnreadMessagesCount(userData.id);

    return (
        <nav className={styles['additional-menu']}>
            <ul className={styles['additional-menu__links']}>
                <li>
                    <NavLink
                        to={
                            userData.role === 'applicant'
                                ? '/applicant/applications-and-invitations'
                                : '/employer/applications-and-invitations'
                        }
                        className={getLinkClass}
                        title="Applications"
                    >
                        <MdOutlineAssignment
                            className={styles['additional-menu__icon']}
                        />
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to={
                            userData.role === 'applicant'
                                ? '/applicant/favorite-vacancies'
                                : '/employer/favorite-resumes'
                        }
                        className={getLinkClass}
                        title={
                            userData.role === 'applicant'
                                ? 'Favorite vacancies'
                                : 'Favorite resumes'
                        }
                    >
                        <MdFavoriteBorder
                            className={styles['additional-menu__icon']}
                        />
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/chats"
                        className={getLinkClass}
                        title="User chats"
                    >
                        <MdOutlineChatBubbleOutline
                            className={styles['additional-menu__icon']}
                        />

                        {!!unreadCount && !pathname.includes('chats') && (
                            <UnreadMessagesCounter
                                counter={unreadCount}
                                customStyles={{
                                    top: '-12px',
                                    right: '-12px',
                                }}
                            />
                        )}
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
