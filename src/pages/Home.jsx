import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Award, Star, Volume2, ArrowRight, ShieldCheck, Calendar, MessageSquare, Phone } from 'lucide-react';

function AnimatedCounter({ start = 0, target, duration = 1800, isDecimal = false }) {
  const [count, setCount] = useState(start);
  const elementRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = start + progress * (target - start);
      setCount(currentValue);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, start, target, duration]);

  return (
    <span ref={elementRef}>
      {isDecimal ? count.toFixed(1) : Math.floor(count)}
    </span>
  );
}

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#about-us') {
      const element = document.getElementById('about-us');
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [location]);
  const features = [
    {
      icon: Volume2,
      title: "Concert-Grade Sound",
      desc: "Premium, high-fidelity sound rigs (QSC, L-Acoustics) calibrated for rich bass and crystal-clear vocals in any venue size.",
      color: "var(--accent-cyan)",
      image: "/wedding_dj.png",
      filter: "Backline"
    },
    {
      icon: Sparkles,
      title: "DMX Intelligent Lights",
      desc: "Choreographed dancefloor moving heads, washes, lasers, and vertical fog machines synced directly with the beats.",
      color: "var(--accent-magenta)",
      image: "/festival_stage.png",
      filter: "Couple Entry"
    },
    {
      icon: Award,
      title: "Live Mixing & Mashups",
      desc: "No pre-recorded playlists. Live vinyl mixing, transitions, and multi-genre sets customized to current crowd energy.",
      color: "var(--accent-purple)",
      image: "/live_mixing_feature.jpg",
      objectPosition: "right center",
      filter: "Barat"
    }
  ];

  const testimonials = [
    {
      name: "Shubham Solanki",
      role: "Verified Client",
      quote: "Very nice bombastic sound charges are fine . Nice behaviour of dj",
      rating: 5
    },
    {
      name: "Abhishek Patil",
      role: "Verified Client",
      quote: "Experienced boys in team.. they all have a nice sense of humour to play music among the situation.. although nice experience with DJ MONTY N ITS TEAM..",
      rating: 5
    },
    {
      name: "Kunal Chouhan",
      role: "Verified Client",
      quote: "Sound quality is bestest .. thank you sir. For your best services ..and make our party sucessfull❤️",
      rating: 5
    },
    {
      name: "Rohit Parmar",
      role: "Verified Client",
      quote: "Good work and team also professional",
      rating: 5
    },
    {
      name: "Nitesh Puri",
      role: "Verified Client",
      quote: "Excellent sound service and great work by teams happy to their services",
      rating: 5
    }
  ];

  return (
    <div style={{ paddingBottom: '0px' }}>
      {/* Hero Section */}
      <section style={{
        padding: '120px 0 80px 0',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-primary)'
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '50px',
          alignItems: 'center'
        }}>
          {/* Left Text Column */}
          <div className="hero-text-column" style={{ zIndex: 2 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '50px',
              background: 'rgba(255, 0, 127, 0.1)',
              border: '1px solid rgba(255, 0, 127, 0.2)',
              marginBottom: '20px',
              color: 'var(--accent-magenta)',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }} className="tagline-badge">
              <Sparkles size={14} />
              Celebrates Yours Precious Moment With Us
            </div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 1.1,
              marginBottom: '20px',
              fontFamily: 'var(--font-title)'
            }}>
              Make Your Celebrations Unforgettable <span className="text-gradient">with Dj Monty Events</span>
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-muted)',
              marginBottom: '35px',
              lineHeight: 1.7,
              maxWidth: '540px'
            }}>
              Professional concert-grade audio, automated DMX club lighting, and custom-tailored live sets designed to turn your wedding, club gig, or corporate celebration into an unforgettable party.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/services" className="btn-primary">
                Book Dj Monty Events <ArrowRight size={18} />
              </Link>
              <Link to="/gallery" className="btn-secondary">
                View Past Events
              </Link>
            </div>
          </div>

          {/* Right Visual Column */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              position: 'absolute',
              width: '120%',
              height: '120%',
              background: 'radial-gradient(circle, rgba(142, 45, 226, 0.18) 0%, rgba(0, 240, 255, 0.05) 40%, transparent 70%)',
              top: '-10%',
              right: '-10%',
              zIndex: 0,
              pointerEvents: 'none'
            }}></div>

            <div className="hero-image-wrapper animate-float">
              {/* Background Accent Frame */}
              <div className="hero-image-bg-frame"></div>

              {/* Foreground Card */}
              <div className="hero-image-card">
                <div className="hero-image-img-container">
                  <img
                    src="/dj_deck_hero.jpg"
                    alt="DJ Mixing Table Setup"
                    className="hero-image-img"
                  />
                </div>

                {/* Active Booking status tag inside the card */}
                <div style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                  background: 'var(--navbar-bg)',
                  backdropFilter: 'var(--glass-blur)',
                  border: '1px solid var(--glass-border)',
                  padding: '16px 20px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                  zIndex: 3
                }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>Active Booking Status</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Booking for 2026</p>
                  </div>
                  <span className="badge badge-confirmed" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <span 
                      className="status-pulse-dot"
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#10b981',
                        display: 'inline-block',
                        boxShadow: '0 0 8px #10b981'
                      }}
                    ></span>
                    Online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Services summary / Features section */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)', paddingBottom: '30px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Why Dj Monty Events?</span>
            <h2 style={{ fontSize: '2.5rem', marginTop: '10px', fontFamily: 'var(--font-title)' }}>Unmatched Event Production Quality</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '15px auto 0 auto' }}>
              We bring the club-standard equipment, energy, and professionalism straight to your venue. No shortcuts.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {features.map((feat, index) => {
              const IconComponent = feat.icon;
              return (
                <Link 
                  key={index} 
                  to="/gallery" 
                  state={{ filter: feat.filter }}
                  className="glass-card" 
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                >
                  {/* Card Image Header */}
                  <div style={{
                    width: '100%',
                    aspectRatio: '16/10',
                    overflow: 'hidden',
                    position: 'relative',
                    borderBottom: '1px solid var(--glass-border)'
                  }}>
                    <img 
                      src={feat.image} 
                      alt={feat.title} 
                      className="feature-card-img"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: feat.objectPosition || 'center',
                        display: 'block',
                        transition: 'transform 0.4s ease'
                      }}
                    />
                  </div>
                  
                  {/* Card Content Body */}
                  <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '16px', flexGrow: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        background: `rgba(255, 255, 255, 0.02)`,
                        border: `1px solid rgba(255, 255, 255, 0.08)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 0 15px ${feat.color}22`
                      }}>
                        <IconComponent size={20} style={{ color: feat.color }} />
                      </div>
                      <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontFamily: 'var(--font-title)', margin: 0 }}>{feat.title}</h3>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>{feat.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why We're Trusted / Our Numbers section */}
      <section className="section-padding animate-fade-up" style={{
        background: 'var(--bg-primary)',
        position: 'relative',
        zIndex: 2
      }}>
        <div className="container">
          {/* Header area matching the mockup */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ 
              fontSize: '3rem', 
              fontFamily: 'var(--font-title)', 
              color: 'var(--text-main)',
              fontWeight: 700,
              margin: '0 auto 15px auto',
              position: 'relative',
              display: 'inline-block'
            }}>
              Why We're <span style={{ color: 'var(--accent-cyan)' }}>Trusted</span>
              {/* Subtle gold line under "Trusted" */}
              <div style={{
                width: '60px',
                height: '2px',
                background: 'var(--accent-cyan)',
                margin: '12px auto 0 auto',
                borderRadius: '2px'
              }}></div>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            marginTop: '40px'
          }}>
            {/* Card 1 */}
            <div className="glass-card" style={{
              padding: '45px 30px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              borderRadius: '20px',
              border: '1px solid rgba(212, 175, 55, 0.15)',
              background: 'rgba(26, 23, 40, 0.6)'
            }}>
              <h3 style={{ 
                fontSize: '3.2rem', 
                color: 'var(--accent-cyan)', 
                fontFamily: 'var(--font-title)', 
                fontWeight: 700,
                margin: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'baseline'
              }}>
                <AnimatedCounter start={3500} target={4000} />+
              </h3>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 600, margin: '5px 0' }}>
                Events Managed
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                Successfully planned and executed over 4,000 events across India.
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass-card" style={{
              padding: '45px 30px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              borderRadius: '20px',
              border: '1px solid rgba(212, 175, 55, 0.15)',
              background: 'rgba(26, 23, 40, 0.6)'
            }}>
              <h3 style={{ 
                fontSize: '3.2rem', 
                color: 'var(--accent-cyan)', 
                fontFamily: 'var(--font-title)', 
                fontWeight: 700,
                margin: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'baseline'
              }}>
                <AnimatedCounter start={70} target={98} />%
              </h3>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 600, margin: '5px 0' }}>
                Client Satisfaction
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                98% of our clients recommend us to their friends and family.
              </p>
            </div>

            {/* Card 3 */}
            <div className="glass-card" style={{
              padding: '45px 30px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              borderRadius: '20px',
              border: '1px solid rgba(212, 175, 55, 0.15)',
              background: 'rgba(26, 23, 40, 0.6)'
            }}>
              <h3 style={{ 
                fontSize: '3.2rem', 
                color: 'var(--accent-cyan)', 
                fontFamily: 'var(--font-title)', 
                fontWeight: 700,
                margin: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'baseline'
              }}>
                <AnimatedCounter start={0} target={13} />+
              </h3>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 600, margin: '5px 0' }}>
                Years Experience
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                Over 13 years of expertise in luxury event management and decoration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gallery / Our Work Section */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-magenta)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>OUR WORK</span>
              <h2 style={{ fontSize: '3rem', marginTop: '10px', fontFamily: 'var(--font-title)', color: 'var(--text-main)' }}>
                Event <span style={{ fontStyle: 'italic', color: '#BFA2DB', fontFamily: 'Georgia, serif' }}>Gallery</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '10px', maxWidth: '600px' }}>
                A glimpse into the magical celebrations we've crafted across India.
              </p>
            </div>
            
            <Link to="/gallery" className="btn-secondary" style={{
              borderRadius: '50px',
              padding: '12px 28px',
              fontSize: '0.85rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              VIEW FULL GALLERY <ArrowRight size={15} />
            </Link>
          </div>

          <div className="home-gallery-grid">
            {/* Gallery Item 1 (Tall - Spans 2 Rows) */}
            <div className="home-gallery-card glass-card grid-span-tall" style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'default'
            }}>
              <img 
                src="/gallery_wedding.png" 
                alt="Grand Wedding Couple" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease'
                }}
                className="gallery-card-img"
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(18, 16, 26, 0.9) 0%, rgba(18, 16, 26, 0.2) 60%, transparent 100%)',
                zIndex: 1
              }}></div>
              <div className="home-gallery-desc">
                <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--accent-cyan)', letterSpacing: '2px', display: 'block', marginBottom: '6px' }}>WEDDING</span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0, fontFamily: 'var(--font-title)' }}>Grand Wedding Ceremony</h3>
              </div>
            </div>

            {/* Gallery Item 2 (Wide - Spans 2 Columns) */}
            <div className="home-gallery-card glass-card grid-span-wide" style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'default'
            }}>
              <img 
                src="/gallery_reception.png" 
                alt="Luxury Banquet Hall" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease'
                }}
                className="gallery-card-img"
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(18, 16, 26, 0.9) 0%, rgba(18, 16, 26, 0.2) 60%, transparent 100%)',
                zIndex: 1
              }}></div>
              <div className="home-gallery-desc">
                <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--accent-cyan)', letterSpacing: '2px', display: 'block', marginBottom: '6px' }}>RECEPTION</span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0, fontFamily: 'var(--font-title)' }}>Luxury Banquet Hall</h3>
              </div>
            </div>

            {/* Gallery Item 3 (Standard) */}
            <div className="home-gallery-card glass-card" style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'default'
            }}>
              <img 
                src="/gallery_concert.png" 
                alt="Concert Mainstage" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease'
                }}
                className="gallery-card-img"
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(18, 16, 26, 0.9) 0%, rgba(18, 16, 26, 0.2) 60%, transparent 100%)',
                zIndex: 1
              }}></div>
              <div className="home-gallery-desc">
                <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--accent-cyan)', letterSpacing: '2px', display: 'block', marginBottom: '6px' }}>LIVE CONCERT</span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0, fontFamily: 'var(--font-title)' }}>High Energy Concert Crowd</h3>
              </div>
            </div>

            {/* Gallery Item 4 (Standard) */}
            <div className="home-gallery-card glass-card" style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'default'
            }}>
              <img 
                src="/live_mixing_feature.jpg" 
                alt="DJ Sound & Production" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease'
                }}
                className="gallery-card-img"
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(18, 16, 26, 0.9) 0%, rgba(18, 16, 26, 0.2) 60%, transparent 100%)',
                zIndex: 1
              }}></div>
              <div className="home-gallery-desc">
                <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--accent-cyan)', letterSpacing: '2px', display: 'block', marginBottom: '6px' }}>SOUND PRODUCTION</span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0, fontFamily: 'var(--font-title)' }}>Concert Grade Audio</h3>
              </div>
            </div>

            {/* Gallery Item 5 (Wide - Spans 2 Columns) */}
            <div className="home-gallery-card glass-card grid-span-wide" style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'default'
            }}>
              <img 
                src="/dj_deck_hero.jpg" 
                alt="Pioneer Stage Setup" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease'
                }}
                className="gallery-card-img"
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(18, 16, 26, 0.9) 0%, rgba(18, 16, 26, 0.2) 60%, transparent 100%)',
                zIndex: 1
              }}></div>
              <div className="home-gallery-desc">
                <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--accent-cyan)', letterSpacing: '2px', display: 'block', marginBottom: '6px' }}>BACKSTAGE</span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0, fontFamily: 'var(--font-title)' }}>Pioneer DJ Console Setup</h3>
              </div>
            </div>

            {/* Gallery Item 6 (Tall - Spans 2 Rows) */}
            <div className="home-gallery-card glass-card grid-span-tall" style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'default'
            }}>
              <img 
                src="/wedding_dj.png" 
                alt="Mobile Sound System" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease'
                }}
                className="gallery-card-img"
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(18, 16, 26, 0.9) 0%, rgba(18, 16, 26, 0.2) 60%, transparent 100%)',
                zIndex: 1
              }}></div>
              <div className="home-gallery-desc">
                <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--accent-cyan)', letterSpacing: '2px', display: 'block', marginBottom: '6px' }}>BARAT</span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0, fontFamily: 'var(--font-title)' }}>Mobile Audio Procession</h3>
              </div>
            </div>

            {/* Gallery Item 7 (Standard) */}
            <div className="home-gallery-card glass-card" style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'default'
            }}>
              <img 
                src="/festival_stage.png" 
                alt="Outdoor Stage Hype" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease'
                }}
                className="gallery-card-img"
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(18, 16, 26, 0.9) 0%, rgba(18, 16, 26, 0.2) 60%, transparent 100%)',
                zIndex: 1
              }}></div>
              <div className="home-gallery-desc">
                <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--accent-cyan)', letterSpacing: '2px', display: 'block', marginBottom: '6px' }}>OUTDOOR EVENT</span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0, fontFamily: 'var(--font-title)' }}>Haldi Stage & Sound Setup</h3>
              </div>
            </div>

            {/* Gallery Item 8 (Standard) */}
            <div className="home-gallery-card glass-card" style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'default'
            }}>
              <img 
                src="/gallery_concert.png" 
                alt="Dynamic Lights & Confetti" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease'
                }}
                className="gallery-card-img"
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(18, 16, 26, 0.9) 0%, rgba(18, 16, 26, 0.2) 60%, transparent 100%)',
                zIndex: 1
              }}></div>
              <div className="home-gallery-desc">
                <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--accent-cyan)', letterSpacing: '2px', display: 'block', marginBottom: '6px' }}>STAGELIGHTS</span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0, fontFamily: 'var(--font-title)' }}>DMX Intelligent Lasers</h3>
              </div>
            </div>
          </div>
        </div>
        
        <style>{`
          .home-gallery-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 240px;
            gap: 20px;
          }
          @media (max-width: 992px) {
            .home-gallery-grid {
              grid-template-columns: repeat(2, 1fr);
              grid-auto-rows: 220px;
            }
          }
          @media (max-width: 576px) {
            .home-gallery-grid {
              grid-template-columns: 1fr;
              grid-auto-rows: 200px;
            }
          }
          .grid-span-tall {
            grid-row: span 2;
          }
          .grid-span-wide {
            grid-column: span 2;
          }
          @media (max-width: 992px) {
            .grid-span-wide {
              grid-column: span 1;
            }
          }
          @media (max-width: 576px) {
            .grid-span-tall {
              grid-row: span 1 !important;
            }
            .grid-span-wide {
              grid-column: span 1 !important;
            }
          }
          .home-gallery-card:hover .gallery-card-img {
            transform: scale(1.08);
          }
          .home-gallery-card .home-gallery-desc {
            position: absolute;
            bottom: 24px;
            left: 24px;
            right: 24px;
            zIndex: 2;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.4s ease;
          }
          .home-gallery-card:hover .home-gallery-desc {
            opacity: 1;
            transform: translateY(0);
          }
        `}</style>
      </section>

      {/* Booking CTA Section */}
      <section className="section-padding" style={{
        background: 'var(--bg-primary)',
        textAlign: 'center',
        position: 'relative',
        padding: '100px 0'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          
          {/* Badge */}
          <span style={{
            display: 'inline-block',
            fontSize: '0.72rem',
            fontWeight: 600,
            color: 'var(--accent-magenta)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '24px',
            padding: '6px 18px',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '20px',
            background: 'rgba(212, 175, 55, 0.05)'
          }}>
            READY TO BEGIN?
          </span>

          <h2 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: 'var(--text-main)',
            lineHeight: 1.2,
            marginBottom: '20px',
            fontFamily: 'var(--font-title)'
          }}>
            Let's Create Your<br />
            <span style={{
              fontStyle: 'italic',
              fontWeight: '400',
              color: '#BFA2DB', /* Lavender color from comfy-wisp */
              fontFamily: 'Georgia, serif',
              textShadow: '0 0 20px rgba(106, 13, 173, 0.3)'
            }}>Dream Celebration</span>
          </h2>

          <p style={{
            color: 'var(--text-muted)',
            maxWidth: '600px',
            margin: '0 auto 40px auto',
            fontSize: '1rem',
            lineHeight: 1.8
          }}>
            Contact us today and let our expert team bring your vision to life with luxury, elegance, and perfection.
          </p>

          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {/* Book Your Event Button */}
            <Link to="/services" className="btn-primary" style={{
              borderRadius: '50px',
              padding: '14px 32px',
              fontSize: '0.88rem',
              fontWeight: 600,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              boxShadow: '0 8px 25px rgba(212,175,55,0.3)',
              textDecoration: 'none'
            }}>
              <Calendar size={16} /> Book Your Event
            </Link>

            {/* Talk To Us Button */}
            <a
              href="https://wa.me/918085526131?text=Hello%20DJ%20Monty%20Events!%20I%20would%20like%20to%20inquire%20about%20your%20services%20and%20packages%20for%20an%20upcoming%20event.%20Please%20connect%20with%20me."
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{
                borderRadius: '50px',
                padding: '14px 32px',
                fontSize: '0.88rem',
                fontWeight: 600,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                textDecoration: 'none'
              }}
            >
              <MessageSquare size={16} /> Talk To Us
            </a>

            {/* Call Now Button */}
            <a
              href="tel:+918085526131"
              className="call-now-btn-hover"
              style={{ textDecoration: 'none' }}
            >
              <Phone size={16} /> Call Now
            </a>
          </div>
        </div>
        
        <style>{`
          .call-now-btn-hover {
            border: 2px solid var(--accent-magenta) !important;
            color: var(--accent-magenta) !important;
            border-radius: 50px;
            padding: 13px 31px;
            font-size: 0.88rem;
            font-weight: 600;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: transparent;
            transition: var(--transition-smooth);
            cursor: pointer;
          }
          .call-now-btn-hover:hover {
            background: var(--accent-magenta) !important;
            color: var(--bg-primary) !important;
            box-shadow: 0 8px 25px rgba(212, 175, 55, 0.35);
            transform: translateY(-2px);
          }
        `}</style>
      </section>

      {/* Testimonials section */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--accent-magenta)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Reviews</span>
            <h2 style={{ fontSize: '2.5rem', marginTop: '10px', fontFamily: 'var(--font-title)' }}>Loved By Party Hosts Everywhere</h2>
            
            {/* Google Rating Summary badge */}
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '12px', 
              marginTop: '15px', 
              padding: '8px 18px', 
              background: 'rgba(255, 255, 255, 0.02)', 
              border: '1px solid var(--glass-border)',
              borderRadius: '30px'
            }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>4.9</span>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="var(--accent-cyan)" color="var(--accent-cyan)" />
                ))}
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>based on Google Reviews</span>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {testimonials.map((test, index) => (
              <div key={index} className="glass-card" style={{
                padding: '35px 30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '24px'
              }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '5px' }}>
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--accent-cyan)" color="var(--accent-cyan)" />
                  ))}
                </div>
                <p style={{ fontStyle: 'italic', color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  "{test.quote}"
                </p>
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: 600 }}>{test.name}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{test.role}</p>
                  </div>
                  <ShieldCheck size={18} style={{ color: 'var(--accent-cyan)' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Review CTA Buttons */}
          <div style={{ textAlign: 'center', marginTop: '50px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <a 
              href="https://share.google/K5CAcc2FM6LSnATZK" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary" 
              style={{ 
                borderRadius: '50px',
                padding: '14px 32px',
                fontSize: '0.88rem',
                fontWeight: 600,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                boxShadow: '0 8px 25px rgba(212,175,55,0.3)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Star size={16} fill="currentColor" /> Write a Google Review
            </a>
            <a 
              href="https://share.google/K5CAcc2FM6LSnATZK" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary" 
              style={{ 
                borderRadius: '50px',
                padding: '14px 32px',
                fontSize: '0.88rem',
                fontWeight: 600,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              View Google Business Page
            </a>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="section-padding" style={{
        position: 'relative',
        scrollMarginTop: '80px',
        background: 'var(--bg-primary)'
      }}>
        <div className="container">
          {/* Main Intro Cover Description (Full Width) */}
          <div style={{ maxWidth: '900px', margin: '0 0 60px 0', textAlign: 'left' }}>
            <h2 style={{
              fontSize: '2.8rem',
              marginBottom: '24px',
              fontFamily: 'var(--font-title)'
            }} className="text-gradient">
              About Us
            </h2>
            <h3 style={{
              fontSize: '1.45rem',
              lineHeight: 1.5,
              color: 'var(--text-main)',
              fontFamily: 'var(--font-title)',
              fontWeight: 600,
              marginBottom: '20px'
            }}>
              Since 2013, we have been proudly providing professional DJ and event entertainment services in Indore and nearby regions. With over 4,000+ successful events completed, we have built a strong reputation for delivering high-energy music, quality sound, and unforgettable experiences.
            </h3>
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7
            }}>
              Whether it’s weddings, corporate events, birthdays, private parties, or live shows, our goal is to make every event memorable with professional service and exceptional entertainment.
            </p>
          </div>

          {/* Team Profile Rows (Photos Left, Details Right) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', marginTop: '40px' }}>
            {/* DJ Monty Profile */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '45px',
              alignItems: 'center'
            }}>
              {/* Left Photo */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  width: '100%',
                  maxWidth: '320px',
                  aspectRatio: '4/5',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '2px solid var(--glass-border)',
                  padding: '4px',
                  background: 'rgba(255, 255, 255, 0.02)'
                }}>
                  <img
                    src="/dj_monty_profile.jpg"
                    alt="DJ Monty Profile"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      border: '1px solid var(--glass-border)',
                      display: 'block'
                    }}
                  />
                </div>
              </div>
              {/* Right Details */}
              <div>
                <h3 style={{ fontSize: '2rem', marginBottom: '15px', fontFamily: 'var(--font-title)', color: 'var(--text-main)' }}>
                  DJ Monty
                </h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.98rem' }}>
                  Founder and Lead DJ. With over 13 years of mixing experience across leading clubs and private galas, DJ Monty has mastered the art of reading the crowd and tailoring the perfect energy levels. He specializes in designing customized wedding sets, festival sound dynamics, and smooth acoustic transitions.
                </p>
              </div>
            </div>

            {/* DJ OnBeatBanty Profile */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '45px',
              alignItems: 'center'
            }}>
              {/* Left Photo */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  width: '100%',
                  maxWidth: '320px',
                  aspectRatio: '4/5',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '2px solid var(--glass-border)',
                  padding: '4px',
                  background: 'rgba(255, 255, 255, 0.02)'
                }}>
                  <img
                    src="/dj_banty_profile.jpg"
                    alt="DJ OnBeatBanty Profile"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      border: '1px solid var(--glass-border)',
                      display: 'block'
                    }}
                  />
                </div>
              </div>
              {/* Right Details */}
              <div>
                <h3 style={{ fontSize: '2rem', marginBottom: '8px', fontFamily: 'var(--font-title)', color: 'var(--text-main)' }}>
                  DJ OnBeatBanty
                </h3>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Behind the deck
                </h4>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.98rem' }}>
                  Co-artist and remix designer. Banty is known for creating unmatched live sets featuring fresh Bollywood remixes, Punjabi beats, and Commercial EDM mashups. Combining rhythm mixing with a deep understanding of lighting production, Banty coordinates our DMX laser grids to deliver a fully integrated party vibe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tagline Banner Section */}
      <section style={{
        background: 'var(--bg-primary)',
        padding: '35px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <h2 style={{
            fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
            fontWeight: 600,
            fontStyle: 'italic',
            fontFamily: 'var(--font-title)',
            margin: 0,
            background: 'linear-gradient(45deg, var(--accent-cyan), var(--accent-magenta), var(--accent-purple))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.02em',
            textShadow: '0 0 30px rgba(0, 240, 255, 0.15)'
          }}>
            "Celebrates Yours Precious Moment With Us"
          </h2>
        </div>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '250px',
          height: '50px',
          background: 'radial-gradient(circle, rgba(255, 0, 127, 0.1) 0%, transparent 80%)',
          pointerEvents: 'none',
          filter: 'blur(8px)'
        }}></div>
      </section>
    </div>
  );
}

export default Home;
