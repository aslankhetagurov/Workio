import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import styles from './SingleCompanyTabs.module.scss';
import { TCurrentTab } from '../../types/SingleCompany.types';

interface SingleCompanyTabsProps {
    currentTab: TCurrentTab;
    setCurrentTab: (currentTab: TCurrentTab) => void;
    vacanciesCount: number;
}

const SingleCompanyTabs = ({
    setCurrentTab,
    currentTab,
    vacanciesCount,
}: SingleCompanyTabsProps) => {
    const handleSetCurrentTub = (currentTab: TCurrentTab) =>
        setCurrentTab(currentTab);

    return (
        <div className={styles.tabs}>
            <ul className={styles.tabs__list} role="tablist">
                <li className={styles.tabs__item}>
                    <PrimaryButton
                        label="About"
                        ariaLabel="Company about"
                        onClick={() => handleSetCurrentTub('about')}
                        active={currentTab === 'about'}
                        className={styles.tabs__btn}
                    />
                </li>

                <li className={styles.tabs__item}>
                    <PrimaryButton
                        label="Vacancies"
                        ariaLabel="Company Vacancies"
                        onClick={() => handleSetCurrentTub('vacancies')}
                        active={currentTab === 'vacancies'}
                        className={styles.tabs__btn}
                        counter={vacanciesCount}
                    />
                </li>

                <li className={styles.tabs__item}>
                    <PrimaryButton
                        label="Reviews"
                        ariaLabel="Company Reviews"
                        onClick={() => handleSetCurrentTub('reviews')}
                        active={currentTab === 'reviews'}
                        className={styles.tabs__btn}
                    />
                </li>
            </ul>
        </div>
    );
};

export default SingleCompanyTabs;
