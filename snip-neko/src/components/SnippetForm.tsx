'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Card } from '@/components/ui/Card'
import { CopyButton } from '@/components/CopyButton'
import type { CreateSnippetRequest, SnippetResponse } from '@/types'

const LANGUAGES = [
  { value: 'text', label: 'Plain Text' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' },
  { value: 'sql', label: 'SQL' },
]

export default function SnippetForm() {
  const [formData, setFormData] = useState<CreateSnippetRequest>({
    content: '',
    language: 'text',
    title: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<SnippetResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.content.trim()) {
      setError('Content is required')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/snippets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to create snippet')
      }

      const data: SnippetResponse = await response.json()
      setResult(data)
      
      // Reset form
      setFormData({
        content: '',
        language: 'text',
        title: '',
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (
    field: keyof CreateSnippetRequest,
    value: string
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (result) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-4">
          <div className="text-green-600 text-lg font-medium">
            ✅ Snippet created successfully!
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Share this URL:
              </label>
              <div className="flex gap-2">
                <Input
                  value={result.url}
                  readOnly
                  className="font-mono text-sm"
                />
                <CopyButton text={result.url} />
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              Expires: {new Date(result.expiresAt).toLocaleString()}
            </div>
          </div>
          
          <Button
            onClick={() => setResult(null)}
            variant="outline"
            className="mt-4"
          >
            Create Another Snippet
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title (optional)
            </label>
            <Input
              placeholder="My awesome snippet"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <Select
              value={formData.language ?? 'text'}
              onChange={(value) => handleInputChange('language', value)}
              options={LANGUAGES}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content *
          </label>
          <Textarea
            placeholder="Paste your code or text here..."
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            rows={12}
            className="font-mono text-sm"
            required
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading || !formData.content.trim()}
          className="w-full"
        >
          {isLoading ? 'Creating Snippet...' : 'Create Snippet'}
        </Button>
      </form>
    </Card>
  )
}