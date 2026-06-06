import React, { useState } from 'react';
import { Camera, Music, Play, Layers } from 'lucide-react';

function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Barat', 'Wedding', 'Couple Entry', 'Backline', 'Vintage Car', 'Punjabi Dhol'];

  const galleryItems = [
    // Barat
    {
      id: 1,
      title: "Grand Barat Procession Sound",
      category: "Barat",
      desc: "High-power mobile sound truck system, customized high-energy playlists, and crowd coordination for active street dancing.",
      image: "/wedding_dj.png"
    },
    // Couple Entry
    {
      id: 2,
      title: "Sparkling Couple Entry Set",
      category: "Couple Entry",
      desc: "Choreographed cold spark pyrotechnics, atmospheric low-fog cloud machine, and synchronized spotlight entry patterns.",
      image: "/festival_stage.png"
    },
    // Backline
    {
      id: 3,
      title: "Pioneer CDJ Backline Setup",
      category: "Backline",
      desc: "Standard pro backline with Pioneer CDJ-3000 decks, DJM-V10 mixer, and high-fidelity stage monitors.",
      image: "/dj_deck_hero.jpg"
    },
    // Vintage Car
    {
      id: 4,
      title: "Royal Vintage Rolls Royce",
      category: "Vintage Car",
      desc: "Classic white vintage Rolls Royce car decorated beautifully for weddings and royal couple entry processions.",
      image: "/vintage_car_1.jpg"
    },
    {
      id: 14,
      title: "Luxury Vintage Red Convertible",
      category: "Vintage Car",
      desc: "Stunning vintage red convertible car on display for guest photo-ops and grand sangeet entrances.",
      image: "/vintage_car_2.jpg"
    },
    {
      id: 15,
      title: "Classic Red Car Hotel Entry",
      category: "Vintage Car",
      desc: "Elegant red vintage car styled for the groom's entry at premium hotel venues.",
      image: "/vintage_car_3.jpg"
    },
    {
      id: 16,
      title: "Elegant White Rolls Royce Parade",
      category: "Vintage Car",
      desc: "White vintage Rolls Royce ready for the royal baraat parade.",
      image: "/vintage_car_4.jpg"
    },
    // Punjabi Dhol
    {
      id: 5,
      title: "Live Punjabi Dhol Hype",
      category: "Punjabi Dhol",
      desc: "Traditional Punjabi Dhol beats combined live with electronic mashups and Bollywood Punjabi remixes on the mainstage.",
      image: "/festival_stage.png"
    },
    // Wedding - Mehndi
    {
      id: 6,
      title: "Vibrant Mehndi Celebration Beats",
      category: "Wedding",
      subcategory: "Mehndi",
      desc: "Low-tempo background acoustics, sitar recordings, and clear vocal microphones for family Mehndi rituals.",
      image: "/wedding_dj.png"
    },
    {
      id: 7,
      title: "Mehndi Sangeet DJ Dance Setup",
      category: "Wedding",
      subcategory: "Mehndi",
      desc: "Upbeat Punjabi and Bollywood music set up on a high-fidelity console with warm floral uplighting.",
      image: "/dj_deck_hero.jpg"
    },
    // Wedding - Haldi
    {
      id: 8,
      title: "Haldi Outdoor Pool Party Setup",
      category: "Wedding",
      subcategory: "Haldi",
      desc: "High-energy dhol mixes and tropical bass tracks for the fun outdoor yellow-themed Haldi celebration.",
      image: "/festival_stage.png"
    },
    {
      id: 9,
      title: "Haldi Traditional Dhol & Sound",
      category: "Wedding",
      subcategory: "Haldi",
      desc: "Dual active sound columns calibrated for outdoor speeches, surrounded by traditional percussion backing.",
      image: "/wedding_dj.png"
    },
    // Wedding - Sangeet
    {
      id: 10,
      title: "Mega Sangeet Stage Production",
      category: "Wedding",
      subcategory: "Sangeet",
      desc: "Stage monitors, LED background video wall sync, and intelligent dancefloor strobe lights for family dances.",
      image: "/festival_stage.png"
    },
    {
      id: 11,
      title: "High-Hype Bollywood Dance Battle",
      category: "Wedding",
      subcategory: "Sangeet",
      desc: "Custom high-tempo remixes, active MC interaction, and dynamic audio levels to boost stage confidence.",
      image: "/dj_deck_hero.jpg"
    },
    // Wedding - Shadi
    {
      id: 12,
      title: "Grand Varmala Pyrotechnics",
      category: "Wedding",
      subcategory: "Shadi",
      desc: "Cold spark firework launchers and heavy dry-ice fog machines during the sacred couple Varmala exchange.",
      image: "/festival_stage.png"
    },
    {
      id: 13,
      title: "Sacred Phere Audio Amplification",
      category: "Wedding",
      subcategory: "Shadi",
      desc: "Serene shehnai backdrop, soft ambient instrumental volume, and custom boundary mics for the temple fire rituals.",
      image: "/wedding_dj.png"
    }
  ];

  const filteredItems = activeFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div style={{ padding: '120px 0 80px 0' }}>
      <div className="container">
        {/* Header Block */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '15px', fontFamily: 'var(--font-title)' }}>
            Event <span className="text-gradient">Gallery</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
            Browse through snaps and video-logs of past weddings, sangeet choreographies, barats, and artist stage setups.
          </p>
          <p style={{
            color: 'var(--accent-purple)',
            fontStyle: 'italic',
            fontSize: '1.1rem',
            fontWeight: 600,
            marginTop: '15px',
            textShadow: '0 0 10px rgba(142, 45, 226, 0.3)'
          }}>
            "Celebrates Yours Precious Moment With Us"
          </p>
        </div>

        {/* Filter Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '50px'
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                padding: '10px 24px',
                borderRadius: '50px',
                fontFamily: 'var(--font-title)',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
                background: activeFilter === cat ? 'var(--accent-gradient)' : 'rgba(255, 255, 255, 0.03)',
                border: activeFilter === cat ? 'none' : '1px solid var(--glass-border)',
                color: activeFilter === cat ? '#fff' : 'var(--text-main)',
                boxShadow: activeFilter === cat ? '0 5px 15px rgba(142, 45, 226, 0.3)' : 'none'
              }}
              className="filter-btn"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {filteredItems.map(item => {
            const isVintageCar = item.category === 'Vintage Car';
            
            if (isVintageCar) {
              return (
                <div key={item.id} style={{
                  overflow: 'hidden',
                  borderRadius: '20px',
                  position: 'relative',
                  border: '1px solid var(--glass-border)',
                  background: 'var(--glass-bg)',
                  boxShadow: 'var(--glass-shadow)',
                  height: 'fit-content'
                }}>
                  {/* Image */}
                  <img 
                    src={item.image} 
                    alt={item.title || "Vintage Car"} 
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                  />
                </div>
              );
            }

            return (
              <div key={item.id} className="glass-card gallery-item" style={{
                overflow: 'hidden',
                borderRadius: '20px',
                aspectRatio: '16/9',
                position: 'relative',
                cursor: 'default'
              }}>
                {/* Image */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="gallery-img"
                />
                
                {/* Dark Overlay gradient */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to top, rgba(8, 6, 18, 0.95) 0%, rgba(8, 6, 18, 0.4) 50%, rgba(8, 6, 18, 0.1) 100%)',
                  zIndex: 1
                }}></div>

                {/* Badges / Floating Info */}
                <span className="badge" style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(8, 6, 18, 0.75)',
                  backdropFilter: 'var(--glass-blur)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--accent-cyan)',
                  zIndex: 2
                }}>
                  {item.subcategory ? `${item.category} / ${item.subcategory}` : item.category}
                </span>

                {/* Details Overlay (animated from bottom) */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '20px 20px',
                  zIndex: 2,
                  transform: 'translateY(10px)',
                  transition: 'var(--transition-smooth)'
                }} className="gallery-details">
                  <h3 style={{
                    color: '#fff',
                    fontSize: '1.2rem',
                    fontFamily: 'var(--font-title)',
                    marginBottom: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Camera size={18} className="glow-cyan" style={{ color: 'var(--accent-cyan)' }} />
                    {item.title}
                  </h3>
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.82rem',
                    lineHeight: 1.4,
                    opacity: 0.9
                  }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .filter-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }
        .sub-filter-btn:hover {
          color: var(--text-main) !important;
        }
        .gallery-item:hover .gallery-img {
          transform: scale(1.08);
        }
        .gallery-item:hover .gallery-details {
          transform: translateY(0) !important;
        }
        .gallery-item:hover {
          border-color: var(--glass-border-hover);
          box-shadow: 0 8px 30px rgba(0, 240, 255, 0.15);
        }
      `}</style>
    </div>
  );
}

export default Gallery;
