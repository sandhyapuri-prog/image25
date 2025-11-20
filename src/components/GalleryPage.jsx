import React, { useState } from 'react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');

  // IMAGE 2025 Pictures (31-46)
  const image2025Pictures = Array.from({ length: 16 }, (_, i) => ({
    id: i + 31,
    src: `/images/gallery/img${i + 31}.jpg`,
    category: i < 4 ? 'cultural' : i < 8 ? 'technical' : i < 12 ? 'creative' : 'literary',
    title: `IMAGE 2025 - Event ${i + 1}`
  }));

  // Previous Year Glimpses (1-30)
  const previousYearImages = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    src: `/images/gallery/img${i + 1}.jpg`,
    category: i < 8 ? 'cultural' : i < 16 ? 'technical' : i < 24 ? 'creative' : 'literary',
    title: `Previous Year - Event ${i + 1}`
  }));

  const filterImages = (images) => {
    if (filter === 'all') return images;
    return images.filter(img => img.category === filter);
  };

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1>Gallery</h1>
        <p>Capturing moments of excellence and creativity</p>
      </div>

      {/* IMAGE 2025 Section */}
      <section className="gallery-section image-2025-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">IMAGE 2025 PICTURES</h2>
            <div className="title-line"></div>
          </div>

          <div className="filter-buttons">
            <button 
              className={filter === 'all' ? 'active' : ''} 
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={filter === 'cultural' ? 'active' : ''} 
              onClick={() => setFilter('cultural')}
            >
              Cultural
            </button>
            <button 
              className={filter === 'technical' ? 'active' : ''} 
              onClick={() => setFilter('technical')}
            >
              Technical
            </button>
            <button 
              className={filter === 'creative' ? 'active' : ''} 
              onClick={() => setFilter('creative')}
            >
              Creative
            </button>
            <button 
              className={filter === 'literary' ? 'active' : ''} 
              onClick={() => setFilter('literary')}
            >
              Literary
            </button>
          </div>

          <div className="gallery-grid">
            {filterImages(image2025Pictures).map((image) => (
              <div 
                key={image.id} 
                className={`gallery-item ${image.category}`}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image.src} alt={image.title} loading="lazy" />
                <div className="gallery-overlay">
                  <div className="overlay-content">
                    <h3>{image.title}</h3>
                    <p>{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Previous Year Section */}
      <section className="gallery-section previous-year-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">PREVIOUS YEAR GLIMPSES</h2>
            <div className="title-line"></div>
          </div>

          <div className="gallery-grid">
            {filterImages(previousYearImages).map((image) => (
              <div 
                key={image.id} 
                className={`gallery-item ${image.category}`}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image.src} alt={image.title} loading="lazy" />
                <div className="gallery-overlay">
                  <div className="overlay-content">
                    <h3>{image.title}</h3>
                    <p>{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content">
            <img src={selectedImage.src} alt={selectedImage.title} />
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="lightbox-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
