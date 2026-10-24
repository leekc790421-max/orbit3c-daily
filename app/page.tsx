import { getAllPosts } from '@/lib/posts'
import { PostCard } from '@/components/PostCard'
import './globals.css'

export default function Home() {
  const posts = getAllPosts().slice(0, 10) // 最新 10 篇

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Orbit Daily</h1>
          <p>AI 科技趨勢、3C 冷知識、海外技術觀察、每日精選 — 來自光曜星樞 Orbit Tower 的內容引擎</p>
        </div>
      </section>

      <section className="posts-section">
        <div className="container">
          <div className="section-title">最新文章</div>
          {posts.length === 0 ? (
            <p style={{ color: 'var(--t3)', textAlign: 'center', padding: '40px 0' }}>
              暫無已發布文章
            </p>
          ) : (
            posts.map(post => <PostCard key={post.slug} post={post} />)
          )}
        </div>
      </section>
    </>
  )
}
