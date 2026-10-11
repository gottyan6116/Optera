import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="legal-page container">
      <p className="section-label">404</p>
      <h1>ページが見つかりませんでした。</h1>
      <p>リンクが変更されたか、ページが存在しない可能性があります。</p>
      <Link href="/" className="button button-dark" style={{ marginTop: 30 }}>
        ホームに戻る
      </Link>
    </main>
  );
}
