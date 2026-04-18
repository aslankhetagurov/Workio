import HeroSearchForm from '../HeroSearchForm/HeroSearchForm';
import bg from '@/shared/assets/images/job-bg.svg';
import styles from './HeroSection.module.scss';

export const HeroSection = () => {
    return (
        <section
            className={styles['hero-section']}
            aria-labelledby="hero-heading"
        >
            <div className={styles['hero-section__content']}>
                <div className={styles['hero-section__titles']}>
                    <h1
                        className={styles['hero-section__title']}
                        id="hero-heading"
                    >
                        Find Your Dream Job Today
                    </h1>
                    <p className={styles['hero-section__subtitle']}>
                        New jobs added daily. Don’t miss your chance.
                    </p>
                </div>
                <HeroSearchForm />
            </div>

            <img
                className={styles['hero-section__img']}
                src={bg}
                alt="Job search illustration"
                width={800}
                height={600}
                fetchPriority="high"
            />
        </section>
    );
};
