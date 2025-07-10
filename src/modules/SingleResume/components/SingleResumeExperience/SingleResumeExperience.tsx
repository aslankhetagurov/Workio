import { ResumeWithUserAndExperiencesAndEducations } from '@/shared/types/database.types';
import { formatDateToMonthAndYear } from '@/shared/lib/formatDateToMonthAndYear';
import styles from './SingleResumeExperience.module.scss';

interface SingleResumeExperienceProps {
    resumeData: ResumeWithUserAndExperiencesAndEducations;
}

const SingleResumeExperience = ({
    resumeData,
}: SingleResumeExperienceProps) => {
    const { work_experiences } = resumeData;

    return (
        <article className={styles.experience}>
            <h4 className={styles.experience__title}>Experience</h4>

            <ul className={styles.experience__items} role="list">
                {work_experiences
                    ?.slice()
                    .reverse()
                    .map((item) => {
                        const {
                            id,
                            company_name,
                            position,
                            start_date,
                            end_date,
                            description,
                        } = item;

                        return (
                            <li
                                className={styles.experience__item}
                                key={id}
                                aria-label={`Experience at ${company_name}`}
                            >
                                <div className={styles.experience__time}>
                                    <div
                                        className={
                                            styles['experience__time-wrapper']
                                        }
                                    >
                                        <span
                                            className={
                                                styles['experience__time-start']
                                            }
                                        >
                                            {formatDateToMonthAndYear(
                                                start_date
                                            )}
                                        </span>
                                        <span> - </span>
                                        <span
                                            className={
                                                styles['experience__time-end']
                                            }
                                        >
                                            {end_date
                                                ? formatDateToMonthAndYear(
                                                      end_date
                                                  )
                                                : 'to present'}
                                        </span>
                                    </div>
                                    <span
                                        className={
                                            styles['experience__time-duration']
                                        }
                                    ></span>
                                </div>

                                <div className={styles.experience__main}>
                                    <h4
                                        className={
                                            styles['experience__company-name']
                                        }
                                    >
                                        {company_name}
                                    </h4>
                                    <span
                                        className={styles.experience__position}
                                    >
                                        {position}
                                    </span>
                                    <ul
                                        className={
                                            styles.experience__responsibilities
                                        }
                                        role="list"
                                    >
                                        {description
                                            .split('.')
                                            .map((item, i) => (
                                                <li
                                                    className={
                                                        styles[
                                                            'experience__responsibilities-item'
                                                        ]
                                                    }
                                                    key={item + i}
                                                >
                                                    {item}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </li>
                        );
                    })}
            </ul>
        </article>
    );
};

export default SingleResumeExperience;
