import { ReactNode, useEffect, useState } from 'react';

import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import Spinner from '@/shared/UI/Spinner/Spinner';
import styles from './PaginatedItemsList.module.scss';

interface IPaginatedItemsListProps<T, F> {
    filters: F;
    queryHook: (args: { filters: F; offset: number; limit: number }) => {
        data?: T[];
        isFetching: boolean;
    };
    renderItem: (data: T) => ReactNode;
    limit?: number;
    emptyMessage?: string;
    ariaLabel?: string;
}

const PaginatedItemsList = <T, F>({
    filters,
    queryHook,
    limit = 8,
    emptyMessage = 'No items found.',
    ariaLabel = 'list',
    renderItem,
}: IPaginatedItemsListProps<T, F>) => {
    const [offset, setOffset] = useState(0);
    const [accItems, setAccItems] = useState<T[]>([]);

    const { data, isFetching } = queryHook({ filters, offset, limit });

    const isEndReached = (accItems?.length ?? 0) < offset + limit;

    useEffect(() => {
        setAccItems([]);
        setOffset(0);
    }, [filters]);

    useEffect(() => {
        if (!data) return;
        setAccItems((prev) => [...prev, ...data]);
    }, [data]);

    const handleSetOffset = () => {
        setOffset((offset) => offset + limit);
    };

    if (!accItems.length && isFetching) {
        return <Spinner />;
    }

    if (!accItems.length) {
        return <p className={styles.vacancies__empty}>{emptyMessage}</p>;
    }

    return (
        <div className={styles.items}>
            <ul className={styles.items__list} aria-label={ariaLabel}>
                {accItems.map((itemData) => renderItem(itemData))}
            </ul>

            <div className={styles['items__btn-wrapper']}>
                <PrimaryButton
                    label="Show More"
                    style={{ width: '150px' }}
                    isLoading={isFetching}
                    disabled={isFetching || isEndReached}
                    onClick={handleSetOffset}
                />
            </div>
        </div>
    );
};

export default PaginatedItemsList;
