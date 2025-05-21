import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';

import preview from '@/shared/assets/images/promo-preview.webp';
import styles from './PromoSection.module.scss';
import PromoVideoModal from '../PromoVideoModal/PromoVideoModal';

export const PromoSection = () => {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const toggleVideoModal = () => setIsVideoModalOpen(!isVideoModalOpen);

    return (
        <section className={styles.promo}>
            <PromoVideoModal
                isOpen={isVideoModalOpen}
                onClose={toggleVideoModal}
            />

            <div className={styles.promo__main}>
                <div className={styles['promo__video-preview']}>
                    <img
                        className={styles['promo__preview-img']}
                        src={preview}
                        alt="Promo video preview image"
                    />
                    <button
                        className={styles['promo__preview-btn']}
                        onClick={toggleVideoModal}
                        aria-label="Play promo video"
                    >
                        <FaPlay className={styles['promo__preview-icon']} />
                    </button>
                </div>

                <div className={styles.promo__info}>
                    <h3 className={styles.promo__title}>
                        Smart Job Discovery: The Workio Way
                    </h3>
                    <span className={styles.promo__subtitle}>
                        Tired of endless job listings? Workio brings you a
                        smarter, faster way to explore career opportunities —
                        through short, engaging videos. Discover teams, culture,
                        and expectations before you even apply.
                    </span>
                    <ul className={styles['promo__features-list']}>
                        <li className={styles['promo__feature-item']}>
                            Real insights into team culture
                        </li>
                        <li className={styles['promo__feature-item']}>
                            Fast-track matching to roles
                        </li>
                        <li className={styles['promo__feature-item']}>
                            Thousands of verified companies
                        </li>
                        <li className={styles['promo__feature-item']}>
                            Personalized job suggestions
                        </li>
                    </ul>
                </div>
            </div>
            <ul className={styles.promo__stat}>
                <li className={styles['promo__stat-item']}>
                    <span className={styles['promo__stat-title']}>4M</span>
                    <span className={styles['promo__stat-text']}>
                        Active users daily
                    </span>
                </li>
                <li className={styles['promo__stat-item']}>
                    <span className={styles['promo__stat-title']}>15k</span>
                    <span className={styles['promo__stat-text']}>
                        Video job ads online
                    </span>
                </li>
                <li className={styles['promo__stat-item']}>
                    <span className={styles['promo__stat-title']}>25M</span>
                    <span className={styles['promo__stat-text']}>
                        Matches made with Workio
                    </span>
                </li>
            </ul>
        </section>
    );
};
