import styles from './DescriptionBlock.module.scss';

interface DescriptionBlockProps {
    title: string;
    items: string;
}

const renderListItems = (items: string) => {
    if (!items) return null;

    return items
        ?.split('.')
        .filter((item) => item.trim() !== '')
        .map((item, i) => (
            <li className={styles.description__item} key={item + i}>
                {item}.
            </li>
        ));
};

const DescriptionBlock = ({ title, items }: DescriptionBlockProps) => (
    <div className={styles.description__block}>
        <h4 className={styles.description__title}>{title}</h4>
        <ul className={styles.description__items} role="list">
            {renderListItems(items)}
        </ul>
    </div>
);

export default DescriptionBlock;
