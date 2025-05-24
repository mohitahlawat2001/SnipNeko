import { z } from 'zod'

export const createSnippetSchema = z.object({
  content: z.string().min(1, 'Content is required').max(100000, 'Content too large'),
  language: z.string().optional(),
  title: z.string().max(100, 'Title too long').optional(),
})

export const snippetIdSchema = z.object({
  id: z.string().min(1, 'ID is required'),
})

export type CreateSnippetInput = z.infer<typeof createSnippetSchema>
export type SnippetIdInput = z.infer<typeof snippetIdSchema>