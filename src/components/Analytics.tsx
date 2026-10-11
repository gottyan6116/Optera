"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { track } from "@/lib/analytics";
export default function Analytics({ id }: { id: string }) {
  const [consent, setConsent] = useState<string | null>("loading");
  useEffect(() => {
    try {
      setConsent(localStorage.getItem("optera-analytics"));
    } catch {
      setConsent(null);
    }
  }, []);
  useEffect(() => {
    if (consent !== "accepted") return;
    const target = document.getElementById("curriculum");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track("curriculum_view");
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [consent]);
  const choose = (value: string) => {
    try {
      localStorage.setItem("optera-analytics", value);
    } catch {}
    setConsent(value);
  };
  if (!/^G-[A-Z0-9]+$/.test(id)) return null;
  return (
    <>
      {consent === null && (
        <div
          className="cookie-notice"
          role="region"
          aria-label="アクセス解析の設定"
        >
          <p>
            サイト改善のため、Google
            Analyticsを利用して匿名の操作情報を計測できます。フォームの入力内容は計測しません。
            <Link href="/privacy">個人情報の取り扱い</Link>
          </p>
          <div>
            <button onClick={() => choose("accepted")}>解析を許可する</button>
            <button onClick={() => choose("declined")}>許可しない</button>
          </div>
        </div>
      )}
      {consent === "accepted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
          >{`window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};gtag('js',new Date());gtag('config',${JSON.stringify(id)});`}</Script>
        </>
      )}
    </>
  );
}
