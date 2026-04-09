import MainHeader from '@/shared/UI/MainHeader/MainHeader';
import ResumesList from '../ResumesList/ResumesList';
import { useAppDispatch } from '@/store/hooks';
import { IJobSearchForm } from '@/shared/components/JobSearchForm/JobSearchForm';
import { setResumesSearchFilters } from '../../store/resumesSlice';
import { VacanciesAndResumesSearch } from '@/shared/components/VacanciesAndResumesSearch/VacanciesAndResumesSearch';
import styles from './Resumes.module.scss';

export const Resumes = () => {
    const dispatch = useAppDispatch();

    const onSubmit = (filters: IJobSearchForm) => {
        dispatch(setResumesSearchFilters(filters));
    };

    return (
        <section className={styles.resumes}>
            <MainHeader title="Resumes" />

            <div className={styles.resumes__main}>
                <VacanciesAndResumesSearch onSubmit={onSubmit} />

                <div className={styles.resumes__results}>
                    <ResumesList />
                </div>
            </div>
        </section>
    );
};
