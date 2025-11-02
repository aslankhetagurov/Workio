import { useForm } from 'react-hook-form';
import styles from './ContactForm.module.scss';
import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import { toast } from 'sonner';

type FormValues = {
    name: string;
    email: string;
    message: string;
};

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        try {
            const res = await fetch(
                'https://zzwckyeujihciqphhbtz.supabase.co/functions/v1/send-feedback',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                }
            );

            if (!res.ok) throw new Error('Failed to send');

            toast.success('Message sent successfully!');
            reset();
        } catch (e) {
            console.error(e);
            toast.error('Something went wrong. Try again later.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2 className={styles.form__title}>Contact Us</h2>

            <input
                className={styles.form__input}
                {...register('name', { required: true })}
                placeholder="Your name"
            />

            <input
                className={styles.form__input}
                type="email"
                {...register('email', { required: true })}
                placeholder="Your email"
            />

            <textarea
                className={styles.form__textarea}
                {...register('message', { required: true })}
                placeholder="Your message"
                rows={4}
            />

            <PrimaryButton
                label={isSubmitting ? 'Sending...' : 'Send'}
                disabled={isSubmitting}
                type="submit"
            />
        </form>
    );
};

export default ContactForm;
