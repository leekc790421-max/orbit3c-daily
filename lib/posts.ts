import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  category: string
  cover?: string
  draft: boolean
  content: string
  htmlContent?: string
  readingTime: number
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return []
  
  const fileNames = fs.readdirSync(postsDirectory)
  const today = new Date()
  today.setHours(23, 59, 59, 999)
  
  const allPosts: Post[] = fileNames
    .filter(file => file.endsWith('.md'))
    .map(fileName => {
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const slug = fileName.replace(/\.md$/, '')
      
      const wordCount = content.split(/\s+/).length
      const readingTime = Math.max(1, Math.ceil(wordCount / 200))
      
      return {
        slug,
        title: data.title || '無標題',
        date: data.date || new Date().toISOString().split('T')[0],
        description: data.description || '',
        tags: data.tags || [],
        category: data.category || 'daily',
        cover: data.cover || '',
        draft: data.draft || false,
        content,
        readingTime,
      }
    })
    .filter(post => !post.draft)
    .filter(post => new Date(post.date) <= today)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
  
  return allPosts
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null
  
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  const wordCount = content.split(/\s+/).length
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))
  
  return {
    slug,
    title: data.title || '無標題',
    date: data.date || new Date().toISOString().split('T')[0],
    description: data.description || '',
    tags: data.tags || [],
    category: data.category || 'daily',
    cover: data.cover || '',
    draft: data.draft || false,
    content,
    readingTime,
  }
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set(posts.map(p => p.category))
  return Array.from(categories).sort()
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set(posts.flatMap(p => p.tags))
  return Array.from(tags).sort()
}
