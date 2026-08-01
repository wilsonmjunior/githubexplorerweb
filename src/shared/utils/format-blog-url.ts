export function formatBlogUrl(blog: string): string {
  return blog.replace(/^https?:\/\//, '').replace(/\/$/, '')
}
