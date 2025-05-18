import { HeroSection } from '@/modules/HeroSection';
import { FeaturedVacancies } from '@/modules/FeaturedVacancies';
import { PromoSection } from '@/modules/PromoSection';
import { TopCompanies } from '@/modules/TopCompanies';

const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <FeaturedVacancies />
            <PromoSection />
            <TopCompanies />
        </div>
    );
};

export default HomePage;
