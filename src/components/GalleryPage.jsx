import React, { useState, useCallback, useEffect } from 'react';

const GalleryPage = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const galleryImages = Array.from({ length: 28 }, (_, i) => ({
    id: i + 1,
    src: `/gallery/${i + 1}.jpg`,
    title: `Image ${i + 1}`,
    size:
      i % 5 === 0
        ? 'large'
        : i % 3 === 0
        ? 'tall'
        : i % 7 === 0
        ? 'wide'
        : 'normal',
  }));

  const openLightbox = useCallback((index) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    setSelectedImageIndex(null);
    document.body.style.overflow = 'unset';
  }, []);

  const goToPrevious = useCallback(() => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  }, [galleryImages.length]);

  const goToNext = useCallback(() => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  }, [galleryImages.length]);

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
  }, [isLightboxOpen, closeLightbox, goToNext, goToPrevious]);


  
  return (
    <div className="gallery-page">
      <div className="gallery-hero">
        <h1 className="page-title">Gallery</h1>
        <p className="page-subtitle">Moments from IMAGE</p>
      </div>

      <div className="container">
        {/* Masonry Grid Gallery */}
        <div className="masonry-gallery">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`gallery-item ${image.size}`}
              onClick={() => openLightbox(index)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="image-wrapper">
                <img src={image.src} alt={image.title} />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <span className="expand-icon">🔍</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
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

            {/* Current Image */}
            <div className="lightbox-image-container">
              <img 
                src={galleryImages[selectedImageIndex].src} 
                alt={galleryImages[selectedImageIndex].title}
                className="lightbox-image"
              />
              <div className="lightbox-caption">
                <span className="image-counter">
                  {selectedImageIndex + 1} / {galleryImages.length}
                </span>
              </div>
            </div>

            {/* Next Button */}
            <button className="lightbox-nav lightbox-next" onClick={goToNext}>
              ›
            </button>

            {/* Thumbnail Strip */}
            <div className="lightbox-thumbnails">
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img src={image.src} alt={image.title} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
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
          transition: transform 0.3s ease;
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
          max-width: 90%;
          overflow-x: auto;
          scrollbar-width: thin;
          scrollbar-color: var(--primary) transparent;
        }

        .lightbox-thumbnails::-webkit-scrollbar {
          height: 4px;
        }

        .lightbox-thumbnails::-webkit-scrollbar-track {
          background: transparent;
        }

        .lightbox-thumbnails::-webkit-scrollbar-thumb {
          background: var(--primary);
          border-radius: 2px;
        }

        .thumbnail {
          width: 60px;
          height: 60px;
          flex-shrink: 0;
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          opacity: 0.6;
        }

        .thumbnail:hover {
          opacity: 1;
          transform: scale(1.1);
        }

        .thumbnail.active {
          border-color: var(--primary);
          opacity: 1;
          transform: scale(1.1);
        }

        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes zoomIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .masonry-gallery {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            grid-auto-rows: 150px;
            gap: 0.5rem;
          }

          .lightbox-nav {
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
          }

          .lightbox-prev {
            left: 10px;
          }

          .lightbox-next {
            right: 10px;
          }

          .lightbox-thumbnails {
            bottom: 10px;
            padding: 0.3rem;
          }

          .thumbnail {
            width: 40px;
            height: 40px;
          }

          .gallery-item.large,
          .gallery-item.wide {
            grid-column: span 2;
          }

          .gallery-item.tall {
            grid-row: span 2;
          }
        }

        @media (max-width: 480px) {
          .masonry-gallery {
            grid-template-columns: 1fr 1fr;
          }

          .gallery-item.large,
          .gallery-item.wide,
          .gallery-item.tall {
            grid-column: span 1;
            grid-row: span 1;
          }
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;
