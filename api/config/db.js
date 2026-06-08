import mongoose from 'mongoose';

// Global cache for serverless environments (prevents connection exhaustion)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/djmonty';

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    mongoose.set('strictQuery', false);
    console.log('Connecting to MongoDB (initializing cache)...');
    
    cached.promise = mongoose.connect(connUri).then((m) => {
      console.log(`MongoDB Connected: ${m.connection.host}`);
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // throw the error to be handled by middleware
    throw error;
  }

  return cached.conn;
};

export default connectDB;
