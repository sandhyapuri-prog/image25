import React, { useEffect, useState } from 'react';

const HomePage = ({ setCurrentPage }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-bg-image" style={{
            transform: `translateY(${scrollY * 0.5}px)`
          }}></div>
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-main">
            <h1 className="hero-title animate-in">IMAGE 2025</h1>
            <h2 className="hero-subtitle animate-in-delay-1">वसुधैव कुटुम्बकम्</h2>
            <p className="hero-description animate-in-delay-2">
              One World • One Family • One Future
            </p>
            <div className="hero-dates animate-in-delay-3">
              <span className="date-badge">19th - 20th November 2025</span>
            </div>
            <button 
              className="hero-cta animate-in-delay-4"
              onClick={() => setCurrentPage('events')}
            >
              <span>Explore Events</span>
              <svg className="cta-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <p>Scroll to explore</p>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About IMAGE</h2>
            <div className="title-line"></div>
          </div>
          
          <div className="about-content">
            <div className="about-text">
              <p className="lead-text">
                IMAGE is Cambridge School Noida's flagship inter-school competition, 
                bringing together young minds to celebrate creativity, innovation, and cultural diversity.
              </p>
              <p>
                Under the theme <strong>"वसुधैव कुटुम्बकम्"</strong> (The World is One Family), 
                IMAGE 2025 embodies the spirit of global unity and harmony. This two-day extravaganza 
                features competitions across arts, technology, culture, and academics.
              </p>
            </div>
            
            <div className="stats-grid">
              <div className="stat-card">
                <h3 className="stat-number">5</h3>
                <p className="stat-label">Categories</p>
              </div>
              <div className="stat-card">
                <h3 className="stat-number">35+</h3>
                <p className="stat-label">Events</p>
              </div>
              <div className="stat-card">
                <h3 className="stat-number">2</h3>
                <p className="stat-label">Days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Event Categories</h2>
            <div className="title-line"></div>
          </div>
          
          <div className="categories-grid">
            <div className="category-card" onClick={() => setCurrentPage('events')}>
              <h3>NAVRAS</h3>
              <p>Cultural & Performing Arts</p>
            </div>
            <div className="category-card" onClick={() => setCurrentPage('events')}>
              <h3>WORDWEAVE</h3>
              <p>Literary & Language</p>
            </div>
            <div className="category-card" onClick={() => setCurrentPage('events')}>
              <h3>NAVRANG</h3>
              <p>Visual Arts & Creativity</p>
            </div>
            <div className="category-card" onClick={() => setCurrentPage('events')}>
              <h3>TECHNOLYMPICS</h3>
              <p>Technology & Innovation</p>
            </div>
            <div className="category-card" onClick={() => setCurrentPage('events')}>
              <h3>AUREUS</h3>
              <p>Business & Strategy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h3>IMAGE 2025</h3>
              <p>Cambridge School Noida</p>
            </div>
            <div>
              <h3>Website by Satish Garg and Rahul Smritijeet</h3>
            </div>
            <div className="footer-links">
              <button onClick={() => setCurrentPage('events')}>Events</button>
              <button onClick={() => setCurrentPage('gallery')}>Gallery</button>
              <button onClick={() => setCurrentPage('reach-us')}>Contact</button>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Cambridge School Noida. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
