import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Camera, Music, Play, Layers } from 'lucide-react';

function Gallery() {
  const location = useLocation();
  const initialFilter = location.state?.filter || 'All';
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  React.useEffect(() => {
    if (location.state?.filter) {
      setActiveFilter(location.state.filter);
    }
  }, [location.state]);

  const categories = ['All', 'Barat', 'Wedding', 'Couple Entry', 'Backline', 'Vintage Car', 'Punjabi Dhol'];

  const galleryItems = [
    // Barat
    {
      id: 1,
      title: "Aman Ki Barat Mobile Stage",
      category: "Barat",
      desc: "High-power sound system truck for Aman Ki Barat.",
      image: "/barat_1.jpg"
    },
    {
      id: 17,
      title: "DJ Monty Live Barat Dhol",
      category: "Barat",
      desc: "Live Dhol players performing alongside the DJ Monty sound truck.",
      image: "/barat_2.jpg"
    },
    {
      id: 18,
      title: "Barat Mobile Sound Setup",
      category: "Barat",
      desc: "Mobile sound stage set up for grand baraat processions.",
      image: "/barat_3.jpg"
    },
    {
      id: 19,
      title: "Traditional Dhol Group Performance",
      category: "Barat",
      desc: "Live traditional dhol drummers leading the groom's procession.",
      image: "/barat_4.jpg"
    },
    {
      id: 20,
      title: "Anant Ki Barat Grand Setup",
      category: "Barat",
      desc: "Beautifully decorated Anant Ki Barat mobile sound console and dhol procession.",
      image: "/barat_5.jpg"
    },
    {
      id: 21,
      title: "Bass Rani DJ Monty Sound",
      category: "Barat",
      desc: "Bass Rani truck with sound and lights setup ready for a grand Baraat procession.",
      image: "/barat_6.jpg"
    },
    // Couple Entry
    {
      id: 2,
      title: "Vows and Walkway Entry Decoration",
      category: "Couple Entry",
      desc: "Floral walk path decorated with marriage vows banners for couple entry.",
      image: "/couple_entry_1.jpg"
    },
    {
      id: 22,
      title: "Purple Balloon Arch Pathway",
      category: "Couple Entry",
      desc: "Stunning pathway lined with purple and white balloon arches for guest and couple entry.",
      image: "/couple_entry_2.jpg"
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
    // Wedding
    {
      id: 6,
      title: "Haldi Outdoor Stage Decoration",
      category: "Wedding",
      desc: "Beautiful yellow theme floral stage setup for outdoor Haldi ceremony.",
      image: "/wedding_1.jpg"
    },
    {
      id: 7,
      title: "Traditional Haldi Backdrop",
      category: "Wedding",
      desc: "Warm drapery decoration with marigold and floral hangings for Haldi ceremony.",
      image: "/wedding_2.jpg"
    },
    {
      id: 8,
      title: "Grand Flower Arch Wedding Stage",
      category: "Wedding",
      desc: "Splendid wedding stage decorated with a massive arch of yellow flowers and royal seatings.",
      image: "/wedding_3.jpg"
    },
    {
      id: 9,
      title: "Elegant Outdoor Guest Seating",
      category: "Wedding",
      desc: "Haldi stage seating arrangement with marigold curtains.",
      image: "/wedding_4.jpg"
    },
    {
      id: 10,
      title: "Couple Haldi Ceremony Stage",
      category: "Wedding",
      desc: "Joyful Haldi ceremony setup with couple seating and traditional decoration elements.",
      image: "/wedding_5.jpg"
    },
    {
      id: 23,
      title: "Rooftop Haldi Ceremony Setup",
      category: "Wedding",
      desc: "Vibrant rooftop Haldi setup featuring yellow themed seating pods and cartoon graphics.",
      image: "/wedding_6.jpg"
    },
    {
      id: 24,
      title: "Outdoor DJ Monty Sound Stack",
      category: "Wedding",
      desc: "DJ Monty speaker stacks with floral drape frames for outdoor wedding events.",
      image: "/wedding_7.jpg"
    },
    {
      id: 25,
      title: "Haldi Event DJ Deck Console",
      category: "Wedding",
      desc: "Compact DJ mixer and laptop deck setup ready for playing energetic Haldi beats.",
      image: "/wedding_8.jpg"
    },
    {
      id: 26,
      title: "Couple Portrait at Haldi Stage",
      category: "Wedding",
      desc: "Groom and bride seated at the beautifully lit rooftop Haldi stage.",
      image: "/wedding_9.jpg"
    },
    {
      id: 27,
      title: "Rooftop Lotus Seating Stage View",
      category: "Wedding",
      desc: "Wide shot of the rooftop Haldi setup showcasing the full seating layout.",
      image: "/wedding_10.jpg"
    },
    {
      id: 28,
      title: "DJ Monty Live Stage Production",
      category: "Wedding",
      desc: "Massive wedding stage setup featuring a large LED wall display and guest seating.",
      image: "/wedding_11.jpg"
    },
    {
      id: 29,
      title: "Indoor Banquet Reception Stage",
      category: "Wedding",
      desc: "Elegant banquet reception stage decorated with pink flowers and balloon arches.",
      image: "/wedding_12.jpg"
    },
    {
      id: 30,
      title: "Striped Dance Floor & Floral Stage",
      category: "Wedding",
      desc: "Vibrant custom striped dance floor placed in front of a flower arch stage backdrop.",
      image: "/wedding_13.jpg"
    },
    {
      id: 31,
      title: "Luxury Gold Chandeliers Banquet",
      category: "Wedding",
      desc: "Luxury indoor wedding banquet setup featuring high-end gold paneling and chandeliers.",
      image: "/wedding_14.jpg"
    },
    {
      id: 32,
      title: "Vines & Disco Balls Stage Decor",
      category: "Wedding",
      desc: "Stunning stage setting decorated with green leaves and hanging disco balls.",
      image: "/wedding_15.jpg"
    },
    {
      id: 33,
      title: "Outdoor Concert Seating & Truss Stage",
      category: "Wedding",
      desc: "Wide outdoor lawn layout with seating facing a massive truss concert stage.",
      image: "/wedding_16.jpg"
    },
    {
      id: 34,
      title: "Traditional Mehndi Curtain Backdrop",
      category: "Wedding",
      desc: "Traditional Mehndi stage decoration with hanging kites and marigolds.",
      image: "/wedding_17.jpg"
    },
    {
      id: 35,
      title: "Zig-Zag Dance Floor Reception Setup",
      category: "Wedding",
      desc: "Monochrome zig-zag dance floor setup under dynamic stage lights and hanging greens.",
      image: "/wedding_18.jpg"
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

        {/* Gallery Masonry Grid */}
        <div className="gallery-masonry">
          {filteredItems.map(item => (
            <div key={item.id} className="gallery-masonry-item">
              <img 
                src={item.image} 
                alt={item.title || "Event Gallery Photo"} 
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .filter-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }
        .gallery-masonry {
          column-count: 3;
          column-gap: 30px;
          width: 100%;
        }
        @media (max-width: 992px) {
          .gallery-masonry {
            column-count: 2;
          }
        }
        @media (max-width: 576px) {
          .gallery-masonry {
            column-count: 1;
            column-gap: 15px;
          }
        }
        .gallery-masonry-item {
          break-inside: avoid;
          margin-bottom: 30px;
          overflow: hidden;
          border-radius: 20px;
          border: 1px solid var(--glass-border);
          background: var(--glass-bg);
          box-shadow: var(--glass-shadow);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease;
          cursor: default;
        }
        @media (max-width: 576px) {
          .gallery-masonry-item {
            margin-bottom: 15px;
          }
        }
        .gallery-masonry-item img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gallery-masonry-item:hover {
          transform: translateY(-5px);
          border-color: var(--glass-border-hover);
          box-shadow: 0 12px 40px 0 rgba(212, 175, 55, 0.25);
        }
        .gallery-masonry-item:hover img {
          transform: scale(1.03);
        }
      `}</style>
    </div>
  );
}

export default Gallery;
