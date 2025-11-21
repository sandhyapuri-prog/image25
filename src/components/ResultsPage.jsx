import React from 'react';

const ResultsPage = () => {
  // Update this with your actual PDF URL
  const pdfUrl = '/results/image-2025-results.pdf'; // Or use a Google Drive link

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'IMAGE-2025-Results.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="results-page">
      {/* Hero Section */}
      <div className="results-hero">
        <h1 className="page-title">Results</h1>
        <p className="page-subtitle">IMAGE 2025 Competition Results</p>
      </div>

      <div className="container">
        {/* Download Button Section */}
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
            Download Results PDF
          </button>
          <p className="download-info">
            Click to download the complete results document
          </p>
        </div>

        {/* PDF Viewer */}
        <div className="pdf-viewer-container">
          <iframe
            src={pdfUrl}
            title="IMAGE 2025 Results"
            className="pdf-iframe"
            frameBorder="0"
          >
            <p>
              Your browser does not support PDFs. 
              <a href={pdfUrl} download> Download the PDF</a> to view it.
            </p>
          </iframe>
        </div>

        {/* Alternative: If PDF doesn't load */}
        <div className="alternative-link">
          <p>
            Having trouble viewing the PDF? 
            <a 
              href={pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: '#A03D37',
                textDecoration: 'underline',
                marginLeft: '0.5rem',
                fontWeight: '600'
              }}
            >
              Open in new tab
            </a>
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

        @media (max-width: 768px) {
          .page-title {
            font-size: 2rem;
          }

          .page-subtitle {
            font-size: 1rem;
          }

          .download-btn {
            padding: 0.8rem 1.5rem;
            font-size: 1rem;
            width: 100%;
          }

          .pdf-iframe {
            height: 60vh;
            min-height: 400px;
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
            font-size: 0.9rem;
            padding: 0.7rem 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ResultsPage;
