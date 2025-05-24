import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { Snippet } from '@/models/Snippet'
import { createSnippetSchema } from '@/lib/validations'
import { compressContent } from '@/lib/compression'
import clientPromise from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    // Connect to MongoDB
    await clientPromise

    // Parse and validate request body
    const body = await request.json()
    const validatedData = createSnippetSchema.parse(body)

    // Generate unique ID
    const id = nanoid(10) // 10 character ID

    // Compress content
    const compressed = compressContent(validatedData.content)

    // Create snippet
    const snippet = new Snippet({
      id,
      content: validatedData.content,
      compressed,
      language: validatedData.language || 'text',
      title: validatedData.title,
    })

    await snippet.save()

    // Return response
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    return NextResponse.json({
      id,
      url: `${baseUrl}/${id}`,
      expiresAt: snippet.expiresAt.toISOString(),
    })

  } catch (error) {
    console.error('Error creating snippet:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}