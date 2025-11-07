import React from 'react';

const ReachUsPage = () => {
  return (
    <div className="reach-us-page">
      <div className="reach-hero">
        <h1 className="page-title">Reach Us</h1>
        <p className="page-subtitle">Get in Touch</p>
      </div>

      <div className="container">
        <div className="contact-grid" style={{ gridTemplateColumns: '1fr', justifyContent: 'center', maxWidth: '600px', margin: '0 auto' }}>
          {/* Contact Info */}
          <div className="contact-info-section">
            <div className="info-card">
              <h3>Address</h3>
              <p>Cambridge School</p>
              <p>Sector 27, Noida</p>
              <p>Uttar Pradesh - 201301</p>
            </div>

            <div className="info-card">
              <h3>Contact</h3>
              <p>Email: info@cambridgeschool.edu.in</p>
            </div>

            <div className="info-card">
              <h3>🕐 Event Timings</h3>
              <p>19th November: 9:00 AM - 4:00 PM</p>
              <p>20th November: 9:00 AM - 4:00 PM</p>
            </div>

            <div className="info-card">
              <h3>Connect With Us</h3>
              <div className="social-links" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a 
                  href="https://www.facebook.com/cambridgeschoolnoida" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                  style={{ textAlign: 'center', padding: '0.8rem 1.2rem', flex: '1', minWidth: '120px' }}
                >
                  <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.3rem' }}></span>
                  Facebook
                </a>
                <a 
                  href="https://www.instagram.com/cambridgenoida" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                  style={{ textAlign: 'center', padding: '0.8rem 1.2rem', flex: '1', minWidth: '120px' }}
                >
                  <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.3rem' }}></span>
                  Instagram
                </a>
                <a 
                  href="https://linktr.ee/Image_2025" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                  style={{ textAlign: 'center', padding: '0.8rem 1.2rem', flex: '1', minWidth: '120px' }}
                >
                  <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.3rem' }}></span>
                  Linktree
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <h2>Find Us</h2>
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.566770093956!2d77.31658731508077!3d28.582739382435764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce45f1c2e68d1%3A0x4fd033cb5b4e1d5f!2sCambridge%20School%2C%20Noida!5e0!3m2!1sen!2sin!4v1635789456789!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Cambridge School Noida Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReachUsPage;
