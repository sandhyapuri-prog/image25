import React, { useState, useEffect } from 'react';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'events', label: 'EVENTS'},
    { id: 'schedule', label: 'SCHEDULE', isScrollTo: true },
    { id: 'gallery', label: 'GALLERY'},
    { id: 'team', label: 'TEAM'},
    { id: 'reach-us', label: 'REACH US'},
    { 
      id: 'brochure', 
      label: 'BROCHURE', 
      isExternal: true, 
      link: 'https://drive.google.com/file/d/1xNYFjD7GS9jYJZaLhsOg5tD4IOrlLCyg/view?usp=drive_link'
    }
  ];

  const handleNavClick = (item) => {
    if (item.isExternal) {
      window.open(item.link, '_blank', 'noopener,noreferrer');
    } else if (item.isScrollTo) {

      if (currentPage === 'home') {

        const scheduleSection = document.getElementById('schedule-section');
        if (scheduleSection) {
          scheduleSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else {

        setCurrentPage('home');

        setTimeout(() => {
          const scheduleSection = document.getElementById('schedule-section');
          if (scheduleSection) {
            scheduleSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      setCurrentPage(item.id);
    }
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">IMAGE</span>
            <span className="logo-year">2025</span>
          </div>

          <div className="nav-menu desktop-menu">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${!item.isExternal && !item.isScrollTo && currentPage === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item)}
              >
                <span className="nav-label">{item.label}</span>
                {item.isExternal && (
                  <span className="external-icon" style={{ marginLeft: '5px', fontSize: '0.8rem' }}>↗</span>
                )}
                <span className="nav-indicator"></span>
              </button>
            ))}
          </div>

          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className={`menu-icon ${isMobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`mobile-nav-item ${!item.isExternal && !item.isScrollTo && currentPage === item.id ? 'active' : ''}`}
            onClick={() => {
              if (item.isExternal) {
                window.open(item.link, '_blank', 'noopener,noreferrer');
              } else if (item.isScrollTo) {
                if (currentPage === 'home') {
                  const scheduleSection = document.getElementById('schedule-section');
                  if (scheduleSection) {
                    scheduleSection.scrollIntoView({ behavior: 'smooth' });
                  }
                } else {
                  setCurrentPage('home');
                  setTimeout(() => {
                    const scheduleSection = document.getElementById('schedule-section');
                    if (scheduleSection) {
                      scheduleSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }
              } else {
                setCurrentPage(item.id);
              }
              setIsMobileMenuOpen(false);
            }}
          >
            <span className="nav-label">{item.label}</span>
            {item.isExternal && (
              <span className="external-icon" style={{ marginLeft: '5px', fontSize: '0.8rem' }}>↗</span>
            )}
          </button>
        ))}
      </div>

      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
