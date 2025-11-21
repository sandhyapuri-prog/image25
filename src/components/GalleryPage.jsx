import React, { useState, useEffect, useRef } from 'react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loadedImages, setLoadedImages] = useState(new Set());
  const imageRefs = useRef({});

  // IMAGE 2025 Pictures (17-52) - 36 images
  const image2025Pictures = Array.from({ length: 36 }, (_, i) => ({
    id: i + 17,
    src: `/images/gallery/img${i + 17}.jpg`,
    category: i < 9 ? 'cultural' : i < 18 ? 'technical' : i < 27 ? 'creative' : 'literary',
    title: `Event ${i + 17}`,
    priority: 'high' // Current year gets high priority
  }));

  // Previous Year Glimpses (1-16) - 16 images
  const previousYearImages = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    src: `/images/gallery/img${i + 1}.jpg`,
    category: i < 4 ? 'cultural' : i < 8 ? 'technical' : i < 12 ? 'creative' : 'literary',
    title: `Event ${i + 1}`,
    priority: 'low' // Previous year gets low priority
  }));

  // Lazy loading with Intersection Observer
  useEffect(() => {
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imageId = entry.target.dataset.id;
            if (imageId && !loadedImages.has(imageId)) {
              // Load the image
              const img = entry.target.querySelector('img');
              if (img && img.dataset.src) {
                img.src = img.dataset.src;
                img.onload = () => {
                  setLoadedImages(prev => new Set([...prev, imageId]));
                  img.classList.add('loaded');
                };
              }
              imageObserver.unobserve(entry.target);
            }
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.01
      }
    );

    // Observe all image containers
    Object.values(imageRefs.current).forEach(ref => {
      if (ref) imageObserver.observe(ref);
    });

    return () => imageObserver.disconnect();
  }, [filter]); // Re-run when filter changes

  // Preload first few images of current year section
  useEffect(() => {
    const preloadImages = image2025Pictures.slice(0, 6); // Preload first 6 images
    preloadImages.forEach(image => {
      const img = new Image();
      img.src = image.src;
    });
  }, []);

  const filteredImages2025 = filter === 'all' 
    ? image2025Pictures 
    : image2025Pictures.filter(img => img.category === filter);

  const filteredImagesPrevious = filter === 'all' 
    ? previousYearImages 
    : previousYearImages.filter(img => img.category === filter);

  // Image component with lazy loading
  const LazyImage = ({ image, index, section }) => {
    const isLoaded = loadedImages.has(image.id.toString());
    const shouldPreload = section === 'current' && index < 6; // Preload first 6 current year images

    return (
      <div 
        ref={el => imageRefs.current[`${section}-${image.id}`] = el}
        key={image.id} 
        className={`gallery-item ${image.category}`}
        data-id={image.id}
        onClick={() => setSelectedImage(image)}
      >
        <div className={`image-loader ${isLoaded ? 'loaded' : ''}`}>
          {!isLoaded && (
            <div className="skeleton-loader">
              <div className="skeleton-shimmer"></div>
            </div>
          )}
          <img 
            src={shouldPreload ? image.src : ''}
            data-src={!shouldPreload ? image.src : ''}
            alt={image.title} 
            className={isLoaded ? 'loaded' : ''}
            loading={shouldPreload ? 'eager' : 'lazy'}
          />
        </div>
        <div className="gallery-overlay">
          <h3>{image.title}</h3>
          <p>{image.category}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1>Gallery</h1>
        <p>Moments of Excellence</p>
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

      {/* IMAGE 2025 PICTURES Section - Loads First */}
      <div className="gallery-section">
        <h2 className="gallery-section-title">IMAGE 2025 PICTURES</h2>
        <div className="gallery-grid">
          {filteredImages2025.map((image, index) => (
            <LazyImage 
              key={image.id}
              image={image} 
              index={index} 
              section="current"
            />
          ))}
        </div>
      </div>

      {/* PREVIOUS YEAR GLIMPSES Section - Loads After */}
      <div className="gallery-section">
        <h2 className="gallery-section-title">PREVIOUS YEAR GLIMPSES</h2>
        <div className="gallery-grid">
          {filteredImagesPrevious.map((image, index) => (
            <LazyImage 
              key={image.id}
              image={image} 
              index={index} 
              section="previous"
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content">
            <img src={selectedImage.src} alt={selectedImage.title} />
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
