import Link from "next/link";
import { Logo } from "./Header";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Link href="/" aria-label="OPTERA ホーム">
              <Logo />
            </Link>
            <p>AIを学ぶ。可能性をつくる。</p>
            <small>Practical AI Skills. Brighter Possibilities.</small>
          </div>
          <div className="footer-links">
            <Link href="/#curriculum">学べること</Link>
            <Link href="/#projects">制作事例</Link>
            <Link href="/#about">OPTERAについて</Link>
            <Link href="/contact">無料相談</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <small>© {new Date().getFullYear()} OPTERA</small>
          <Link href="/privacy">個人情報の取り扱い</Link>
          <span>Options + Era</span>
        </div>
      </div>
    </footer>
  );
}
