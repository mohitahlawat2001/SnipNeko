import LZString from 'lz-string'

/**
 * Compresses content using LZ-string algorithm
 * @param content - The string content to compress
 * @returns Compressed string in Base64 format
 */
export function compressContent(content: string): string {
  return LZString.compressToBase64(content)
}

/**
 * Decompresses content from Base64 LZ-string format
 * @param compressed - The compressed string in Base64 format
 * @returns Original decompressed string
 * @throws Error if decompression fails
 */
export function decompressContent(compressed: string): string {
  const decompressed = LZString.decompressFromBase64(compressed)
  if (decompressed === null) {
    throw new Error('Failed to decompress content')
  }
  return decompressed
}

/**
 * Calculate compression ratio
 * @param original - Original content
 * @param compressed - Compressed content
 * @returns Compression ratio as percentage
 */
export function getCompressionRatio(original: string, compressed: string): number {
  const originalSize = new Blob([original]).size
  const compressedSize = new Blob([compressed]).size
  return Math.round(((originalSize - compressedSize) / originalSize) * 100)
}

/**
 * Check if content should be compressed (worth compressing)
 * @param content - Content to check
 * @returns True if compression is beneficial
 */
export function shouldCompress(content: string): boolean {
  // Only compress if content is larger than 100 characters
  // and compression saves at least 10%
  if (content.length < 100) return false
  
  const compressed = compressContent(content)
  const ratio = getCompressionRatio(content, compressed)
  return ratio >= 10
}