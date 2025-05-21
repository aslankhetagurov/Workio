import Slider from '@/shared/UI/Slider/Slider';
import CityItem from '../CityItem/CityItem';
import { citySlugMap, TCitySlug } from '@/shared/consts/citySlugMap';
import styles from './FeaturedCities.module.scss';

export const FeaturedCities = () => {
    const renderCities = Object.entries(citySlugMap).map(([slug, name]) => (
        <CityItem key={slug} name={name} slug={slug as TCitySlug} />
    ));

    return (
        <section className={styles['featured-cities']}>
            <div className={styles['featured-cities__header']}>
                <h3 className={styles['featured-cities__title']}>
                    Featured Cities
                </h3>
                <span className={styles['featured-cities__subtitle']}>
                    Start your career journey in the right city
                </span>
            </div>

            <Slider sliderItems={renderCities} duration={800} gap={30} />
        </section>
    );
};
