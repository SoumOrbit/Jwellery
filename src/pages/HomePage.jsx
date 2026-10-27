import React, { useEffect } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedSection from '../components/home/FeaturedSection';
import HeritageStory from '../components/home/HeritageStory';
import Lookbook from '../components/home/Lookbook';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-page">
      <HeroBanner />
      <CategoryGrid />
      <FeaturedSection />
      <HeritageStory />
      <Lookbook />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default HomePage;
