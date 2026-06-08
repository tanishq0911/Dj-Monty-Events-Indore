import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Music, Calendar, Image, Sliders, Sun, Moon, Users } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Music },
    { name: 'Gallery', path: '/gallery', icon: Image },
    { name: 'BookYourEvent', path: '/services', icon: Calendar },
    { name: 'About Us', path: '/#about-us', icon: Users, isHash: true }
  ];

  const handleNavLinkClick = (e, link) => {
    if (link.isHash) {
      if (location.pathname === '/') {
        e.preventDefault();
        const element = document.getElementById('about-us');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (link.path === '/') {
      if (location.pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className={`navbar-root ${scrolled ? 'scrolled' : ''}`} style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      width: '100%',
      transition: 'var(--transition-smooth)',
      backgroundColor: scrolled ? 'var(--navbar-bg)' : 'transparent',
      backdropFilter: scrolled ? 'var(--glass-blur)' : 'none',
      borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
      padding: scrolled ? '12px 0' : '20px 0'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <Link 
          to="/" 
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            setIsOpen(false);
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-title)' }}
        >
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            padding: '1.5px',
            background: 'var(--accent-gradient)',
            backgroundSize: '200% auto',
            animation: 'gradientFlow 6s linear infinite',
            boxShadow: '0 0 12px rgba(212, 175, 55, 0.3)'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              overflow: 'hidden',
              background: '#12101a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src="/logo.png" 
                alt="DJ Monty Events Logo" 
                style={{ 
                  height: '80%', 
                  width: '80%', 
                  objectFit: 'contain',
                  display: 'block',
                  borderRadius: '50%'
                }} 
              />
            </div>
          </div>
          <span className="text-gradient">Dj Monty Events</span>
        </Link>

        {/* Right side controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {/* Desktop Navigation */}
          <div style={{ display: 'none', gap: '15px', alignItems: 'center' }} className="desktop-menu">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = link.isHash 
                ? location.hash === '#about-us' 
                : location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavLinkClick(e, link)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)',
                    textShadow: isActive ? 'var(--text-glow)' : 'none',
                    padding: '6px 14px',
                    borderRadius: '50px',
                    background: isActive ? 'rgba(0, 240, 255, 0.06)' : 'transparent',
                    border: isActive ? '1px solid rgba(0, 240, 255, 0.2)' : '1px solid transparent',
                    transition: 'var(--transition-fast)'
                  }}
                  className="nav-link-hover"
                >
                  <Icon size={15} />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Sunlight Theme Toggle */}
          <button 
            onClick={toggleTheme}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-main)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              transition: 'var(--transition-smooth)',
              boxShadow: '0 0 10px rgba(0, 240, 255, 0.1)'
            }}
            className="theme-btn"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? (
              <Moon size={18} style={{ color: 'var(--accent-purple)', filter: 'drop-shadow(0 0 4px rgba(142,45,226,0.6))' }} />
            ) : (
              <Sun size={18} style={{ color: '#ffcc00', filter: 'drop-shadow(0 0 6px #ffcc00)' }} />
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              cursor: 'pointer',
              display: 'block',
              padding: '5px'
            }}
            className="mobile-toggle-btn"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'var(--navbar-bg)',
          backdropFilter: 'var(--glass-blur)',
          borderBottom: '1px solid var(--glass-border)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 99
        }} className="mobile-menu-drawer">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.isHash 
              ? location.hash === '#about-us' 
              : location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavLinkClick(e, link)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: isActive ? 'var(--accent-cyan)' : 'var(--text-main)',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: isActive ? 'rgba(0, 240, 255, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                  border: isActive ? '1px solid rgba(0, 240, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <Icon size={18} />
                {link.name}
              </Link>
            );
          })}
        </div>
      )}

      {/* Inline styles for media queries */}
      <style>{`
        @media (min-width: 769px) {
          .desktop-menu {
            display: flex !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
          .mobile-menu-drawer {
            display: none !important;
          }
        }
        .nav-link-hover:hover {
          color: var(--accent-cyan) !important;
          background: rgba(0, 240, 255, 0.04);
          border-color: rgba(0, 240, 255, 0.1);
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
