
export interface Snippet {
  _id?: string
  id: string
  content: string
  compressed: string
  language?: string
  title?: string
  createdAt: Date
  expiresAt: Date
}

export interface CreateSnippetRequest {
  content: string
  language?: string
  title?: string
}

export interface SnippetResponse {
  id: string
  url: string
  expiresAt: string
}