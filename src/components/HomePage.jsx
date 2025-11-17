import React, { useEffect, useState } from 'react';

const HomePage = ({ setCurrentPage }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Schedule data
  const scheduleDay1 = [
    { id: 1, name: "Symphony", time: "9:30 a.m." },
    { id: 2, name: "Nrityanjali", time: "11:00 a.m." },
    { id: 3, name: "Sur Sangam", time: "9:30 a.m." },
    { id: 4, name: "Sanskrit Shloka Chanting", time: "11:00 a.m." },
    { id: 5, name: "Ted Talk", time: "9:45 a.m." },
    { id: 6, name: "Baaton Baaton Main", time: "11:00 a.m." },
    { id: 7, name: "Kitchen Geniuses", time: "9:30 a.m." },
    { id: 8, name: "Flights of Poetic Fantasy", time: "9:30 a.m." },
    { id: 9, name: "Chitrashala", time: "9:30 a.m." },
    { id: 10, name: "Aesthetic Moves", time: "9:30 a.m." },
    { id: 11, name: "Game Craft", time: "10:00 a.m." },
    { id: 12, name: "Webolution", time: "9:30 a.m." },
    { id: 13, name: "Chem Craft 3D", time: "9:45 a.m." },
    { id: 14, name: "Vista View", time: "9:30 a.m." },
    { id: 15, name: "CrypteX", time: "9:30 a.m." }
  ];

  const scheduleDay2 = [
    { id: 1, name: "IQrypt: Science and Technology Quiz", time: "9:00 a.m. & 9:45 a.m." },
    { id: 2, name: "Elan: The Pulse Within", time: "11:00 a.m." },
    { id: 3, name: "Nukkad Natak", time: "9:15 a.m." },
    { id: 4, name: "Rube it Up!", time: "9:30 a.m." },
    { id: 5, name: "Bid Blitz", time: "9:00 a.m." },
    { id: 6, name: "Think Tank", time: "9:00 a.m." },
    { id: 7, name: "Eco Innovators", time: "9:30 a.m." },
    { id: 8, name: "Game Spark", time: "9:30 a.m." },
    { id: 9, name: "Top Coders", time: "9:30 a.m." },
    { id: 10, name: "Reel Harmony", time: "9:30 a.m." }
  ];

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
                <p className="stat-label">Fests</p>
              </div>
              <div className="stat-card">
                <h3 className="stat-number">30+</h3>
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
            <h2 className="section-title">Categories</h2>
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
              <p>Science, Technology & Innovation</p>
            </div>
            <div className="category-card" onClick={() => setCurrentPage('events')}>
              <h3>AUREUS</h3>
              <p>Business & Strategy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="schedule-section" id="schedule-section" style={{
        padding: '5rem 0',
        background: 'var(--bg-tertiary)'
      }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">SCHEDULE</h2>
            <div className="title-line"></div>
            <p style={{
              textAlign: 'center',
              color: 'var(--text-secondary)',
              marginTop: '1rem',
              fontSize: '1.1rem'
            }}>A Festival of Interschool Competitions</p>
          </div>
          
          <div className="schedule-container" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {/* Day 1 */}
            <div className="day-schedule" style={{
              background: 'var(--bg-card)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid rgba(160, 61, 55, 0.15)',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div className="day-header" style={{
                textAlign: 'center',
                marginBottom: '1.5rem',
                paddingBottom: '1rem',
                borderBottom: '2px solid var(--primary)'
              }}>
                <h3 style={{
                  color: 'var(--primary)',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem'
                }}>DAY 1</h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem'
                }}>Wednesday, November 19, 2025</p>
              </div>
              
              <div className="schedule-list">
                {scheduleDay1.map((event, index) => (
                  <div key={event.id} className="schedule-item" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.8rem',
                    marginBottom: '0.5rem',
                    background: index % 2 === 0 ? 'rgba(160, 61, 55, 0.05)' : 'transparent',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <span style={{
                        color: 'var(--accent)',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        minWidth: '20px'
                      }}>{event.id}.</span>
                      <span style={{
                        color: 'var(--text-primary)',
                        fontSize: '0.95rem',
                        fontWeight: '500'
                      }}>{event.name}</span>
                    </div>
                    <span style={{
                      color: 'var(--secondary)',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      background: 'rgba(52, 100, 165, 0.1)',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '15px'
                    }}>{event.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Day 2 */}
            <div className="day-schedule" style={{
              background: 'var(--bg-card)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid rgba(160, 61, 55, 0.15)',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div className="day-header" style={{
                textAlign: 'center',
                marginBottom: '1.5rem',
                paddingBottom: '1rem',
                borderBottom: '2px solid var(--primary)'
              }}>
                <h3 style={{
                  color: 'var(--primary)',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem'
                }}>DAY 2</h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem'
                }}>Thursday, November 20, 2025</p>
              </div>
              
              <div className="schedule-list">
                {scheduleDay2.map((event, index) => (
                  <div key={event.id} className="schedule-item" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.8rem',
                    marginBottom: '0.5rem',
                    background: index % 2 === 0 ? 'rgba(160, 61, 55, 0.05)' : 'transparent',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <span style={{
                        color: 'var(--accent)',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        minWidth: '20px'
                      }}>{event.id}.</span>
                      <span style={{
                        color: 'var(--text-primary)',
                        fontSize: '0.95rem',
                        fontWeight: '500'
                      }}>{event.name}</span>
                    </div>
                    <span style={{
                      color: 'var(--secondary)',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      background: 'rgba(52, 100, 165, 0.1)',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '15px',
                      whiteSpace: 'nowrap'
                    }}>{event.time}</span>
                  </div>
                ))}
              </div>
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
              <h3 className="creditscsn">&copy; 2025 Cambridge School Noida. All rights reserved.</h3>
            </div>
            <div className="footer-links">
              <button onClick={() => setCurrentPage('events')}>Events</button>
              <button onClick={() => setCurrentPage('gallery')}>Gallery</button>
              <button onClick={() => setCurrentPage('reach-us')}>Contact</button>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Created by Satish Garg and Rahul Smritijeet</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
