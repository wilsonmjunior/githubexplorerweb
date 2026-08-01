const TECH_KEYWORDS = [
  'React',
  'TypeScript',
  'Rust',
  'Go',
  'Python',
  'AI',
  'Node.js',
  'AWS',
  'Vue',
  'JavaScript',
  'C++',
  'Docker',
  'Kubernetes',
]

export function extractTagsFromBio(
  bio: string | null,
  max = 2,
): string[] {
  if (!bio) {
    return []
  }

  const normalizedBio = bio.toLowerCase()

  return TECH_KEYWORDS.filter((keyword) =>
    normalizedBio.includes(keyword.toLowerCase()),
  ).slice(0, max)
}
