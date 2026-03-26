import { IoSend } from 'react-icons/io5';
import {
    ChangeEvent,
    FormEvent,
    KeyboardEvent,
    useEffect,
    useRef,
    useState,
} from 'react';
import { toast } from 'sonner';

import { useSendMessageMutation } from '../../api/chatsApi';
import { useAppSelector } from '@/store/hooks';
import { selectActiveChatData } from '../../store/chatsSlice';
import { selectUserData } from '@/modules/Auth';
import styles from './ChatsForm.module.scss';

const ChatsForm = () => {
    const [input, setInput] = useState('');
    const [sendMessage] = useSendMessageMutation();
    const activeChatData = useAppSelector(selectActiveChatData);
    const user = useAppSelector(selectUserData);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setInput('');
    }, [activeChatData]);

    useEffect(() => {
        adjustHeight();
    }, [input]);

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        textarea.style.maxHeight = `${textarea.scrollHeight}px`;

        if (parseInt(textarea.style.height) >= 150) {
            textarea.style.overflow = 'auto';
        }
    };

    const handleSetInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    const handleSendMessage = async () => {
        if (!user || !activeChatData || !input.trim()) return;

        try {
            await sendMessage({
                chatId: activeChatData.id,
                content: input.trim(),
                senderId: user.id,
            }).unwrap();

            setInput('');
        } catch (err) {
            console.error(err);
            toast.error(`Couldn't send message`);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSendMessage();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <textarea
                className={styles.form__text}
                value={input}
                onChange={handleSetInput}
                placeholder="Enter a message..."
                ref={textareaRef}
                onKeyDown={handleKeyDown}
            />

            <button
                type="submit"
                className={`${styles.form__button} ${
                    !input.trim() && styles.form__button_disable
                }`}
                disabled={!input.trim()}
            >
                <IoSend />
            </button>
        </form>
    );
};

export default ChatsForm;
