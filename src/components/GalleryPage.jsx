import React, { useState, useEffect, useRef, useCallback } from 'react';

const GalleryPage = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('all');
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [visibleImages, setVisibleImages] = useState(new Set());
  const imageRefs = useRef({});

  // IMAGE 2025 PICTURES (31-52)
  const image2025Pictures = Array.from({ length: 22 }, (_, i) => ({
    id: i + 31,
    src: `/gallery/${i + 31}.jpg`,
    lowResSrc: `/gallery/thumbnails/${i + 31}_thumb.jpg`, // Optional: low-res placeholder
    title: `IMAGE 2025 - ${i + 1}`,
    size: i % 5 === 0 ? 'large' : i % 3 === 0 ? 'tall' : i % 7 === 0 ? 'wide' : 'normal',
    priority: i < 6 // First 6 images get priority
  }));

  // PREVIOUS YEAR GLIMPSES (1-30)
  const previousYearGlimpses = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    src: `/gallery/${i + 1}.jpg`,
    lowResSrc: `/gallery/thumbnails/${i + 1}_thumb.jpg`, // Optional: low-res placeholder
    title: `Previous Year - ${i + 1}`,
    size: i % 5 === 0 ? 'large' : i % 3 === 0 ? 'tall' : i % 7 === 0 ? 'wide' : 'normal',
    priority: false
  }));

  // Combine all images for lightbox navigation
  const allImages = [...image2025Pictures, ...previousYearGlimpses];

  // Preload images for better performance
  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, src]));
        resolve(img);
      };
      img.onerror = reject;
      img.src = src;
    });
  };

  // Priority load first visible images
  useEffect(() => {
    const loadPriorityImages = async () => {
      const priorityImages = image2025Pictures
        .filter(img => img.priority)
        .map(img => img.src);
      
      for (const src of priorityImages) {
        await preloadImage(src);
      }
    };
    
    loadPriorityImages();
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.01
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const imageId = entry.target.dataset.imageId;
          setVisibleImages(prev => new Set([...prev, imageId]));
          
          // Preload adjacent images for smooth scrolling
          const currentIndex = parseInt(entry.target.dataset.index);
          const imagesToPreload = allImages.slice(
            Math.max(0, currentIndex - 2),
            Math.min(allImages.length, currentIndex + 3)
          );
          
          imagesToPreload.forEach(img => {
            if (!loadedImages.has(img.src)) {
              preloadImage(img.src);
            }
          });
        }
      });
    }, options);

    // Observe all image containers
    Object.values(imageRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(imageRefs.current).forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [currentSection, loadedImages]);

  // Optimized image component
  const LazyImage = ({ image, index, section }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);
    const imgRef = useRef();

    useEffect(() => {
      if (visibleImages.has(image.id.toString()) || image.priority) {
        const img = new Image();
        img.onload = () => setIsLoaded(true);
        img.onerror = () => setError(true);
        img.src = image.src;
      }
    }, [image, visibleImages]);

    return (
      <div
        ref={el => imageRefs.current[`${section}-${index}`] = el}
        data-image-id={image.id}
        data-index={index}
        className={`gallery-item ${image.size}`}
        onClick={() => openLightbox(index, section)}
        style={{ 
          animationDelay: `${Math.min(index * 0.05, 1)}s`,
          backgroundColor: 'var(--bg-secondary)'
        }}
      >
        <div className="image-wrapper">
          {!isLoaded && !error && (
            <div className="image-placeholder" style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)'
            }}>
              <div className="loading-spinner" style={{
                width: '40px',
                height: '40px',
                border: '3px solid var(--bg-card)',
                borderTop: '3px solid var(--primary)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
            </div>
          )}
          
          {error && (
            <div className="error-placeholder" style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-secondary)',
              color: 'var(--text-muted)'
            }}>
              <span>Failed to load</span>
            </div>
          )}
          
          <img 
            ref={imgRef}
            src={isLoaded || image.priority ? image.src : image.lowResSrc || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E'} 
            alt={image.title}
            loading={image.priority ? "eager" : "lazy"}
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease',
              display: error ? 'none' : 'block'
            }}
          />
          
          <div className="image-overlay">
            <div className="overlay-content">
              <span className="expand-icon">🔍</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const openLightbox = useCallback((index, section) => {
    const actualIndex = section === 'current' ? index : index + image2025Pictures.length;
    setSelectedImageIndex(actualIndex);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
    
    // Preload next and previous images in lightbox
    const nextIndex = (actualIndex + 1) % allImages.length;
    const prevIndex = actualIndex === 0 ? allImages.length - 1 : actualIndex - 1;
    
    [allImages[prevIndex], allImages[actualIndex], allImages[nextIndex]].forEach(img => {
      if (img && !loadedImages.has(img.src)) {
        preloadImage(img.src);
      }
    });
  }, [allImages, image2025Pictures.length, loadedImages]);

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImageIndex(null);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    setSelectedImageIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? allImages.length - 1 : prevIndex - 1;
      // Preload next image
      const nextPreload = newIndex === 0 ? allImages.length - 1 : newIndex - 1;
      if (!loadedImages.has(allImages[nextPreload].src)) {
        preloadImage(allImages[nextPreload].src);
      }
      return newIndex;
    });
  };

  const goToNext = () => {
    setSelectedImageIndex((prevIndex) => {
      const newIndex = prevIndex === allImages.length - 1 ? 0 : prevIndex + 1;
      // Preload next image
      const nextPreload = newIndex === allImages.length - 1 ? 0 : newIndex + 1;
      if (!loadedImages.has(allImages[nextPreload].src)) {
        preloadImage(allImages[nextPreload].src);
      }
      return newIndex;
    });
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  // Filter images based on current section
  const getCurrentImages = () => {
    if (currentSection === 'current') return image2025Pictures;
    if (currentSection === 'previous') return previousYearGlimpses;
    return [...image2025Pictures, ...previousYearGlimpses];
  };

  return (
    <div className="gallery-page">
      <div className="gallery-hero">
        <h1 className="page-title">Gallery</h1>
        <p className="page-subtitle">Capturing Moments of Excellence</p>
      </div>

      <div className="container">
        {/* Section Tabs */}
        <div className="section-tabs" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          margin: '3rem 0',
          flexWrap: 'wrap'
        }}>
          {['all', 'current', 'previous'].map(section => (
            <button
              key={section}
              className={`section-tab ${currentSection === section ? 'active' : ''}`}
              onClick={() => setCurrentSection(section)}
              style={{
                padding: '0.8rem 2rem',
                background: currentSection === section ? 'var(--gradient-primary)' : 'var(--bg-card)',
                border: '1px solid var(--primary)',
                borderRadius: '25px',
                color: currentSection === section ? 'var(--text-light)' : 'var(--text-primary)',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              {section === 'all' ? 'All Photos' : section === 'current' ? 'IMAGE 2025' : 'Previous Years'}
            </button>
          ))}
        </div>

        {/* Loading indicator */}
        {loadedImages.size < 5 && (
          <div style={{
            textAlign: 'center',
            padding: '1rem',
            color: 'var(--text-muted)',
            fontSize: '0.9rem'
          }}>
            Loading gallery images...
          </div>
        )}

        {/* IMAGE 2025 PICTURES Section */}
        {(currentSection === 'all' || currentSection === 'current') && (
          <div className="gallery-section" style={{ marginBottom: '4rem' }}>
            <div className="section-header" style={{
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                fontFamily: 'Playfair Display, serif',
                color: 'var(--primary)',
                marginBottom: '0.5rem'
              }}>IMAGE 2025 PICTURES</h2>
              <div style={{
                width: '100px',
                height: '3px',
                background: 'var(--gradient-primary)',
                margin: '0 auto',
                borderRadius: '2px'
              }}></div>
            </div>
            
            <div className="masonry-gallery">
              {image2025Pictures.map((image, index) => (
                <LazyImage 
                  key={image.id} 
                  image={image} 
                  index={index} 
                  section="current" 
                />
              ))}
            </div>
          </div>
        )}

        {/* PREVIOUS YEAR GLIMPSES Section */}
        {(currentSection === 'all' || currentSection === 'previous') && (
          <div className="gallery-section">
            <div className="section-header" style={{
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                fontFamily: 'Playfair Display, serif',
                color: 'var(--primary)',
                marginBottom: '0.5rem'
              }}>PREVIOUS YEAR GLIMPSES</h2>
              <div style={{
                width: '100px',
                height: '3px',
                background: 'var(--gradient-primary)',
                margin: '0 auto',
                borderRadius: '2px'
              }}></div>
            </div>
            
            <div className="masonry-gallery">
              {previousYearGlimpses.map((image, index) => (
                <LazyImage 
                  key={image.id} 
                  image={image} 
                  index={index} 
                  section="previous" 
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal - Optimized */}
      {isLightboxOpen && selectedImageIndex !== null && (
        <div className="lightbox-modal" onClick={closeLightbox}>
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button className="lightbox-close" onClick={closeLightbox}>
              ✕
            </button>

            {/* Previous Button */}
            <button className="lightbox-nav lightbox-prev" onClick={goToPrevious}>
              ‹
            </button>

            {/* Current Image with Loading State */}
            <div className="lightbox-image-container">
              {!loadedImages.has(allImages[selectedImageIndex].src) && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white'
                }}>
                  <div className="loading-spinner" style={{
                    width: '50px',
                    height: '50px',
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '3px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                </div>
              )}
              
              <img 
                src={allImages[selectedImageIndex].src} 
                alt={allImages[selectedImageIndex].title}
                className="lightbox-image"
                style={{
                  opacity: loadedImages.has(allImages[selectedImageIndex].src) ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }}
              />
              
              <div className="lightbox-caption">
                <span className="image-counter">
                  {selectedImageIndex + 1} / {allImages.length}
                </span>
                <span style={{ marginLeft: '1rem', color: 'var(--accent)' }}>
                  {allImages[selectedImageIndex].title}
                </span>
              </div>
            </div>

            {/* Next Button */}
            <button className="lightbox-nav lightbox-next" onClick={goToNext}>
              ›
            </button>

            {/* Optimized Thumbnail Strip */}
            <div className="lightbox-thumbnails">
              {allImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                  onClick={() => setSelectedImageIndex(index)}
                  style={{
                    backgroundImage: `url(${image.lowResSrc || image.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Use low-res or placeholder for thumbnails */}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Loading Spinner Animation */
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Masonry Gallery Grid */
        .masonry-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          grid-auto-rows: 250px;
          gap: 1rem;
          padding: 2rem 0;
        }

        .gallery-item {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          cursor: pointer;
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
          box-shadow: var(--shadow-md);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background: var(--bg-secondary);
        }

        .gallery-item:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }

        /* Grid item sizes */
        .gallery-item.large {
          grid-column: span 2;
          grid-row: span 2;
        }

        .gallery-item.tall {
          grid-row: span 2;
        }

        .gallery-item.wide {
          grid-column: span 2;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .gallery-item:hover .image-wrapper img {
          transform: scale(1.1);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg,
            transparent 0%,
            rgba(17, 11, 11, 0.7) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gallery-item:hover .image-overlay {
          opacity: 1;
        }

        .expand-icon {
          font-size: 2rem;
          color: white;
          background: var(--primary);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: scale(0);
          transition: transform 0.3s ease;
        }

        .gallery-item:hover .expand-icon {
          transform: scale(1);
        }

        /* Lightbox Modal */
        .lightbox-modal {
          position: fixed;
          inset: 0;
          background: rgba(17, 11, 11, 0.95);
          backdrop-filter: blur(10px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease;
        }

        .lightbox-container {
          position: relative;
          width: 90%;
          max-width: 1200px;
          height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        /* Close Button */
        .lightbox-close {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .lightbox-close:hover {
          background: var(--primary);
          border-color: var(--primary);
          transform: rotate(90deg);
        }

        /* Navigation Buttons */
        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          color: white;
          font-size: 2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .lightbox-nav:hover {
          background: var(--primary);
          border-color: var(--primary);
          transform: translateY(-50%) scale(1.1);
        }

        .lightbox-prev {
          left: 20px;
        }

        .lightbox-next {
          right: 20px;
        }

        /* Main Image Container */
        .lightbox-image-container {
          position: relative;
          max-width: 100%;
          max-height: calc(100% - 120px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-image {
          max-width: 100%;
          max-height: 70vh;
          object-fit: contain;
          border-radius: 8px;
          animation: zoomIn 0.3s ease;
        }

        .lightbox-caption {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          background: rgba(0, 0, 0, 0.7);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          white-space: nowrap;
        }

        /* Thumbnail Strip */
        .lightbox-thumbnails {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
          padding: 0.5rem;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          max-width: 
