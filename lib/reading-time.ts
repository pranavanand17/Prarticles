/**
 * Rough reading time from plain text (body or markdown source).
 * Assumes ~200 words per minute, matching common blog defaults.
 */
export function estimateReadingMinutes(text: string, wordsPerMinute = 200): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
