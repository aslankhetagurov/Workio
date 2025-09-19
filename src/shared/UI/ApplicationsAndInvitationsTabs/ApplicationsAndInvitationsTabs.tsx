import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import styles from './ApplicationsAndInvitationsTabs.module.scss';

interface IApplicationsAndInvitationsTabsProps {
    currentTab: TApplicationAndInvitationTabs;
    setCurrentTab: (currentTab: TApplicationAndInvitationTabs) => void;
}

export type TApplicationAndInvitationTabs = 'applications' | 'invitations';

const ApplicationsAndInvitationsTabs = ({
    setCurrentTab,
    currentTab,
}: IApplicationsAndInvitationsTabsProps) => {
    return (
        <div className={styles.tabs}>
            <ul className={styles.tabs__list} role="tablist">
                <li className={styles.tabs__item}>
                    <PrimaryButton
                        label="Applications"
                        onClick={() => setCurrentTab('applications')}
                        active={currentTab === 'applications'}
                        className={styles.tabs__btn}
                    />
                </li>

                <li className={styles.tabs__item}>
                    <PrimaryButton
                        label="Invitations"
                        onClick={() => setCurrentTab('invitations')}
                        active={currentTab === 'invitations'}
                        className={styles.tabs__btn}
                    />
                </li>
            </ul>
        </div>
    );
};

export default ApplicationsAndInvitationsTabs;
