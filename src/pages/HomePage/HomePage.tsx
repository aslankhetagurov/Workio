import { HeroSection } from '@/modules/HeroSection';
import { FeaturedVacancies } from '@/modules/FeaturedVacancies';
import { PromoSection } from '@/modules/PromoSection';

const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <FeaturedVacancies />
            <PromoSection />
        </div>
    );
};

export default HomePage;
