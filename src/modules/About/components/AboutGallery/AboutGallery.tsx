import img1 from '@/shared/assets/images/about/1.webp';
import img2 from '@/shared/assets/images/about/2.webp';
import img3 from '@/shared/assets/images/about/3.webp';
import img4 from '@/shared/assets/images/about/4.webp';
import img5 from '@/shared/assets/images/about/5.webp';
import img6 from '@/shared/assets/images/about/6.webp';
import styles from './AboutGallery.module.scss';

const AboutGallery = () => {
    const images = [img1, img2, img3, img4, img5, img6];

    return (
        <article className={styles.gallery}>
            <div className={styles.gallery__container}>
                {images.map((src, i) => (
                    <img
                        className={styles[`gallery__img-${i + 1}`]}
                        key={i}
                        src={src}
                        alt={`About image ${i + 1}`}
                    />
                ))}
            </div>
        </article>
    );
};

export default AboutGallery;
