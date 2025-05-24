'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'

interface CopyButtonProps {
  text: string
  className?: string
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className={className} disabled>
        📋 Copy
      </Button>
    )
  }

  return (
    <Button
      onClick={handleCopy}
      variant="outline"
      size="sm"
      className={className}
    >
      {copied ? '✅ Copied' : '📋 Copy'}
    </Button>
  )
}