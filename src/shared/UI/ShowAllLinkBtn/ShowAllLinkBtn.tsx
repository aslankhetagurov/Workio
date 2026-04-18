import { Link } from 'react-router-dom';
import styles from './ShowAllLinkBtn.module.scss';

interface IShowAllLinkBtnProps {
    link: string;
}

export const ShowAllLinkBtn = ({ link }: IShowAllLinkBtnProps) => {
    return (
        <Link className={styles.link} to={link}>
            Show All
        </Link>
    );
};
