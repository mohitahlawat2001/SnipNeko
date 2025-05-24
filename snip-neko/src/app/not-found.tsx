import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <Card className="p-8 text-center max-w-md">
        <div className="text-6xl mb-4">🐱</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Snippet Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          This snippet doesn't exist or has expired. Snippets automatically expire after 24 hours.
        </p>
        <Link href="/">
          <Button className="w-full">
            Create New Snippet
          </Button>
        </Link>
      </Card>
    </div>
  )
}