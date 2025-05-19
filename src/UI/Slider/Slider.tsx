import { ReactNode, TouchEvent, useEffect, useRef, useState } from 'react';
import { FaCircleArrowLeft, FaCircleArrowRight } from 'react-icons/fa6';

import styles from './Slider.module.scss';

interface ISliderProps {
    sliderItems: ReactNode[];
    duration: number;
    gap: number;
    timingFn?: string;
}

const Slider = ({
    sliderItems,
    duration,
    timingFn = 'ease',
    gap,
}: ISliderProps) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const sliderItemsRef = useRef<HTMLUListElement>(null);
    const startTouchPosition = useRef<number | null>(null);
    const itemWidthWithGapRef = useRef<number>(0);

    const itemCount = sliderItems?.length;
    const [itemCounter, setItemCounter] = useState(0);
    const [translateWidth, setTranslateWidth] = useState(0);
    const [sliderOn, setSliderOn] = useState(false);

    useEffect(() => {
        if (!sliderItemsRef.current?.children.length) return;
        const slider = sliderRef.current;

        const itemEl = sliderItemsRef.current.children[0] as HTMLElement;
        const itemWidth = itemEl.getBoundingClientRect().width;
        const itemWidthWithGap = itemWidth + gap;
        itemWidthWithGapRef.current = itemWidthWithGap;

        const sliderOnOff = (entries: ResizeObserverEntry[]) => {
            if (
                entries[0].contentRect.width -
                    itemWidthWithGapRef.current * itemCount <
                -15
            ) {
                !sliderOn && setSliderOn(true);
            } else if (
                entries[0].contentRect.width >
                itemWidthWithGapRef.current * itemCount
            ) {
                sliderOn && setSliderOn(false);
            }
        };

        const resizeObserver = new ResizeObserver(sliderOnOff);

        if (slider) resizeObserver.observe(slider);

        return () => {
            if (slider) resizeObserver.unobserve(slider);
        };
    }, [itemCount]);

    const handlePrevSlide = () => {
        if (!sliderItemsRef.current) return;

        if (!itemCounter) {
            sliderItemsRef.current.style.transition = `transform ${duration}ms ${timingFn}`;
        }

        if (itemCounter <= 0) {
            const child = sliderItemsRef.current.childNodes[
                itemCount - Math.abs(itemCounter - 1)
            ] as HTMLElement;
            child.style.transform = `translateX(-${
                itemWidthWithGapRef.current * itemCount
            }px)`;
        } else {
            const child = sliderItemsRef.current.childNodes[
                itemCounter - 1
            ] as HTMLElement;
            child.style.transform = `translateX(${0}px)`;
        }

        sliderItemsRef.current.style.transform = `translateX(${
            translateWidth + itemWidthWithGapRef.current
        }px)`;

        setTranslateWidth(translateWidth + itemWidthWithGapRef.current);

        if (itemCounter === -(itemCount - 1)) {
            setItemCounter(0);
            setTranslateWidth(0);

            setTimeout(() => {
                if (!sliderItemsRef.current) return;

                sliderItemsRef.current.style.transition = 'transform 0ms';

                sliderItemsRef.current.style.transform = `translateX(${0}px)`;

                sliderItemsRef.current.childNodes.forEach((el) => {
                    (el as HTMLElement).style.transform = 'translateX(0)';
                });
            }, duration);
        } else {
            setItemCounter(itemCounter - 1);
        }
    };

    const handleNextSlide = () => {
        if (!sliderItemsRef.current) return;

        if (!itemCounter)
            sliderItemsRef.current.style.transition = `transform ${duration}ms ${timingFn}`;

        if (itemCounter < 0) {
            setTimeout(() => {
                if (!sliderItemsRef.current) return;

                const child = sliderItemsRef.current.childNodes[
                    itemCount - Math.abs(itemCounter)
                ] as HTMLElement;

                child.style.transform = `translateX(${0}px)`;
            }, duration);
        } else {
            if (itemCounter) {
                const child = sliderItemsRef.current.childNodes[
                    Math.abs(itemCounter - 1)
                ] as HTMLElement;

                child.style.transform = `translateX(${
                    itemWidthWithGapRef.current * itemCount
                }px)`;
            }
        }

        sliderItemsRef.current.style.transform = `translateX(${
            translateWidth - itemWidthWithGapRef.current
        }px)`;

        setTranslateWidth(translateWidth - itemWidthWithGapRef.current);

        if (itemCounter === itemCount - 1) {
            setItemCounter(0);
            setTranslateWidth(0);

            setTimeout(() => {
                if (!sliderItemsRef.current) return;

                sliderItemsRef.current.style.transition = 'transform 0ms';
                sliderItemsRef.current.style.transform = `translateX(${0}px)`;
                sliderItemsRef.current.childNodes.forEach((el) => {
                    (el as HTMLElement).style.transform = 'translateX(0)';
                });
            }, duration);
        } else {
            setItemCounter(itemCounter + 1);
        }
    };

    const handleSetStartTouchPosition = (e: TouchEvent) =>
        (startTouchPosition.current = e.changedTouches[0].clientX);

    const handleNextSlideByMove = (e: TouchEvent) => {
        if (!startTouchPosition.current) return;

        const currentTouchPosition = e.changedTouches[0].clientX;
        const direction = startTouchPosition.current - currentTouchPosition;

        if (direction > 10) {
            handleNextSlide();
        }
        if (direction < -10) {
            handlePrevSlide();
        }
        startTouchPosition.current = null;
    };

    return (
        <div ref={sliderRef} className={styles.slider}>
            {sliderOn && (
                <div className={styles.slider__arrows}>
                    <button
                        onClick={handlePrevSlide}
                        className={`${styles.slider__arrow} ${styles['slider__arrow-left']}`}
                    >
                        <FaCircleArrowLeft />
                    </button>

                    <button
                        onClick={handleNextSlide}
                        className={`${styles.slider__arrow} ${styles['slider__arrow-right']}`}
                    >
                        <FaCircleArrowRight />
                    </button>
                </div>
            )}

            <ul
                className={styles.slider__items}
                ref={sliderItemsRef}
                onTouchMove={handleNextSlideByMove}
                onTouchStart={handleSetStartTouchPosition}
                style={{ columnGap: gap + 'px' }}
            >
                {sliderItems}
            </ul>

            <ul className={styles.slider__dots}>
                {sliderItems.map((_, i) => (
                    <li
                        key={i}
                        className={`${styles.slider__dot} ${
                            i === itemCounter ||
                            sliderItems.length + itemCounter === i
                                ? styles['slider__dot-active']
                                : ''
                        } `}
                    ></li>
                ))}
            </ul>
        </div>
    );
};

export default Slider;
