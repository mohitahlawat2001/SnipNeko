import { NextRequest, NextResponse } from 'next/server'
import { Snippet } from '@/models/Snippet'
import { snippetIdSchema } from '@/lib/validations'
import { decompressContent } from '@/lib/compression'
import clientPromise from '@/lib/mongodb'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Connect to MongoDB
    await clientPromise

    // Validate ID
    const { id } = snippetIdSchema.parse(params)

    // Find snippet
    const snippet = await Snippet.findOne({ id }).lean() as {
      id: string
      compressed: string
      language: string
      title: string
      createdAt: Date
      expiresAt: Date
    } | null

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