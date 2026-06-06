import React, { useState } from 'react';
import { Sparkles, Calendar, Users, Phone, Mail, User, FileText, CheckCircle, AlertCircle, MapPin, MessageCircle, Globe, Facebook, Instagram, Youtube } from 'lucide-react';

function Services() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Map subject selection to Mongoose Schema enum categories
      let mappedEventType = 'Other';
      const subj = formData.subject || '';
      if (subj.includes('Wedding')) mappedEventType = 'Wedding';
      else if (subj.includes('Sangeet')) mappedEventType = 'Sangeet';
      else if (subj.includes('Barat')) mappedEventType = 'Barat';
      else if (subj.includes('Haldi')) mappedEventType = 'Haldi';
      else if (subj.includes('Couple') || subj.includes('Entry')) mappedEventType = 'Engagement';
      else if (subj.includes('Club')) mappedEventType = 'Club';
      else if (subj.includes('Birthday')) mappedEventType = 'Birthday';
      else if (subj.includes('Corporate')) mappedEventType = 'Corporate';
      else if (subj.includes('Festival') || subj.includes('Concert')) mappedEventType = 'Festival';

      // Create a payload that satisfies the Mongoose Schema requirements
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventDate: new Date().toISOString().split('T')[0], // Default today's date
        eventType: mappedEventType,
        guests: 50, // Default guests count
        message: `Subject: ${formData.subject || 'General Inquiry'}\n\nMessage: ${formData.message}`
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('API Error:', err);
      setError('Connection refused. Is the backend server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '120px 0 80px 0', position: 'relative', zIndex: 1 }}>
      <div className="container" style={{ padding: '20px 0' }}>
        
        {/* Header Block */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '15px' }}>
            <Calendar className="glow-cyan" size={40} style={{ color: 'var(--accent-cyan)' }} />
          </div>
          <p style={{
            color: 'var(--accent-magenta)',
            fontSize: '0.9rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '15px'
          }}>
            Celebrates Yours Precious Moment With Us
          </p>
          <h1 style={{ fontSize: '3rem', marginBottom: '15px', fontFamily: 'var(--font-title)' }}>
            Get In <span className="text-gradient">Touch</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
            Have a question or ready to book your next big celebration? Reach out to us through any channel below!
          </p>
        </div>

        <div className="contact-grid">
          
          {/* Left Column: Info Cards */}
          <div className="contact-info-cards">
            
            {/* Location Card */}
            <div className="glass-card contact-card">
              <div className="contact-card-icon">
                <MapPin size={20} style={{ color: 'var(--accent-magenta)' }} />
              </div>
              <div className="contact-card-content">
                <h3 className="contact-card-title">Our Location</h3>
                <p className="contact-card-detail">Indore, Madhya Pradesh, India</p>
                <span className="contact-card-sub">Service Area: Around MP</span>
              </div>
            </div>

            {/* Phone Card */}
            <div className="glass-card contact-card">
              <div className="contact-card-icon">
                <Phone size={20} style={{ color: 'var(--accent-magenta)' }} />
              </div>
              <div className="contact-card-content">
                <h3 className="contact-card-title">Phone Number</h3>
                <p className="contact-card-detail">+91 8085526131 , 9009994940</p>
                <span className="contact-card-sub">Mon–Sun: 9 AM – 9 PM</span>
              </div>
            </div>

            {/* Email Card */}
            <div className="glass-card contact-card">
              <div className="contact-card-icon">
                <Mail size={20} style={{ color: 'var(--accent-magenta)' }} />
              </div>
              <div className="contact-card-content">
                <h3 className="contact-card-title">Email Address</h3>
                <p className="contact-card-detail">djmontyevents@gmail.com</p>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="glass-card contact-card" style={{ cursor: 'pointer' }} onClick={() => window.open('https://wa.me/918085526131?text=Hello%20DJ%20Monty%20Events!%20I%20would%20like%20to%20inquire%20about%20your%20services%20and%20packages%20for%20an%20upcoming%20event.%20Please%20connect%20with%20me.', '_blank')}>
              <div className="contact-card-icon">
                <MessageCircle size={20} style={{ color: 'var(--accent-magenta)' }} />
              </div>
              <div className="contact-card-content">
                <h3 className="contact-card-title">WhatsApp</h3>
                <p className="contact-card-detail" style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>Chat on WhatsApp →</p>
                <span className="contact-card-sub">Quick responses guaranteed</span>
              </div>
            </div>

            {/* Follow Us Card */}
            <div className="glass-card contact-card">
              <div className="contact-card-icon">
                <Globe size={20} style={{ color: 'var(--accent-magenta)' }} />
              </div>
              <div className="contact-card-content" style={{ width: '100%' }}>
                <h3 className="contact-card-title">Follow Us</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                  <a href="https://www.facebook.com/p/Dj-Monty-100054425022610/" target="_blank" rel="noreferrer" className="social-link-item">
                    <Facebook size={16} /> Dj Monty
                  </a>
                  <a href="https://www.instagram.com/djmonty_events_indore?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="social-link-item">
                    <Instagram size={16} /> djmonty_events_indore
                  </a>
                  <a href="https://www.youtube.com/@djmontyvlogs" target="_blank" rel="noreferrer" className="social-link-item">
                    <Youtube size={16} /> Dj Monty Vlogs
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Message Form */}
          <div className="glass-card form-container">
            <h2 className="form-title">Send Us a Message</h2>
            <p className="form-subtitle">We typically respond within a few hours.</p>

            {success && (
              <div style={{
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#10b981',
                padding: '18px 24px',
                borderRadius: '12px',
                marginBottom: '30px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <CheckCircle size={22} style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '1rem', color: '#10b981' }}>Message Sent!</h4>
                  <p style={{ fontSize: '0.88rem', color: 'rgba(16, 185, 129, 0.85)', marginTop: '2px' }}>
                    Thank you! We have registered your inquiry and will reach out shortly.
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444',
                padding: '18px 24px',
                borderRadius: '12px',
                marginBottom: '30px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <AlertCircle size={22} style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '1rem', color: '#ef4444' }}>Submission Failed</h4>
                  <p style={{ fontSize: '0.88rem', color: 'rgba(239, 68, 68, 0.85)', marginTop: '2px' }}>{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-row-2">
                <div className="form-group-custom">
                  <label>YOUR NAME</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Full Name"
                  />
                </div>
                <div className="form-group-custom">
                  <label>PHONE</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div className="form-group-custom">
                <label>EMAIL</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group-custom">
                <label>SUBJECT / SERVICE</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '10px',
                    padding: '13px 16px',
                    color: 'var(--text-main)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.92rem',
                    transition: 'var(--transition-smooth)',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="" style={{ background: '#1a1728' }}>Select a Service</option>
                  <option value="Wedding Reception / Ceremony" style={{ background: '#1a1728' }}>Wedding Reception / Ceremony</option>
                  <option value="Sangeet & Mehndi Night" style={{ background: '#1a1728' }}>Sangeet & Mehndi Night</option>
                  <option value="Barat Procession & Dhol" style={{ background: '#1a1728' }}>Barat Procession & Dhol</option>
                  <option value="Haldi & Pool Party" style={{ background: '#1a1728' }}>Haldi & Pool Party</option>
                  <option value="Couple Entry / Ring Ceremony" style={{ background: '#1a1728' }}>Couple Entry / Ring Ceremony</option>
                  <option value="Club Night & Private Gig" style={{ background: '#1a1728' }}>Club Night & Private Gig</option>
                  <option value="Birthday Celebration" style={{ background: '#1a1728' }}>Birthday Celebration</option>
                  <option value="Corporate Show / Stage Set" style={{ background: '#1a1728' }}>Corporate Show / Stage Set</option>
                  <option value="Outdoor Festival / Concert" style={{ background: '#1a1728' }}>Outdoor Festival / Concert</option>
                  <option value="Other Occasion" style={{ background: '#1a1728' }}>Other Occasion</option>
                </select>
              </div>

              <div className="form-group-custom">
                <label>MESSAGE</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Write your message here..."
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary form-submit-btn">
                {loading ? 'SENDING...' : '📩 SEND MESSAGE'}
              </button>
            </form>
          </div>

        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 40px;
          align-items: start;
        }
        
        .contact-info-cards {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .contact-card {
          padding: 24px 28px;
          display: flex;
          gap: 20px;
          align-items: flex-start;
          border-radius: 16px;
        }
        
        .contact-card-icon {
          width: 46px;
          height: 46px;
          background: linear-gradient(135deg, rgba(106, 13, 173, 0.15), rgba(212, 175, 55, 0.12));
          border: 1px solid var(--glass-border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.1);
        }
        
        .contact-card-content {
          display: flex;
          flex-direction: column;
        }
        
        .contact-card-title {
          font-family: var(--font-title);
          font-size: 1rem;
          font-weight: 600;
          color: var(--accent-magenta);
          margin: 0 0 4px 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .contact-card-detail {
          font-size: 0.95rem;
          color: var(--text-main);
          margin: 0;
          line-height: 1.4;
        }
        
        .contact-card-sub {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 4px;
        }
        
        .social-link-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: var(--text-muted);
          transition: var(--transition-fast);
        }
        
        .social-link-item:hover {
          color: var(--accent-cyan);
          text-shadow: var(--text-glow);
          transform: translateX(3px);
        }
        
        /* Form container styling */
        .form-container {
          padding: 40px;
          border-radius: 20px;
        }
        
        .form-title {
          font-family: var(--font-title);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--text-main);
          margin: 0 0 6px 0;
        }
        
        .form-subtitle {
          font-size: 0.92rem;
          color: var(--text-muted);
          margin: 0 0 30px 0;
        }
        
        .form-group-custom {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .form-group-custom label {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--accent-magenta);
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }
        
        .form-group-custom input, .form-group-custom textarea {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 10px;
          padding: 13px 16px;
          color: var(--text-main);
          font-family: var(--font-body);
          font-size: 0.92rem;
          transition: var(--transition-smooth);
          outline: none;
        }
        
        .form-group-custom input:focus, .form-group-custom textarea:focus {
          border-color: var(--accent-magenta);
          background: rgba(212, 175, 55, 0.04);
          box-shadow: 0 0 8px rgba(212, 175, 55, 0.15);
        }
        
        .form-submit-btn {
          width: 100%;
          justify-content: center;
          padding: 15px;
          font-size: 0.95rem;
          letter-spacing: 1px;
          font-weight: 700;
          background: var(--accent-gradient);
          color: var(--bg-primary);
          border: none;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.25);
          cursor: pointer;
        }
        
        .form-submit-btn:hover {
          color: var(--bg-primary) !important;
          box-shadow: 0 8px 25px rgba(212, 175, 55, 0.45);
        }

        @media (max-width: 991px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }
        
        @media (max-width: 600px) {
          .form-row-2 {
            grid-template-columns: 1fr !important;
          }
          .form-container {
            padding: 30px 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default Services;
