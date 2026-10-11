"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Pause,
  Play,
  MoveHorizontal,
} from "lucide-react";
import HeroArtwork from "./HeroArtwork";
import { track } from "@/lib/analytics";
const scenes = [
  {
    label: "Website creation",
    title: "AIでWebサイトをつくる",
    description: "デザインから公開まで。自分だけのWebサイトをAIと一緒に。",
    tools: ["Cursor", "Next.js", "Vercel"],
  },
  {
    label: "Application development",
    title: "AIでアプリを開発する",
    description: "アイデアを、実際に動くWebアプリケーションへ。",
    tools: ["Claude", "Next.js", "Supabase"],
  },
  {
    label: "Work smarter with AI",
    title: "AIで仕事をもっとスマートに",
    description: "調査・資料作成・日々の業務をAIで効率化。",
    tools: ["ChatGPT", "Claude", "APIs"],
  },
  {
    label: "Cloud & AI development",
    title: "クラウドを使いこなす",
    description: "AIとクラウドを組み合わせ、できることをさらに広げよう。",
    tools: ["AWS", "Cloudflare", "Supabase"],
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(true);
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const change = (next: number, dir: number, source = "control") => {
    if (next === index) return;
    if (timer.current) clearTimeout(timer.current);
    setDirection(dir);
    setPrevious(index);
    setIndex(next);
    track("hero_slide_change", { slide: next + 1, source });
    timer.current = setTimeout(
      () => {
        setPrevious(null);
      },
      reduced ? 10 : 720,
    );
  };
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting && !document.hidden),
      { threshold: 0.15 },
    );
    if (root.current) observer.observe(root.current);
    const visibility = () =>
      setVisible(
        !document.hidden &&
          !!root.current &&
          root.current.getBoundingClientRect().bottom > 0,
      );
    document.addEventListener("visibilitychange", visibility);
    return () => {
      mq.removeEventListener("change", update);
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  useEffect(() => {
    if (paused || hover || focused || dragging || !visible || reduced) return;
    const interval = setInterval(
      () => change((index + 1) % 4, 1, "autoplay"),
      8500,
    );
    return () => clearInterval(interval);
  }, [index, paused, hover, focused, dragging, visible, reduced]);
  const scene = scenes[index];
  const still = paused || !visible || reduced || focused || hover || dragging;
  return (
    <section
      className={`hero academy-hero ${still ? "motion-paused" : ""}`}
      ref={root}
      data-scene={index}
    >
      <div className="academy-backdrop" aria-hidden="true" />
      <div className="hero-grid container">
        <div className="hero-copy">
          <p className="hero-eyebrow">未経験から始める、実践型AI学習</p>
          <h1>
            <span>AIを学ぶ。</span>
            <span>可能性をつくる。</span>
          </h1>
          <p className="hero-description">
            知識ゼロから、Webサイトもアプリも。
            <br />
            あなたのアイデアを、AIと一緒に形にしよう。
          </p>
          <div className="hero-learning-labels">
            <span>AIの基礎・仕事への活用</span>
            <span>Web制作・アプリ開発</span>
          </div>
          <div className="hero-actions">
            <Link
              className="button button-lime academy-primary"
              href="/contact"
              onClick={() => track("hero_primary_cta_click")}
            >
              無料で相談する <ArrowUpRight size={19} />
            </Link>
            <a className="text-button" href="#curriculum">
              学べる内容を見る <ArrowDown size={16} />
            </a>
          </div>
          <div className="hero-reassurance">
            学びたいことが、まだ決まっていなくても大丈夫。
          </div>
        </div>
        <div
          className="hero-carousel"
          role="region"
          aria-roledescription="カルーセル"
          aria-label="つくれる可能性を体験する"
          tabIndex={0}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => {
            setHover(false);
            stage.current?.style.setProperty("--pointer-x", "0deg");
            stage.current?.style.setProperty("--pointer-y", "0deg");
          }}
          onKeyDown={(e) => {
            if (e.target !== e.currentTarget) return;
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
              e.preventDefault();
              const d = e.key === "ArrowRight" ? 1 : -1;
              change((index + d + 4) % 4, d);
            }
          }}
        >
          <div className="showcase-topline">
            <span>こんなものが、つくれるようになる。</span>
            <span>0{index + 1} / 04</span>
          </div>
          <div
            className="showcase-stage"
            ref={stage}
            onPointerMove={(e) => {
              if (reduced || e.pointerType !== "mouse") return;
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty(
                "--pointer-x",
                `${((e.clientX - r.left) / r.width - 0.5) * 8}deg`,
              );
              e.currentTarget.style.setProperty(
                "--pointer-y",
                `${((e.clientY - r.top) / r.height - 0.5) * -6}deg`,
              );
            }}
            onPointerDown={(e) => {
              setDragging(true);
              pointer.current = { x: e.clientX, y: e.clientY };
              try {
                e.currentTarget.setPointerCapture(e.pointerId);
              } catch {
                // A browser can cancel a touch before pointer capture completes.
              }
            }}
            onPointerUp={(e) => {
              setDragging(false);
              if (pointer.current) {
                const dx = e.clientX - pointer.current.x,
                  dy = e.clientY - pointer.current.y;
                if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
                  const d = dx < 0 ? 1 : -1;
                  change((index + d + 4) % 4, d, "swipe");
                }
                pointer.current = null;
              }
            }}
            onPointerCancel={() => {
              setDragging(false);
              pointer.current = null;
            }}
            onLostPointerCapture={() => {
              setDragging(false);
              pointer.current = null;
            }}
          >
            <div className="scene-parallax">
              {previous !== null && (
                <div
                  aria-hidden="true"
                  className={`scene-layer scene-out dir-${direction}`}
                  key={`out-${previous}`}
                >
                  <HeroArtwork scene={previous} />
                </div>
              )}
              <div
                aria-hidden="true"
                className={`scene-layer ${previous !== null ? "scene-in" : ""} dir-${direction}`}
                key={index}
              >
                <HeroArtwork scene={index} />
              </div>
            </div>
          </div>
          <div
            className="scene-caption"
            aria-live={focused || paused ? "polite" : "off"}
            aria-atomic="true"
          >
            <div className="scene-caption-top">
              <span className="scene-number">0{index + 1}</span>
              <span className="scene-category">{scene.label}</span>
              <div className="tools">
                {scene.tools.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
            <h2>{scene.title}</h2>
            <p>{scene.description}</p>
          </div>
          <div className="scene-controls">
            <div className="pagination">
              {scenes.map((s, i) => (
                <button
                  key={s.label}
                  aria-label={`シーン${i + 1}: ${s.title}`}
                  aria-current={index === i ? "true" : undefined}
                  onClick={() => change(i, i > index ? 1 : -1)}
                >
                  <span />
                </button>
              ))}
            </div>
            <span className="drag-hint">
              <MoveHorizontal size={13} /> スワイプで切り替え
            </span>
            <div className="arrow-controls">
              <button
                aria-label={paused ? "自動再生を開始" : "自動再生を停止"}
                onClick={() => setPaused(!paused)}
              >
                {paused ? <Play size={14} /> : <Pause size={14} />}
              </button>
              <button
                aria-label="前のシーン"
                onClick={() => change((index + 3) % 4, -1)}
              >
                <ArrowLeft size={18} />
              </button>
              <button
                aria-label="次のシーン"
                onClick={() => change((index + 1) % 4, 1)}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="academy-bottom">
        <div className="container academy-bottom-inner">
          <p>
            「使ってみる」から
            <br />
            <strong>「自分でつくる」まで。</strong>
          </p>
          <div>
            <span>まずは身近なことから</span>
            <b>AIを使いこなす</b>
          </div>
          <i aria-hidden="true">→</i>
          <div>
            <span>アイデアを形にする</span>
            <b>Webサイトをつくる</b>
          </div>
          <i aria-hidden="true">→</i>
          <div>
            <span>できることを広げる</span>
            <b>アプリを動かす</b>
          </div>
          <a href="#curriculum" aria-label="カリキュラムを見る">
            <ArrowDown size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
