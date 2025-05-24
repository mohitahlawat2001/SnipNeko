'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { CopyButton } from '@/components/CopyButton'
import { formatDate, timeUntilExpiry } from '@/lib/utils'
import { Snippet } from '@/types'

interface SnippetViewerProps {
  snippet: Snippet
}

export default function SnippetViewer({ snippet }: SnippetViewerProps) {
  const [showRaw, setShowRaw] = useState(false)

  const isExpired = new Date(snippet.expiresAt) < new Date()

  if (isExpired) {
    return (
      <Card className="p-8 text-center">
        <div className="text-red-600 text-xl font-medium mb-4">
          ⏰ This snippet has expired
        </div>
        <p className="text-gray-600 mb-6">
          Snippets automatically expire after 24 hours for security.
        </p>
        <Link href="/">
          <Button>Create New Snippet</Button>
        </Link>
      </Card>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {snippet.title || 'Untitled Snippet'}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
              <span>Language: {snippet.language || 'text'}</span>
              <span>Created: {formatDate(new Date(snippet.createdAt))}</span>
              <span className="text-orange-600 font-medium">
                {timeUntilExpiry(new Date(snippet.expiresAt))}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <CopyButton text={snippet.content} />
            <Button
              onClick={() => setShowRaw(!showRaw)}
              variant="outline"
              size="sm"
            >
              {showRaw ? 'Formatted' : 'Raw'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Content */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Content</h2>
          <div className="text-sm text-gray-500">
            {snippet.content.length} characters
          </div>
        </div>

        {showRaw ? (
          <pre className="bg-gray-50 p-4 rounded-md overflow-auto text-sm font-mono whitespace-pre-wrap border">
            {snippet.content}
          </pre>
        ) : (
          <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto">
            <pre className="text-sm font-mono whitespace-pre-wrap">
              <code className={`language-${snippet.language}`}>
                {snippet.content}
              </code>
            </pre>
          </div>
        )}
      </Card>

      {/* Actions */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="outline">
              ← Create New Snippet
            </Button>
          </Link>
          
          <div className="flex gap-2">
            <Button
              onClick={() => {
                const url = window.location.href
                navigator.clipboard.writeText(url)
              }}
              variant="outline"
              size="sm"
            >
              📋 Copy URL
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}