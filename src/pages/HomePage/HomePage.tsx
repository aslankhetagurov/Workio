import { HeroSection } from '@/modules/HeroSection';
import { FeaturedVacancies } from '@/modules/FeaturedVacancies';
import { PromoSection } from '@/modules/PromoSection';
import { TopCompanies } from '@/modules/TopCompanies';
import { FeaturedCities } from '@/modules/FeaturedCities';

const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <FeaturedVacancies />
            <PromoSection />
            <TopCompanies />
            <FeaturedCities />
        </div>
    );
};

export default HomePage;
