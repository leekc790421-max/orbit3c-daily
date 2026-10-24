import Link from 'next/link'
import type { Post } from '@/lib/posts'

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`} className="post-card">
      <div className="post-meta">
        <span className={`post-cat ${post.category}`}>{post.category}</span>
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.readingTime} 分鐘閱讀</span>
      </div>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      {post.tags.length > 0 && (
        <div className="post-tags">
          {post.tags.map(tag => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>
      )}
    </Link>
  )
}
