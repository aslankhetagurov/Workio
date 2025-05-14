import { HeroSection } from '@/modules/HeroSection';
import { FeaturedVacancies } from '@/modules/FeaturedVacancies';

const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <FeaturedVacancies />
        </div>
    );
};

export default HomePage;
