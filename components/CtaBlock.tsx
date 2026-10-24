import Link from 'next/link'

export function CtaBlock() {
  return (
    <div className="cta-block">
      <h3>探索更多光曜星樞服務</h3>
      <p>AI 數位總部、3D 品牌展示館、架網懶人包 — 讓你的企業門面升級為下一代 AI 驅動體驗</p>
      <div className="cta-links">
        <Link href="https://xingdeng.tw" target="_blank" className="cta-btn primary">
          光曜官網
        </Link>
        <Link href="https://orbit.xingdeng.tw" target="_blank" className="cta-btn secondary">
          3D 總部體驗
        </Link>
      </div>
    </div>
  )
}
