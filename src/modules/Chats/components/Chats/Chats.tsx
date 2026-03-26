import ChatsList from '../ChatsList/ChatsList';
import Chat from '../Chat/Chat';
import styles from './Chats.module.scss';

export const Chats = () => {
    return (
        <section className={styles.chats}>
            <ChatsList />
            <Chat />
        </section>
    );
};
