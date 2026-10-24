import { getPostBySlug, getAllPosts, markdownToHtml } from '@/lib/posts'
import { notFound } from 'next/navigation'
import { CtaBlock } from '@/components/CtaBlock'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: `${post.title} | Orbit Daily`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export default async function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const htmlContent = await markdownToHtml(post.content)

  return (
    <article>
      <div className="container">
        <header className="post-header">
          <a href="/posts" className="back-link">← 返回文章列表</a>
          <div className="post-meta" style={{ marginBottom: '16px' }}>
            <span className={`post-cat ${post.category}`}>{post.category}</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readingTime} 分鐘閱讀</span>
          </div>
          <h1>{post.title}</h1>
          {post.tags.length > 0 && (
            <div className="post-tags" style={{ marginTop: '16px' }}>
              {post.tags.map(tag => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>
          )}
        </header>

        <div 
          className="post-body"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <CtaBlock />
      </div>
    </article>
  )
}
