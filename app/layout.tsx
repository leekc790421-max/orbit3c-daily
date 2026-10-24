import Link from 'next/link'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Orbit Daily | 光曜星樞內容引擎',
  description: 'AI 科技趨勢、3C 冷知識、海外技術觀察、每日精選',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body>
        <header className="header">
          <div className="container header-inner">
            <div>
              <div className="logo">ORBIT DAILY</div>
              <div className="logo-sub">光曜星樞 · 內容引擎</div>
            </div>
            <nav className="nav-links">
              <Link href="/">首頁</Link>
              <Link href="/posts">全部文章</Link>
              <Link href="https://xingdeng.tw" target="_blank">光曜官網</Link>
              <Link href="https://orbit.xingdeng.tw" target="_blank">3D 總部</Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="footer">
          <div className="container">
            <p>© 2026 光曜星樞 SNT · Singularity Nexus Technology</p>
            <p style={{ marginTop: '8px' }}>
              <Link href="https://xingdeng.tw">xingdeng.tw</Link> ·{' '}
              <Link href="https://orbit.xingdeng.tw">orbit.xingdeng.tw</Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
