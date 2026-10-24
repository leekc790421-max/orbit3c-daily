import { getAllPosts } from '@/lib/posts'
import { PostCard } from '@/components/PostCard'
import { getAllCategories } from '@/lib/posts'

export default function PostsPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  return (
    <section className="posts-section">
      <div className="container">
        <div className="section-title">全部文章</div>
        
        <div className="filter-bar">
          <button className="filter-btn active">全部</button>
          {categories.map(cat => (
            <button key={cat} className="filter-btn">
              {cat}
            </button>
          ))}
        </div>

        {posts.length === 0 ? (
          <p style={{ color: 'var(--t3)', textAlign: 'center', padding: '40px 0' }}>
            暫無已發布文章
          </p>
        ) : (
          posts.map(post => <PostCard key={post.slug} post={post} />)
        )}
      </div>
    </section>
  )
}
