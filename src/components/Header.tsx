"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
const links = [
  ["学べること", "curriculum"],
  ["制作事例", "projects"],
  ["学習の流れ", "roadmap"],
  ["OPTERAについて", "about"],
  ["よくある質問", "faq"],
];
export function Logo() {
  return (
    <span className="logo-window">
      <Image
        src="/optera-logo.png"
        width={2172}
        height={724}
        alt="OPTERA"
        priority
      />
    </span>
  );
}
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <header
      className={`site-header ${scrolled ? "scrolled" : ""}`}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          button.current?.focus();
        }
      }}
    >
      <div className="header-inner">
        <Link href="/" aria-label="OPTERA ホーム">
          <Logo />
        </Link>
        <button
          className="menu-toggle"
          ref={button}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="main-nav"
          aria-label="メインナビゲーション"
          className={open ? "nav-open" : ""}
        >
          {links.map(([text, id]) => (
            <Link key={id} href={`/#${id}`} onClick={() => setOpen(false)}>
              {text}
            </Link>
          ))}
          <Link
            className="header-cta"
            href="/contact"
            onClick={() => setOpen(false)}
          >
            無料相談 <ArrowUpRight size={16} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
