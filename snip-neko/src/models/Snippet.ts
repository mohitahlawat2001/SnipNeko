import mongoose, { Schema, model, models } from 'mongoose'

const SnippetSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  content: {
    type: String,
    required: true
  },
  compressed: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'text'
  },
  title: {
    type: String,
    maxlength: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    expires: 0 // MongoDB TTL - automatically delete when expiresAt is reached
  }
})

// Create indexes for better performance
SnippetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export const Snippet = models.Snippet || model('Snippet', SnippetSchema)