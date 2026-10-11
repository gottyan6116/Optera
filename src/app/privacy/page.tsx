import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { contactConfigured, siteUrl } from "@/lib/config";
export const metadata: Metadata = {
  title: "個人情報の取り扱い",
  alternates: siteUrl() ? { canonical: `${siteUrl()}/privacy` } : undefined,
};
export default function Privacy() {
  const live = contactConfigured();
  return (
    <>
      <main id="main" className="legal-page container">
        <Link className="back-link" href="/contact">
          ← 無料相談に戻る
        </Link>
        <p className="section-label">Privacy</p>
        <h1>個人情報の取り扱い</h1>
        {!live && (
          <div className="form-notice">
            相談受付は準備中です。現在のフォームは動作確認用で、入力内容を保存・転送しません。本ページは公開前に運営者情報を補完するための案内案です。
          </div>
        )}
        <section>
          <h2>相談フォームで扱う情報</h2>
          <p>
            受付開始後は、お名前、メールアドレス、学習目的、AIの経験、興味のある内容、および任意のメッセージを、相談内容の確認と返信、関連する受講案内のために取り扱います。
          </p>
        </section>
        <section>
          <h2>送信先と管理</h2>
          <p>
            フォームの送信は暗号化された通信を使用します。受付を有効にする前に、運営者は送信先サービス、保管期間、アクセス権限、削除手続き、および委託先の取り扱いを確認し、本ページへ明記する必要があります。
          </p>
        </section>
        <section>
          <h2>アクセス解析</h2>
          <p>
            アクセス解析を有効にする場合は、利用するサービスとCookieの取り扱いを別途案内します。相談フォームに入力されたお名前、メールアドレス、メッセージはアクセス解析へ送信しない設計です。
          </p>
        </section>
        <section>
          <h2>運営者・お問い合わせ先</h2>
          <p>
            正式な運営者名、連絡先、保管期間、開示・訂正・削除の窓口は、受付開始までに本ページへ掲載します。これらの情報が未掲載の間は、本番の相談受付を開始しません。
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
