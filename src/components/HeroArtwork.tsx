import { DashboardPreview, WorkflowPreview, CloudPreview } from "./Showcase";

function Portfolio() {
  return (
    <div className="portfolio-canvas">
      <div className="portfolio-nav">
        <b>
          mori<span> / </span>design
        </b>
        <span>About　 Works　 Contact</span>
      </div>
      <div className="portfolio-content">
        <div>
          <span className="portfolio-overline">Ideas into everyday.</span>
          <h3>
            小さなアイデアを、
            <br />
            かたちにする。
          </h3>
          <p>
            デザインとテクノロジーで、
            <br />
            暮らしに新しい選択肢を。
          </p>
          <span className="portfolio-discover">
            Explore our works <span>↗</span>
          </span>
        </div>
        <div className="portfolio-sculpture">
          <span className="sculpture-ball" />
          <span className="sculpture-arch" />
          <span className="sculpture-block" />
          <span className="sculpture-floor" />
        </div>
      </div>
      <div className="portfolio-works">
        <span>Selected works</span>
        <i />
        <b>01 — 03</b>
      </div>
    </div>
  );
}

export default function HeroArtwork({ scene }: { scene: number }) {
  return (
    <div className={`scene-composition academy-scene academy-scene-${scene}`}>
      <div className="device-ground" />
      <div className="scene-device academy-device">
        {scene < 3 ? (
          <>
            <div className="academy-laptop-screen">
              <span className="device-camera" />
              {scene === 0 ? (
                <Portfolio />
              ) : scene === 1 ? (
                <DashboardPreview />
              ) : (
                <WorkflowPreview />
              )}
            </div>
            <div className="academy-keyboard">
              <div className="keyboard-keys">
                {Array.from({ length: 48 }, (_, i) => (
                  <i key={i} />
                ))}
              </div>
              <div className="keyboard-trackpad" />
            </div>
            <div className="academy-laptop-lip" />
          </>
        ) : (
          <CloudPreview />
        )}
      </div>
      {scene === 0 && (
        <div className="academy-phone">
          <span />
          <div className="phone-page">
            <b>mori / design</b>
            <div className="phone-art">
              <i />
              <i />
            </div>
            <h4>
              小さなアイデアを、
              <br />
              かたちにする。
            </h4>
            <p>Ideas into everyday.</p>
            <div className="phone-projects">
              <i />
              <i />
            </div>
          </div>
          <i className="phone-home" />
        </div>
      )}
      <div className="device-annotation">
        <span />
        {
          [
            "Webサイトも、スマートフォンも。",
            "あなたの「欲しい」を、動くアプリに。",
            "調べる・考える・まとめるを、AIと。",
            "アイデアを支える、つながる仕組み。",
          ][scene]
        }
      </div>
      <span className="academy-sample-note">
        画面は学習用の制作イメージです
      </span>
    </div>
  );
}
