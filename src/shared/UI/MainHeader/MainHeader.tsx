import styles from './MainHeader.module.scss';

interface IMainHeaderProps {
    title: string;
}

const MainHeader = ({ title }: IMainHeaderProps) => {
    return (
        <header className={styles.header}>
            <h1 className={styles.header__title}>{title}</h1>
        </header>
    );
};

export default MainHeader;
