import ResumesList from '../ResumesList/ResumesList';
import ResumesSearch from '../ResumesSearch/ResumesSearch';
import styles from './Resumes.module.scss';

export const Resumes = () => {
    return (
        <section className={styles.resumes}>
            <div className={styles.resumes__header}>
                <h1 className={styles.resumes__title}>Resumes</h1>
            </div>
            <main className={styles.resumes__main}>
                <aside className={styles.resumes__form} role="search">
                    <ResumesSearch />
                </aside>

                <div className={styles.resumes__results}>
                    <ResumesList />
                </div>
            </main>
        </section>
    );
};
