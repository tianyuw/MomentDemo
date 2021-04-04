import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';

function Home() {
  return (
    <div className="home">
      <HeroSection />
      <Cards />
    </div>
  );
}

export default Home;
