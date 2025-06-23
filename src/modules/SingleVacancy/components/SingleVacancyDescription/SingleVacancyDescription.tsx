import { VacancyWithCompany } from '@/shared/types/database.types';
import DescriptionBlock from '../DescriptionBlock/DescriptionBlock';
import styles from './SingleVacancyDescription.module.scss';

interface SingleVacancyDescriptionProps {
    vacancyData: VacancyWithCompany;
}

const SingleVacancyDescription = ({
    vacancyData,
}: SingleVacancyDescriptionProps) => {
    if (!vacancyData) return null;

    const { description, key_responsibilities, skill_and_experience } =
        vacancyData;

    return (
        <div className={styles.description}>
            <div className={styles.description__general}>
                <h4 className={styles['description__title']}>
                    Vacancy Description
                </h4>

                <p className={styles['description__general-text']}>
                    {description}
                </p>
            </div>

            <DescriptionBlock
                title="Key Responsibilities"
                items={key_responsibilities}
            />

            <DescriptionBlock
                title="Skill and Experience"
                items={skill_and_experience}
            />
        </div>
    );
};

export default SingleVacancyDescription;
