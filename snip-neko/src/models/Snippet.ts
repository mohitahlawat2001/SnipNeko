import { Schema, model, models } from 'mongoose'
import { SnippetDocument } from '@/types'

const SnippetSchema = new Schema<SnippetDocument>({
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
    expires: 0 // TTL index
  }
})

export const Snippet = models.Snippet || model<SnippetDocument>('Snippet', SnippetSchema)