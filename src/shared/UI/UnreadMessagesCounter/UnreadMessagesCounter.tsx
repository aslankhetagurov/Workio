import { CSSProperties } from 'react';
import styles from './UnreadMessagesCounter.module.scss';

interface IUnreadMessagesCounterProps {
    counter: number;
    customStyles?: CSSProperties;
}

const UnreadMessagesCounter = ({
    counter,
    customStyles,
}: IUnreadMessagesCounterProps) => {
    return (
        <div className={styles.counter} style={customStyles}>
            {counter}
        </div>
    );
};

export default UnreadMessagesCounter;
