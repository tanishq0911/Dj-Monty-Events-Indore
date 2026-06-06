import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Gallery from './pages/Gallery.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

function App() {
  return (
    <Router>
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
        {/* Background Orbs */}
        <div className="bg-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        <Navbar />
        <main style={{ flex: '1 0 auto' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        {/* Floating WhatsApp Widget */}
        <a 
          href="https://wa.me/918085526131?text=Hello%20DJ%20Monty%20Events!%20I%20would%20like%20to%20inquire%20about%20your%20services%20and%20packages%20for%20an%20upcoming%20event.%20Please%20connect%20with%20me."
          target="_blank"
          rel="noreferrer"
          className="whatsapp-float-btn"
          title="Chat on WhatsApp"
        >
          <MessageCircle size={28} />
        </a>
      </div>
    </Router>
  );
}

export default App;
