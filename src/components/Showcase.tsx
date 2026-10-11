import {
  ArrowUpRight,
  Check,
  Code2,
  Database,
  Globe2,
  Layers3,
  Sparkles,
  Cloud,
  Zap,
  BarChart3,
} from "lucide-react";

export function WebsitePreview({ business = false }: { business?: boolean }) {
  return (
    <div className={`website-preview ${business ? "business-preview" : ""}`}>
      <div className="sample-nav">
        <b>{business ? "forma." : "botanical."}</b>
        <span>About　 Collection　 Contact</span>
        <ArrowUpRight size={12} />
      </div>
      <div className="sample-site-body">
        <div>
          <small>
            {business
              ? "Design for your everyday."
              : "A little green, a better day."}
          </small>
          <h3>
            {business ? (
              <>
                余白から、
                <br />
                心地よい暮らし。
              </>
            ) : (
              <>
                緑と暮らす。
                <br />
                毎日が、変わる。
              </>
            )}
          </h3>
          <p>
            {business
              ? "日常に寄り添う、小さなデザイン。"
              : "あなたの部屋に、ひとつの自然を。"}
          </p>
          <span className="sample-link">
            {business ? "私たちについて" : "植物を見つける"}{" "}
            <ArrowUpRight size={10} />
          </span>
        </div>
        <div className="plant-art">
          <div className="plant-stem" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <i key={i} className={`leaf leaf-${i}`} />
          ))}
          <div className="plant-pot" />
          <span className="plant-shadow" />
        </div>
      </div>
      <div className="sample-site-bottom">
        <span>Make room for nature.</span>
        <span>01 / 03</span>
      </div>
    </div>
  );
}

