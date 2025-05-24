import { notFound } from 'next/navigation'
import SnippetViewer from '@/components/SnippetViewer'
import { Snippet } from '@/types'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

async function getSnippet(id: string): Promise<Snippet | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/snippets/${id}`, {
      cache: 'no-store' // Always fetch fresh data
    })

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching snippet:', error)
    return null
  }
}

export default async function SnippetPage({ params }: PageProps) {
  const { id } = await params
  const snippet = await getSnippet(id)

  if (!snippet) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <SnippetViewer snippet={snippet} />
      </div>
    </div>
  )
}

// Optional: Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const snippet = await getSnippet(id)
  
  if (!snippet) {
    return {
      title: 'Snippet Not Found - SnipNeko'
    }
  }

  return {
    title: snippet.title ? `${snippet.title} - SnipNeko` : 'Code Snippet - SnipNeko',
    description: snippet.content.substring(0, 160) + '...'
  }
}