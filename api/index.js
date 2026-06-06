import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Booking from './models/Booking.js';

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// 1. Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'DJ Monty Events API is healthy' });
});

// 2. Create a new booking
app.post('/api/bookings', async (req, res) => {
  try {
    const { name, email, phone, eventDate, eventType, guests, message } = req.body;
    
    if (!name || !email || !phone || !eventDate || !eventType) {
      return res.status(400).json({ success: false, error: 'Please provide all required fields' });
    }
    
    const newBooking = new Booking({
      name,
      email,
      phone,
      eventDate,
      eventType,
      guests: guests ? parseInt(guests) : undefined,
      message
    });
    
    await newBooking.save();
    res.status(201).json({ success: true, data: newBooking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
});

// 3. Get all bookings (for Admin Dashboard)
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
});

// 4. Update a booking status
app.put('/api/bookings/:id', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['Pending', 'Confirmed', 'Cancelled', 'Completed'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid booking status' });
    }
    
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }
    
    booking.status = status;
    await booking.save();
    
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
});

// 5. Delete a booking
app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }
    
    res.status(200).json({ success: true, message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
});

// For Vercel, we export the Express app
export default app;

// Listen only when not deployed on Vercel serverless
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running in local development mode on port ${PORT}`);
  });
}
