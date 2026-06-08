import React, { useState, useEffect } from 'react';
import { Lock, LogOut, Trash2, Check, X, RefreshCw, BarChart2, Calendar, Users, IndianRupee } from 'lucide-react';

function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  // Local stats
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    estRevenue: 0
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Simple password check for administration
    if (password === 'dj@monty') {
      setIsAuthenticated(true);
      setLoginError('');
      // Save auth in sessionStorage
      sessionStorage.setItem('admin_auth', 'true');
    } else {
      setLoginError('Invalid Administrator Password.');
    }
  };

  useEffect(() => {
    // Check if previously logged in this session
    if (sessionStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const fetchBookings = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setFetchError('');
    try {
      const response = await fetch('/api/bookings');
      let data = {};
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        if (text.includes('Connection refused') || response.status === 502 || response.status === 504 || response.status === 500) {
          throw new Error(`Database connection or backend error (Status ${response.status}). Please verify your MongoDB URI and Vercel configuration.`);
        } else {
          throw new Error(`Server error (Status ${response.status}): ${text.substring(0, 100)}...`);
        }
      }
      if (response.ok) {
        setBookings(data.data);
        calculateStats(data.data);
      } else {
        setFetchError(data.error || 'Failed to fetch bookings.');
      }
    } catch (err) {
      console.error(err);
      setFetchError(err.message || 'Connection failed. Please check backend server configuration.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [isAuthenticated]);

  const calculateStats = (list) => {
    let pending = 0;
    let confirmed = 0;
    let completed = 0;
    let estRevenue = 0;

    list.forEach(booking => {
      if (booking.status === 'Pending') pending++;
      if (booking.status === 'Confirmed') confirmed++;
      if (booking.status === 'Completed') completed++;

      // Estimate revenue based on booking packages
      if (booking.status !== 'Cancelled') {
        if (booking.eventType === 'Wedding') estRevenue += 50000;
        else if (booking.eventType === 'Festival') estRevenue += 100000;
        else if (booking.eventType === 'Club') estRevenue += 25000;
        else estRevenue += 35000; // other types average
      }
    });

    setStats({
      total: list.length,
      pending,
      confirmed,
      completed,
      estRevenue
    });
  };

  const handleStatusUpdate = async (id, currentStatus, newStatus) => {
    if (currentStatus === newStatus) return;
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        // Refetch or update locally
        setBookings(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
        // Recalculate stats with the updated local array
        const updatedList = bookings.map(b => b._id === id ? { ...b, status: newStatus } : b);
        calculateStats(updatedList);
      }
    } catch (err) {
      console.error(err);
      alert('Error updating status');
    }
  };

  const handleBookingDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking request?')) return;
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setBookings(prev => prev.filter(b => b._id !== id));
        calculateStats(bookings.filter(b => b._id !== id));
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting booking');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    setPassword('');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // 1. Render Login Screen if not Authenticated
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px'
      }}>
        <div className="glass-card" style={{
          width: '100%',
          maxWidth: '400px',
          padding: '40px 30px',
          borderRadius: '20px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(255, 0, 127, 0.08)',
            border: '1px solid rgba(255, 0, 127, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto'
          }}>
            <Lock size={24} style={{ color: 'var(--accent-magenta)' }} />
          </div>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '10px', fontFamily: 'var(--font-title)' }}>Admin Access</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '25px' }}>
            Enter your administration password to view bookings.
          </p>

          {loginError && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              color: '#ef4444',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              marginBottom: '20px'
            }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input" 
              placeholder="Enter Password"
              required
              autoFocus
              style={{ textAlign: 'center' }}
            />
            <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
              Authorize Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Render Dashboard if Authenticated
  return (
    <div style={{ padding: '120px 0 80px 0' }}>
      <div className="container">
        {/* Top Header Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-title)' }}>
              Console <span className="text-gradient">Dashboard</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Manage booking reservations and schedule details.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={fetchBookings} 
              disabled={loading}
              className="btn-secondary" 
              style={{ padding: '10px 18px', gap: '6px' }}
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              Refresh Database
            </button>
            <button 
              onClick={handleLogout} 
              className="btn-secondary" 
              style={{ padding: '10px 18px', border: '1px solid #ef4444', color: '#ef4444', gap: '6px' }}
            >
              <LogOut size={16} />
              Lock Console
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div className="glass-card" style={{ padding: '25px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'rgba(0, 240, 255, 0.08)', padding: '12px', borderRadius: '12px', color: 'var(--accent-cyan)' }}>
              <Calendar size={24} />
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Requests</p>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--text-main)', fontFamily: 'var(--font-title)' }}>{stats.total}</h3>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '25px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'rgba(251, 191, 36, 0.08)', padding: '12px', borderRadius: '12px', color: '#fbbf24' }}>
              <Users size={24} />
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pending Action</p>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--text-main)', fontFamily: 'var(--font-title)' }}>{stats.pending}</h3>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '25px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '12px', borderRadius: '12px', color: '#10b981' }}>
              <BarChart2 size={24} />
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Confirmed Bookings</p>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--text-main)', fontFamily: 'var(--font-title)' }}>{stats.confirmed}</h3>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '25px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'rgba(255, 0, 127, 0.08)', padding: '12px', borderRadius: '12px', color: 'var(--accent-magenta)' }}>
              <IndianRupee size={24} />
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Est. Projected Revenue</p>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--text-main)', fontFamily: 'var(--font-title)' }}>₹{stats.estRevenue.toLocaleString('en-IN')}</h3>
            </div>
          </div>
        </div>

        {/* Database List Block */}
        {fetchError && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            padding: '16px 24px',
            borderRadius: '12px',
            marginBottom: '30px'
          }}>
            {fetchError}
          </div>
        )}

        <div className="glass-card" style={{ padding: '30px', borderRadius: '20px', overflowX: 'auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px 0', color: 'var(--text-muted)' }}>
              <RefreshCw size={30} className="animate-spin" style={{ margin: '0 auto 15px auto', color: 'var(--accent-cyan)' }} />
              Connecting to Database, querying booking documents...
            </div>
          ) : bookings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 0', color: 'var(--text-muted)' }}>
              No booking requests registered in the database yet.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }} className="admin-table">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Client Name</th>
                  <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Event Details</th>
                  <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Contact</th>
                  <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Status</th>
                  <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'var(--transition-fast)' }} className="table-row">
                    {/* Client Name */}
                    <td style={{ padding: '18px 16px' }}>
                      <h4 style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{booking.name}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Received: {formatDate(booking.createdAt)}</span>
                    </td>

                    {/* Event details */}
                    <td style={{ padding: '18px 16px' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{formatDate(booking.eventDate)}</span>
                        <span className="badge" style={{
                          fontSize: '0.7rem',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          color: booking.eventType === 'Wedding' ? 'var(--accent-magenta)' : booking.eventType === 'Festival' ? 'var(--accent-purple)' : 'var(--accent-cyan)'
                        }}>{booking.eventType}</span>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        Guests: {booking.guests} | {booking.message ? `"${booking.message.substring(0, 35)}..."` : 'No custom notes'}
                      </p>
                    </td>

                    {/* Contact details */}
                    <td style={{ padding: '18px 16px', fontSize: '0.85rem' }}>
                      <div>{booking.email}</div>
                      <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>{booking.phone}</div>
                    </td>

                    {/* Status Badge */}
                    <td style={{ padding: '18px 16px' }}>
                      <span className={`badge badge-${booking.status.toLowerCase()}`}>
                        {booking.status}
                      </span>
                    </td>

                    {/* Operations */}
                    <td style={{ padding: '18px 16px', textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        {/* Confirm */}
                        {booking.status === 'Pending' && (
                          <button 
                            onClick={() => handleStatusUpdate(booking._id, booking.status, 'Confirmed')}
                            className="action-btn btn-confirm" 
                            title="Confirm Booking"
                          >
                            <Check size={14} />
                          </button>
                        )}
                        
                        {/* Complete */}
                        {booking.status === 'Confirmed' && (
                          <button 
                            onClick={() => handleStatusUpdate(booking._id, booking.status, 'Completed')}
                            className="action-btn btn-confirm" 
                            title="Mark as Completed"
                          >
                            <Check size={14} />
                          </button>
                        )}

                        {/* Cancel */}
                        {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                          <button 
                            onClick={() => handleStatusUpdate(booking._id, booking.status, 'Cancelled')}
                            className="action-btn btn-cancel" 
                            title="Cancel Booking"
                          >
                            <X size={14} />
                          </button>
                        )}

                        {/* Delete */}
                        <button 
                          onClick={() => handleBookingDelete(booking._id)}
                          className="action-btn btn-delete" 
                          title="Delete Request"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <style>{`
        .admin-table th {
          font-weight: 600;
        }
        .table-row:hover {
          background: rgba(255, 255, 255, 0.015);
        }
        .action-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
          color: var(--text-muted);
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .btn-confirm:hover {
          background: rgba(16, 185, 129, 0.1);
          border-color: #10b981;
          color: #10b981;
        }
        .btn-cancel:hover {
          background: rgba(239, 68, 68, 0.1);
          border-color: #ef4444;
          color: #ef4444;
        }
        .btn-delete:hover {
          background: rgba(239, 68, 68, 0.15);
          border-color: #ef4444;
          color: #ef4444;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default AdminDashboard;
