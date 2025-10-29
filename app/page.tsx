import Navbar from '@/components/ResizablePortfolioNavigation';
import HeroSection from '@/components/HeroSection';
export default function Home() {
  return (
    <div>
      <Navbar />
      <div className='pt-16 sm:pt-16'>
        <HeroSection />
      </div>
    </div>
  );
}