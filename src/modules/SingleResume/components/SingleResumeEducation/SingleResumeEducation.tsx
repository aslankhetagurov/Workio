import { Tables } from '@/shared/types/database.types';
import styles from './SingleResumeEducation.module.scss';

interface SingleResumeEducationProps {
    education?: Tables<'education'>[];
}

const SingleResumeEducation = ({ education }: SingleResumeEducationProps) => {
    if (!education) return null;

    return (
        <article className={styles.education}>
            <h4 className={styles.education__title}>Education</h4>

            <ul className={styles.education__items}>
                {education?.map((item) => {
                    const {
                        location,
                        degree,
                        field_of_study,
                        graduation_year,
                        institution,
                        id,
                    } = item;

                    return (
                        <li className={styles.education__item} key={id}>
                            <p className={styles.education__year}>
                                {graduation_year}
                            </p>

                            <ul className={styles.education__info}>
                                <li
                                    className={
                                        styles['education__info-item-main']
                                    }
                                >
                                    <span>{institution}</span>
                                    <span>, </span>
                                    <span>{location}</span>
                                </li>
                                <li className={styles['education__info-item']}>
                                    <span>{field_of_study}</span>
                                    <span>, </span>
                                    <span>{degree}</span>
                                </li>
                            </ul>
                        </li>
                    );
                })}
            </ul>
        </article>
    );
};

export default SingleResumeEducation;
