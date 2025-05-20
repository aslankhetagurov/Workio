import london from '../assets/cities/london.webp';
import paris from '../assets/cities/paris.webp';
import berlin from '../assets/cities/berlin.webp';
import madrid from '../assets/cities/madrid.webp';
import rome from '../assets/cities/rome.webp';
import tokyo from '../assets/cities/tokyo.webp';
import newYork from '../assets/cities/new-york.webp';
import losAngeles from '../assets/cities/los-angeles.webp';
import moscow from '../assets/cities/moscow.webp';
import amsterdam from '../assets/cities/amsterdam.webp';

export const cityImageMap = {
    london,
    paris,
    berlin,
    madrid,
    rome,
    tokyo,
    'new-york': newYork,
    'los-angeles': losAngeles,
    moscow,
    amsterdam,
} as const;
