import type { Metadata } from "next";
import Header from "@/components/Header";
import Analytics from "@/components/Analytics";
import { siteUrl } from "@/lib/config";
import "./globals.css";
import "./sections.css";
import "./contact.css";
import "./redesign.css";
export const metadata: Metadata = {
  metadataBase: siteUrl() ? new URL(siteUrl()!) : undefined,
  icons: { icon: "/optera-logo.png" },
  title: {
    default: "OPTERA（オプテラ）｜AIを学ぶ。可能性をつくる。",
    template: "%s | OPTERA",
  },
  description:
    "知識ゼロから、Webサイトもアプリも。OPTERAは、AIの基礎からWeb制作・アプリ開発まで、つくりながら学ぶオンラインAI学習サービスです。",
  openGraph: {
    title: "OPTERA｜AIを学ぶ。可能性をつくる。",
    description: "あなたのアイデアを、AIと一緒に形にしよう。",
    locale: "ja_JP",
    type: "website",
    images: siteUrl()
      ? [
          {
            url: siteUrl() + "/og",
            width: 1200,
            height: 630,
            alt: "OPTERA — Practical AI Skills. Brighter Possibilities.",
          },
        ]
      : undefined,
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <a className="skip-link" href="#main">
          本文へスキップ
        </a>
        <Header />
        {children}
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <Analytics id={process.env.NEXT_PUBLIC_GA4_ID} />
        )}
      </body>
    </html>
  );
}
