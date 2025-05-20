import { Link } from 'react-router-dom';

import { cityImageMap } from '@/modules/FeaturedCities/consts/cityImageMap';
import { TCitySlug } from '@/consts/citySlugMap';
import styles from './CityItem.module.scss';

interface ICityItemProps {
    name: string;
    slug: TCitySlug;
}

const CityItem = ({ name, slug }: ICityItemProps) => {
    return (
        <li className={styles['city-item']}>
            <Link
                to={`/vacancies?location=${slug}`}
                aria-label={`View vacancies in ${name}`}
            >
                <img
                    className={styles['city-item__img']}
                    src={cityImageMap[slug]}
                    alt={`Image of ${name}`}
                />
                <span className={styles['city-item__name']}>{name}</span>
            </Link>
        </li>
    );
};

export default CityItem;
