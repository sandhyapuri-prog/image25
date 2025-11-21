// In src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import EventsPage from './components/EventsPage';
import GalleryPage from './components/GalleryPage';
import ReachUsPage from './components/ReachUsPage';
import ResultsPage from './components/ResultsPage';
import TeamPage from './components/TeamPage';


const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

// In App.js
const renderPage = () => {
  switch(currentPage) {
    case 'home':
      return <HomePage setCurrentPage={setCurrentPage} />;
    case 'events':
      return <EventsPage />;
    case 'gallery':
      return <GalleryPage />;
    case 'team':
      return <TeamPage />;
    case 'results':
      return <ResultsPage />;
    case 'reach-us':
      return <ReachUsPage />;
    default:
      return <HomePage setCurrentPage={setCurrentPage} />;
  }
};

  return (
    <>
      <div className={`loading-screen ${!isLoading ? 'fade-out' : ''}`}>
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      </div>

      <div className="app-container">
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className="page-content">
          {renderPage()}
        </div>
      </div>
    </>
  );
};

export default App;
