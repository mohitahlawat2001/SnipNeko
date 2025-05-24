import Image from "next/image";
import SnippetForm from "@/components/SnippetForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">SnipNeko 🐱</h1>
          <p className="text-gray-600 text-lg">
            Share code snippets quickly and securely
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Snippets automatically expire after 24 hours
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <SnippetForm />
        </div>
      </div>
    </div>
  );
}
