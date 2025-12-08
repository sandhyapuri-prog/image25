import React, { useState, useEffect, useRef } from 'react';

const GalleryPage = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const imageRefs = useRef({});

  // Gallery images (31-52 existing, add more from 53 onwards)
  const galleryImages = Array.from({ length: 22 }, (_, i) => ({
    id: i + 31,
    src: `/gallery/${i + 31}.jpg`,
    title: `Gallery Image ${i + 1}`,
    size: i % 5 === 0 ? 'large' : i % 3 === 0 ? 'tall' : i % 7 === 0 ? 'wide' : 'normal'
  }));

  // To add more images, add them here starting from 53
  // Example:
  // const additionalImages = Array.from({ length: 10 }, (_, i) => ({
  //   id: i + 53,
  //   src: `/gallery/${i + 53}.jpg`,
  //   title: `Gallery Image ${i + 23}`,
  //   size: i % 5 === 0 ? 'large' : i % 3 === 0 ? 'tall' : i % 7 === 0 ? 'wide' : 'normal'
  // }));
  // 
  // Then combine: const galleryImages = [...existingImages, ...additionalImages];

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImageIndex(null);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    setSelectedImageIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setSelectedImageIndex((prevIndex) => 
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
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

  return (
    <div className="gallery-page">
      <div className="gallery-hero">
        <h1 className="page-title">Gallery</h1>
        <p className="page-subtitle">Capturing Moments of Excellence</p>
      </div>

      <div className="container">
        <div className="gallery-section">
          <div className="masonry-gallery">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className={`gallery-item ${image.size}`}
                onClick={() => openLightbox(index)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="image-wrapper">
                  <img 
                    src={image.src} 
                    alt={image.title}
                    loading="lazy"
                  />
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
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && selectedImageIndex !== null && (
        <div className="lightbox-modal" onClick={closeLightbox}>
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              ✕
            </button>

            <button className="lightbox-nav lightbox-prev" onClick={goToPrevious}>
              ‹
            </button>

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
                <span style={{ marginLeft: '1rem', color: '#C07D67' }}>
                  {galleryImages[selectedImageIndex].title}
                </span>
              </div>
            </div>

            <button className="lightbox-nav lightbox-next" onClick={goToNext}>
              ›
            </button>

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
        {/* Keep all your existing styles exactly as they are */}
        .gallery-page {
          min-height: calc(100vh - 70px);
          background: #EAD4B9;
        }

        .gallery-hero {
          padding: 3rem 0;
          text-align: center;
          background: linear-gradient(135deg, #EAD4B9 0%, #DBCAB0 100%);
          border-bottom: 1px solid rgba(160, 61, 55, 0.1);
        }

        .page-title {
          font-size: 3rem;
          font-weight: 700;
          font-family: 'Playfair Display', serif;
          color: #A03D37;
          margin-bottom: 0.5rem;
        }

        .page-subtitle {
          color: #6E87AC;
          font-size: 1.1rem;
        }

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
          box-shadow: 0 4px 16px rgba(17, 11, 11, 0.12);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background: #DBCAB0;
        }

        .gallery-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 32px rgba(17, 11, 11, 0.16);
        }

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
          background: linear-gradient(180deg, transparent 0%, rgba(17, 11, 11, 0.7) 100%);
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
          background: #A03D37;
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
          background: #A03D37;
          border-color: #A03D37;
          transform: rotate(90deg);
        }

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
          background: #A03D37;
          border-color: #A03D37;
          transform: translateY(-50%) scale(1.1);
        }

        .lightbox-prev {
          left: 20px;
        }

        .lightbox-next {
          right: 20px;
        }

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
        }

        .lightbox-thumbnails::-webkit-scrollbar {
          height: 4px;
        }

        .lightbox-thumbnails::-webkit-scrollbar-track {
          background: transparent;
        }

        .lightbox-thumbnails::-webkit-scrollbar-thumb {
          background: #A03D37;
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
          border-color: #A03D37;
          opacity: 1;
          transform: scale(1.1);
        }

        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

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

          .page-title {
            font-size: 2rem;
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
