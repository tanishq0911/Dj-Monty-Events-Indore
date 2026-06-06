import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Mail, Phone, MapPin, Instagram, Youtube, Facebook, Music2 } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--glass-border)',
      padding: '60px 0 30px 0',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-body)',
      width: '100%'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '40px',
        marginBottom: '40px'
      }}>
        {/* Brand Block */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Music className="glow-cyan" size={24} style={{ color: 'var(--accent-cyan)' }} />
            <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-title)', color: 'var(--text-main)' }} className="text-gradient">Dj Monty Events</span>
          </div>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '15px' }}>
            Bringing professional audio engineering, vibrant lighting choreography, and electrifying music mixes to your memorable events.
          </p>
          <p style={{
            fontSize: '0.95rem',
            fontStyle: 'italic',
            color: 'var(--accent-cyan)',
            fontWeight: 500,
            marginBottom: '20px',
            textShadow: 'var(--text-glow)'
          }}>
            "Enjoy Your Precious Moment With Us"
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="https://www.instagram.com/djmonty_events_indore?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="social-icon" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="https://www.youtube.com/@djmontyvlogs" target="_blank" rel="noreferrer" className="social-icon" aria-label="YouTube"><Youtube size={18} /></a>
            <a href="https://www.facebook.com/p/Dj-Monty-100054425022610/" target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook"><Facebook size={18} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '20px', fontFamily: 'var(--font-title)' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0 }}>
            <li><Link to="/" className="footer-link">Home & Intro</Link></li>
            <li><Link to="/services" className="footer-link">Services & Packages</Link></li>
            <li><Link to="/gallery" className="footer-link">Event Gallery</Link></li>
            <li><Link to="/admin" className="footer-link">Admin Dashboard</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '20px', fontFamily: 'var(--font-title)' }}>Get In Touch</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', padding: 0 }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem' }}>
              <Mail size={18} style={{ color: 'var(--accent-cyan)', marginTop: '2px', flexShrink: 0 }} />
              <span>djmontyevents@gmail.com</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem' }}>
              <Phone size={18} style={{ color: 'var(--accent-cyan)', marginTop: '2px', flexShrink: 0 }} />
              <div>
                <div>+91 8085526131 , 9009994940</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>Mon–Sun: 9 AM – 9 PM</div>
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem' }}>
              <MapPin size={18} style={{ color: 'var(--accent-cyan)', marginTop: '2px', flexShrink: 0 }} />
              <div>
                <div>Indore, Madhya Pradesh, India</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>Service Area: Around MP</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="container" style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        paddingTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px',
        fontSize: '0.85rem'
      }}>
        <p>&copy; {currentYear} Dj Monty Events. All rights reserved.</p>
        <p style={{ display: 'flex', gap: '15px' }}>
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Terms of Service</a>
        </p>
      </div>

      <style>{`
        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
          transition: var(--transition-smooth);
        }
        .social-icon:hover {
          color: var(--accent-magenta);
          background: rgba(255, 0, 127, 0.08);
          border-color: var(--accent-magenta);
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(255, 0, 127, 0.3);
        }
        .footer-link {
          transition: var(--transition-fast);
        }
        .footer-link:hover {
          color: var(--accent-cyan);
          text-shadow: var(--text-glow);
        }
      `}</style>
    </footer>
  );
}

export default Footer;
