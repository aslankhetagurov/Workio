import { Link } from 'react-router-dom';

import { cityImageMap } from '@/modules/FeaturedCities/consts/cityImageMap';
import { TCitySlug } from '@/shared/consts/citySlugMap';
import styles from './CityItem.module.scss';

interface ICityItemProps {
    name: string;
    slug: TCitySlug;
}

const CityItem = ({ name, slug }: ICityItemProps) => {
    return (
        <li className={styles['city-item']}>
            <Link
                to={`/vacancies`}
                aria-label={`View vacancies in ${name}`}
                state={{ location: name }}
            >
                <img
                    className={styles['city-item__img']}
                    src={cityImageMap[slug]}
                    alt={name}
                    width={250}
                    height={310}
                    loading="lazy"
                    decoding="async"
                />
                <span className={styles['city-item__name']}>{name}</span>
            </Link>
        </li>
    );
};

export default CityItem;
