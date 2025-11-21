import React from 'react';

const ResultsPage = () => {

  
  const googleDriveFileId = '1tTyzkT2jBc6jbs4roTC5TkN9qgdb-37Y';
  const pdfEmbedUrl = `https://drive.google.com/file/d/${1tTyzkT2jBc6jbs4roTC5TkN9qgdb-37Y}/preview`;
  const pdfViewUrl = `https://drive.google.com/file/d/${1tTyzkT2jBc6jbs4roTC5TkN9qgdb-37Y}/view`;

  const handleDownload = () => {
    window.open(pdfViewUrl, '_blank', 'noopener,noreferrer');
  };

  const handleOpenNewTab = () => {
    window.open(pdfViewUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="results-page">
      <div className="results-hero">
        <h1 className="page-title">Results</h1>
        <p className="page-subtitle">IMAGE 2025 Competition Results</p>
      </div>

      <div className="container">
        <div className="download-section">
          <button onClick={handleDownload} className="download-btn">
            <svg 
              width="24" 
              height="24" 
              fill="currentColor" 
              viewBox="0 0 24 24"
              style={{ marginRight: '0.5rem' }}
            >
              <path d="M12 16l-6-6h4V4h4v6h4l-6 6z"/>
              <path d="M20 18H4v2h16v-2z"/>
            </svg>
            View/Download Results PDF
          </button>
          <p className="download-info">
            Click to open the full results document in a new tab
          </p>
        </div>

        <div className="pdf-viewer-container">
          <iframe
            src={pdfEmbedUrl}
            title="IMAGE 2025 Results"
            className="pdf-iframe"
            frameBorder="0"
            allow="autoplay"
          >
            <p>
              Your browser does not support PDFs. 
              <button onClick={handleOpenNewTab}> Click here to view the PDF</button>
            </p>
          </iframe>
        </div>

        <div className="alternative-link">
          <p>
            Having trouble viewing the PDF? 
            <button 
              onClick={handleOpenNewTab}
              style={{
                background: 'none',
                border: 'none',
                color: '#A03D37',
                textDecoration: 'underline',
                marginLeft: '0.5rem',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: 'inherit',
                fontFamily: 'inherit'
              }}
            >
              Open in new tab
            </button>
          </p>
        </div>
      </div>

      <style jsx>{`
        .results-page {
          min-height: calc(100vh - 70px);
          background: #EAD4B9;
          padding-bottom: 3rem;
        }

        .results-hero {
          padding: 3rem 0;
          text-align: center;
          background: linear-gradient(135deg, #EAD4B9 0%, #DBCAB0 100%);
          border-bottom: 1px solid rgba(160, 61, 55, 0.1);
          margin-bottom: 3rem;
        }

        .page-title {
          font-size: 3rem;
          font-weight: 700;
          font-family: 'Playfair Display', serif;
          color: #A03D37;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #A03D37 0%, #C07D67 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-subtitle {
          color: #6E87AC;
          font-size: 1.1rem;
          font-weight: 400;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .download-section {
          text-align: center;
          margin-bottom: 2rem;
        }

        .download-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 2.5rem;
          background: linear-gradient(135deg, #A03D37 0%, #C07D67 100%);
          color: #FFFFFF;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(17, 11, 11, 0.12);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .download-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(17, 11, 11, 0.16);
        }

        .download-btn:active {
          transform: translateY(0);
        }

        .download-info {
          margin-top: 1rem;
          font-size: 0.9rem;
          color: #8A7968;
          font-style: italic;
        }

        .pdf-viewer-container {
          background: rgba(255, 255, 255, 0.7);
          border-radius: 16px;
          padding: 1rem;
          box-shadow: 0 4px 16px rgba(17, 11, 11, 0.12);
          border: 1px solid rgba(160, 61, 55, 0.15);
          margin-bottom: 2rem;
          position: relative;
        }

        .pdf-iframe {
          width: 100%;
          height: 80vh;
          min-height: 600px;
          border: none;
          border-radius: 12px;
          background: white;
        }

        .alternative-link {
          text-align: center;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 12px;
          border: 1px solid rgba(160, 61, 55, 0.1);
        }

        .alternative-link p {
          color: #110B0B;
          font-size: 0.95rem;
          margin: 0;
        }

        .pdf-viewer-container::before {
          content: 'Loading PDF...';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #A03D37;
          font-size: 1.2rem;
          font-weight: 600;
          z-index: -1;
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 2rem;
          }

          .page-subtitle {
            font-size: 1rem;
          }

          .download-btn {
            padding: 0.8rem 1.5rem;
            font-size: 0.95rem;
            width: 100%;
          }

          .pdf-iframe {
            height: 70vh;
            min-height: 500px;
          }

          .pdf-viewer-container {
            padding: 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .results-hero {
            padding: 2rem 1rem;
          }

          .page-title {
            font-size: 1.8rem;
          }

          .download-btn {
            font-size: 0.85rem;
            padding: 0.7rem 1.2rem;
          }

          .pdf-iframe {
            height: 60vh;
            min-height: 400px;
          }
        }
      `}</style>
    </div>
  );
};

export default ResultsPage;
