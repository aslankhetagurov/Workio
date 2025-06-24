import styles from './SingleResumeAbout.module.scss';

interface SingleResumeAboutProps {
    aboutText: string | null;
}

const SingleResumeAbout = ({ aboutText }: SingleResumeAboutProps) => {
    if (!aboutText) return null;

    return (
        <div className={styles.about}>
            <h4 className={styles.about__title}>About Me</h4>
            <p className={styles.about__text}>{aboutText}</p>
        </div>
    );
};

export default SingleResumeAbout;
