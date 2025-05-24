import { NextRequest, NextResponse } from 'next/server'
import { Snippet } from '@/models/Snippet'
import { snippetIdSchema } from '@/lib/validations'
import { decompressContent } from '@/lib/compression'
import connectDB from '@/lib/mongodb'

// Define the lean document type
interface SnippetLeanDocument {
  _id: string
  id: string
  content: string
  compressed: string
  language: string
  title?: string
  createdAt: Date
  expiresAt: Date
  __v: number
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Connect to MongoDB
    await connectDB()

    // Await params and then validate ID
    const { id } = snippetIdSchema.parse(await params)

    // Find snippet with explicit typing
    const snippet = await Snippet.findOne({ id }).lean() as SnippetLeanDocument | null

    if (!snippet) {
      return NextResponse.json(
        { error: 'Snippet not found or expired' },
        { status: 404 }
      )
    }

    // Decompress content
    const decompressedContent = decompressContent(snippet.compressed)

    // Return snippet data
    return NextResponse.json({
      id: snippet.id,
      content: decompressedContent,
      language: snippet.language,
      title: snippet.title,
      createdAt: snippet.createdAt,
      expiresAt: snippet.expiresAt,
    })

  } catch (error) {
    console.error('Error fetching snippet:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid snippet ID' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}