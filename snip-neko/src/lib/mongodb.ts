import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

// Global cache to prevent multiple connections during development
interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

const cached: MongooseCache = (global as typeof global & { mongoose?: MongooseCache }).mongoose || { conn: null, promise: null }

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }

    // Use non-null assertion since we've already checked above
    cached.promise = mongoose.connect(MONGODB_URI!, opts)
  }

  try {
    cached.conn = await cached.promise
    console.log('✅ Connected to MongoDB')
  } catch (e) {
    cached.promise = null
    console.error('❌ MongoDB connection failed:', e)
    throw e
  }

  return cached.conn
}

// Cache the connection globally
if (process.env.NODE_ENV === 'development') {
  (global as typeof global & { mongoose?: MongooseCache }).mongoose = cached
}

export default connectDB