export function DashboardPreview({
  analytics = false,
}: {
  analytics?: boolean;
}) {
  return (
    <div className="dashboard-preview">
      <aside>
        <div className="app-mark">
          <Layers3 size={17} /> {analytics ? "insight" : "flow"}
        </div>
        <span className="side-selected">▦ ダッシュボード</span>
        <span>☑ マイタスク</span>
        <span>◷ カレンダー</span>
        <span>⚙ 設定</span>
        <small>Personal workspace</small>
      </aside>
      <div className="dashboard-main">
        <div className="dashboard-top">
          <b>{analytics ? "今月の振り返り" : "今日も、一歩前へ。"}</b>
          <span className="avatar">Y</span>
        </div>
        <p>自分のペースで、アイデアを形に。</p>
        <div className="stat-row">
          <div>
            <small>完了したタスク</small>
            <strong>
              24 <span>↗ 12%</span>
            </strong>
          </div>
          <div>
            <small>進行中のプロジェクト</small>
            <strong>03</strong>
          </div>
        </div>
        <div className="chart">
          <div className="chart-title">
            {analytics ? "アクティビティ" : "今週の進捗"}
            <span>Weekly</span>
          </div>
          <div className="chart-bars">
            {[36, 62, 44, 82, 68, 93, 74].map((h, i) => (
              <div key={i}>
                <i style={{ height: `${h}%` }} />
                <small>{["月", "火", "水", "木", "金", "土", "日"][i]}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="task-line">
          <Check size={12} /> Webサイトのアイデアをまとめる <span>完了</span>
        </div>
        <div className="task-line">
          <span className="task-circle" /> トップページをデザインする{" "}
          <span>進行中</span>
        </div>
      </div>
    </div>
  );
}

export function WorkflowPreview() {
  return (
    <div className="workflow-preview">
      <div className="workflow-top">
        <Sparkles size={17} />
        <b>毎日の仕事に、AIという相棒。</b>
        <span>Assistant</span>
      </div>
      <div className="chat-user">企画会議のメモを、わかりやすく整理して。</div>
      <div className="chat-answer">
        <span className="ai-icon">
          <Sparkles size={16} />
        </span>
        <div>
          <strong>大切なポイントをまとめました。</strong>
          <p>
            目的・アイデア・次のアクションの
            <br />
            3つに分けて整理しましょう。
          </p>
          <div className="chat-lines">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <div className="workflow-steps">
        <span>
          <Layers3 size={17} />
          情報を整理
        </span>
        <i />
        <span>
          <Code2 size={17} />
          資料を作成
        </span>
        <i />
        <span>
          <Check size={17} />
          内容を確認
        </span>
      </div>
      <div className="chat-input">
        次は、何を一緒につくりますか？ <ArrowUpRight size={15} />
      </div>
    </div>
  );
}

export function CloudPreview() {
  return (
    <div className="cloud-preview">
      <div className="cloud-label">Your idea, connected.</div>
      <svg className="connections" viewBox="0 0 500 330" aria-hidden="true">
        <path d="M250 72 V154 H100 V245 M250 154 H400 V245 M250 154 V245" />
      </svg>
      <div className="cloud-node main-node">
        <Cloud />
        <b>Cloud</b>
        <small>世界に公開する</small>
      </div>
      <div className="cloud-node web-node">
        <Globe2 />
        <b>Web app</b>
        <small>Next.js</small>
      </div>
      <div className="cloud-node data-node">
        <Database />
        <b>Database</b>
        <small>Supabase</small>
      </div>
      <div className="cloud-node api-node">
        <Zap />
        <b>AI / API</b>
        <small>アイデアをつなぐ</small>
      </div>
    </div>
  );
}

export function SceneVisual({ scene }: { scene: number }) {
  return (
    <div className={`scene-composition scene-${scene}`}>
      <div className="orbital orbital-one" />
      <div className="orbital orbital-two" />
      <div className="scene-platform" />
      <div className="scene-device">
        {scene === 0 ? (
          <>
            <div className="laptop-lid">
              <div className="camera" />
              <WebsitePreview />
            </div>
            <div className="laptop-base">
              <div />
            </div>
          </>
        ) : scene === 1 ? (
          <div className="floating-frame">
            <DashboardPreview />
          </div>
        ) : scene === 2 ? (
          <div className="floating-frame">
            <WorkflowPreview />
          </div>
        ) : (
          <CloudPreview />
        )}
      </div>
      <div className="float-card float-card-top">
        {scene === 0 ? (
          <>
            <span className="mini-icon blue">
              <Code2 size={19} />
            </span>
            <div>
              <b>アイデアを、コードに。</b>
              <small>AIと一緒につくる</small>
            </div>
            <span className="tiny-dots">•••</span>
          </>
        ) : scene === 1 ? (
          <>
            <span className="mini-icon teal">
              <Database size={19} />
            </span>
            <div>
              <b>データと、つながる。</b>
              <small>Database connected</small>
            </div>
            <i className="status-dot" />
          </>
        ) : scene === 2 ? (
          <>
            <span className="mini-icon blue">
              <BarChart3 size={19} />
            </span>
            <div>
              <b>考える時間を、もっと。</b>
              <small>毎日の作業をスマートに</small>
            </div>
          </>
        ) : (
          <>
            <span className="mini-icon teal">
              <Globe2 size={19} />
            </span>
            <div>
              <b>あなたの作品を、世界へ。</b>
              <small>Ready to deploy</small>
            </div>
          </>
        )}
      </div>
      <div className="float-card float-card-bottom">
        <span className="mini-icon lime">
          <Check size={18} />
        </span>
        <div>
          <b>
            {
              [
                "はじめてのWebサイト、完成。",
                "「あったらいいな」が動き出す。",
                "あなたらしい、働き方へ。",
                "小さくつくって、大きく育てる。",
              ][scene]
            }
          </b>
          <small>
            {
              [
                "Designed & built with AI",
                "Built from your own idea",
                "A smarter everyday workflow",
                "From local to the world",
              ][scene]
            }
          </small>
        </div>
      </div>
      <div className="sample-badge">学習でつくる作品のイメージ</div>
    </div>
  );
}
