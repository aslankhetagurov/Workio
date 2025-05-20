import { HeroSection } from '@/modules/HeroSection';
import { FeaturedVacancies } from '@/modules/FeaturedVacancies';
import { PromoSection } from '@/modules/PromoSection';
import { TopCompanies } from '@/modules/TopCompanies';
import { FeaturedCities } from '@/modules/FeaturedCities';
import { FeaturedResumes } from '@/modules/FeaturedResumes';

const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <FeaturedVacancies />
            <PromoSection />
            <TopCompanies />
            <FeaturedCities />
            <FeaturedResumes />
        </div>
    );
};

export default HomePage;
