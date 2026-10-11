import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  Globe2,
  Layers3,
  Sparkles,
  Lightbulb,
  Monitor,
  BookOpen,
  MessageCircle,
  GraduationCap,
  ChevronDown,
} from "lucide-react";
import { tracks, projects, faqs } from "@/data/content";
import { WebsitePreview, DashboardPreview, WorkflowPreview } from "./Showcase";
import LearningDiagram from "./LearningDiagram";

export function Heading({
  label,
  children,
  description,
}: {
  label: string;
  children: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <p className="section-label">{label}</p>
      <h2>{children}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
export function Possibilities() {
  const items = [
    {
      icon: Globe2,
      title: "自分のWebサイトをつくる",
      text: "想いや作品を届ける場所を、自分の手で。",
      art: "web",
    },
    {
      icon: Layers3,
      title: "アイデアをアプリにする",
      text: "「こんなの欲しかった」を、動く形に。",
      art: "app",
    },
    {
      icon: Sparkles,
      title: "仕事をもっと効率的にする",
      text: "日々の作業を軽くして、考える時間を。",
      art: "work",
    },
    {
      icon: Compass,
      title: "新しい挑戦を始める",
      text: "できることを増やして、次の選択肢へ。",
      art: "future",
    },
  ];
  return (
    <section id="possibilities" className="section possibilities">
      <div className="container">
        <div className="section-heading-row">
          <Heading label="The possibilities">
            AIを使えるようになると、
            <br />
            こんな未来が待っている。
          </Heading>
          <p>
            学ぶことは、選択肢を増やすこと。
            <br />
            あなたの日常に、新しい「できる」を。
          </p>
        </div>
        <div className="possibility-grid">
          {items.map(({ icon: Icon, title, text, art }) => (
            <article className="possibility" key={title}>
              <div className={`possibility-art art-${art}`}>
                <Icon size={36} strokeWidth={1.4} />
                {art === "web" ? (
                  <>
                    <div className="mini-window">
                      <span />
                      <i />
                      <i />
                      <i />
                    </div>
                    <span className="art-cursor">↖</span>
                  </>
                ) : art === "app" ? (
                  <>
                    <div className="mini-stack" />
                    <div className="mini-stack stack-two" />
                  </>
                ) : art === "work" ? (
                  <>
                    <div className="mini-check">
                      <Check size={14} /> Research
                    </div>
                    <div className="mini-check second-check">
                      <Check size={14} /> Create
                    </div>
                  </>
                ) : (
                  <>
                    <div className="future-orbit" />
                    <div className="future-orbit orbit-small" />
                    <span className="future-dot" />
                  </>
                )}
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Curriculum() {
  return (
    <section id="curriculum" className="section curriculum-redesign">
      <div className="container">
        <div className="section-heading-row">
          <Heading label="OPTERAのカリキュラム">
            実践的なスキルを、
            <br />
            段階的に学べるカリキュラム。
          </Heading>
          <p>
            AIを使うところから、サイト・アプリづくりへ。
            <br />
            ひとつずつ、できることを広げていきます。
          </p>
        </div>
        <div className="curriculum-route" aria-label="3段階の学び">
          <span>
            <b>01</b>AIを使う
          </span>
          <i />
          <span>
            <b>02</b>Webをつくる
          </span>
          <i />
          <span>
            <b>03</b>アプリを動かす
          </span>
        </div>
        <div className="curriculum-stages">
          {tracks.map((track, i) => (
            <article
              className={`curriculum-stage curriculum-stage-${i}`}
              key={track.name}
            >
              <div className="curriculum-stage-copy">
                <div className="curriculum-stage-number">
                  <span>STEP</span>
                  <b>0{i + 1}</b>
                  <p>{track.level}</p>
                </div>
                <h3>{track.name}</h3>
                <p className="track-lead">{track.lead}</p>
                <p className="track-description">{track.description}</p>
                <div className="curriculum-output">
                  <span>身につくこと</span>
                  <strong>
                    {
                      [
                        "欲しい答えを引き出し、仕事に活かす",
                        "自分のWebサイトをつくり、公開する",
                        "データとAIがつながるアプリをつくる",
                      ][i]
                    }
                  </strong>
                </div>
              </div>
              <div className="curriculum-stage-visual">
                <LearningDiagram step={i} />
              </div>
              <div className="curriculum-stage-topics">
                <span>学ぶ内容</span>
                <ul>
                  {track.topics.map((t) => (
                    <li key={t}>
                      <Check size={14} />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="track-tools">{track.tools}</div>
              </div>
            </article>
          ))}
        </div>
        <p className="section-note">
          ※
          カリキュラムは企画中です。具体的な内容・提供形式は正式な講座案内でお知らせします。
        </p>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="section-heading-row">
          <Heading label="Made possible with AI">
            こんなものが、
            <br />
            つくれるようになります。
          </Heading>
          <p>
            小さなアイデアから、実際に使えるものへ。
            <br />
            学習の先にあるアウトプットを見てみましょう。
          </p>
        </div>
        <p className="gallery-note">
          <span />
          すべて学習用の制作サンプルです。受講生の実績ではありません。
        </p>
        <div className="project-grid">
          {projects.map((p, i) => (
            <article className="project-card" key={p.title}>
              <div className={`project-visual project-visual-${i}`}>
                <span className="project-sample">Sample project</span>
                <div className="project-screen">
                  {p.type === 0 || p.type === 3 ? (
                    <WebsitePreview business={p.type === 3} />
                  ) : p.type === 1 || p.type === 4 ? (
                    <DashboardPreview analytics={p.type === 4} />
                  ) : (
                    <WorkflowPreview />
                  )}
                </div>
              </div>
              <div className="project-info">
                <div>
                  <span className="project-english">{p.english}</span>
                  <span className="level">{p.level}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <span className="project-tools">{p.tools}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Roadmap() {
  const steps = [
    ["AIを知る・使う", "基本的な対話から、AIの得意・不得意を知る。"],
    ["Webサイトをつくる", "見た目と仕組みを学び、はじめての公開へ。"],
    ["アプリを開発する", "データや機能を組み合わせ、使えるものに。"],
    ["自分のプロジェクトをつくる", "学んだことを、あなた自身のアイデアへ。"],
  ];
  return (
    <section id="roadmap" className="section roadmap-section">
      <div className="container">
        <Heading label="Your learning journey">
          ゼロから「つくれる」までの
          <br />
          学習ステップ。
        </Heading>
        <div className="roadmap">
          {steps.map(([title, description], i) => (
            <article key={title}>
              <div className="roadmap-dot">0{i + 1}</div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <div className="roadmap-foot">
          <Compass size={20} />
          <p>
            ゴールも、ペースも、人それぞれ。
            <br className="mobile-break" />
            目指したい未来から、学ぶ道筋を考えよう。
          </p>
        </div>
      </div>
    </section>
  );
}

export function WhyOptera() {
  return (
    <section id="about" className="section about-section">
      <div className="container about-grid">
        <div className="about-art">
          <div className="brand-equation">
            <span>Options</span>
            <i>＋</i>
            <span>Era</span>
          </div>
          <div className="path-art">
            <i />
            <i />
            <i />
            <span>✦</span>
          </div>
          <p>選択肢が広がる、新しい時代へ。</p>
        </div>
        <div>
          <Heading label="Why OPTERA">
            AIを知るだけで終わらない。
            <br />
            自分でつくれる力へ。
          </Heading>
          <p className="about-copy">
            OPTERAは、Options（選択肢）とEra（時代）から生まれた名前。AIを使いこなす力が、一人ひとりの仕事や創造、暮らしの可能性を広げると考えています。
          </p>
          <div className="philosophy-list">
            <div>
              <BookOpen size={22} />
              <div>
                <h3>わかる言葉で、ひとつずつ。</h3>
                <p>専門用語を覚える前に、仕組みを理解することから。</p>
              </div>
            </div>
            <div>
              <Lightbulb size={22} />
              <div>
                <h3>つくるから、身につく。</h3>
                <p>知識を実際に使い、小さな完成を積み重ねる。</p>
              </div>
            </div>
            <div>
              <Compass size={22} />
              <div>
                <h3>学びを、自分の可能性に。</h3>
                <p>仕事や日常に応用し、自分で選び、進む力を育てる。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section className="section soft-section">
      <div className="container experience-grid">
        <div>
          <Heading label="Learning, step by step">
            はじめてでも、
            <br />
            着実に前へ。
          </Heading>
          <p className="experience-copy">
            理解して、試して、形にする。
            <br />
            小さなサイクルが、次の挑戦の自信になります。
          </p>
          <span className="planning-label">学習体験の構想</span>
          <p className="section-note">
            以下は企画中の学習イメージです。
            <br />
            サポートなどの提供内容は、決定後にご案内します。
          </p>
        </div>
        <div className="experience-steps">
          {[
            ["理解する", "身近な例で、仕組みや考え方を知る。", BookOpen],
            ["試してみる", "ガイドに沿って、実際に手を動かす。", Monitor],
            [
              "つくってみる",
              "学んだことを使い、小さな作品を完成させる。",
              Layers3,
            ],
            [
              "振り返る",
              "フィードバックから、改善のヒントを見つける。",
              MessageCircle,
            ],
            [
              "自分で進む",
              "身につけた力を、自分のアイデアに応用する。",
              GraduationCap,
            ],
          ].map(([title, text, Icon]) => {
            const I = Icon as typeof BookOpen;
            return (
              <div key={title as string}>
                <span>
                  <I size={20} />
                </span>
                <h3>{title as string}</h3>
                <p>{text as string}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Requirements() {
  return (
    <section className="section">
      <div className="container">
        <Heading label="Before you begin">
          学習を始めるために必要なもの。
        </Heading>
        <div className="requirements-grid">
          <article>
            <span className="requirement-tag">まず準備するもの</span>
            <h3>いつものパソコンから。</h3>
            <ul>
              <li>Windows または Mac のパソコン</li>
              <li>安定したインターネット接続</li>
              <li>メールアドレス</li>
              <li>ChatGPT または Claude のアカウント</li>
              <li>GitHubアカウント（必要な講座で使用）</li>
            </ul>
          </article>
          <article>
            <span className="requirement-tag">内容に応じて検討</span>
            <h3>有料ツールは、必要なときに。</h3>
            <ul>
              <li>ChatGPT Plus</li>
              <li>Claude Pro</li>
              <li>Cursor Pro（カリキュラムによる）</li>
            </ul>
            <p>
              最初からすべての契約は必要ありません。学ぶ内容に合わせて選びましょう。
            </p>
          </article>
          <article>
            <span className="requirement-tag">制作・公開に使うサービス</span>
            <h3>小さく始めて、広げていく。</h3>
            <div className="service-tags">
              {["Vercel", "Supabase", "Cloudflare", "AWS"].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <p>
              無料枠や従量課金のあるサービスを利用します。機能・使用量により費用は変わります。利用前に各サービスの最新条件を確認してください。
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export function Audience() {
  return (
    <section className="audience-section">
      <div className="container audience-grid">
        <Heading label="Start where you are">
          こんな方に、
          <br />
          OPTERAはおすすめです。
        </Heading>
        <ul>
          {[
            "AIをこれから学びたい方",
            "仕事でAIを活用したい方",
            "Webサイトを自分でつくりたい方",
            "プログラミング未経験でアプリ開発に挑戦したい方",
            "AIを使って新しいことに挑戦したい方",
          ].map((t) => (
            <li key={t}>
              <Check size={16} />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="section pricing-section">
      <div className="container pricing-grid">
        <Heading label="Find your starting point">
          あなたに合う学び方を、
          <br />
          一緒に考えましょう。
        </Heading>
        <div>
          <p className="pricing-lead">まずは、あなたの「やってみたい」から。</p>
          <p>
            学びたいことや今の経験をお聞かせください。
            <br />
            受講プラン・料金・開始時期は現在準備中です。
            <br />
            確定した内容は、お申し込み前にご案内します。
          </p>
          <Link className="button button-dark" href="/contact">
            無料で相談する <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="section soft-section">
      <div className="container faq-grid">
        <Heading label="Questions & answers">よくある質問</Heading>
        <div className="faq-list">
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>
                <span className="q-mark">Q.</span>
                <h3>{q}</h3>
                <ChevronDown size={18} />
              </summary>
              <div className="faq-answer">
                <p>{a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container final-cta-inner">
        <div>
          <p className="section-label">Your next possibility starts here.</p>
          <h2>AIで、最初の一歩を踏み出そう。</h2>
          <p>
            経験ゼロでも大丈夫。
            <br />
            あなたの目的や興味に合わせて、新しい可能性を探してみませんか。
          </p>
        </div>
        <Link href="/contact" className="button button-lime">
          無料で相談する <ArrowUpRight size={20} />
        </Link>
        <span className="cta-star" aria-hidden="true">
          ✦
        </span>
      </div>
    </section>
  );
}
