const ink = "#172033";
const blue = "#2f6bff";
const teal = "#139989";

function WindowFrame({
  x,
  y,
  width,
  height,
  title,
  children,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x="5"
        y="7"
        width={width}
        height={height}
        rx="9"
        fill="#172033"
        opacity=".06"
      />
      <rect
        width={width}
        height={height}
        rx="9"
        fill="white"
        stroke="#cbd7e5"
      />
      <path d={`M0 32H${width}`} stroke="#dce4ee" />
      <circle cx="13" cy="16" r="3" fill="#cbd7e5" />
      <circle cx="24" cy="16" r="3" fill="#cbd7e5" />
      <circle cx="35" cy="16" r="3" fill="#cbd7e5" />
      <text
        x={width / 2 + 12}
        y="20"
        textAnchor="middle"
        fontSize="9"
        fill="#64758a"
      >
        {title}
      </text>
      {children}
    </g>
  );
}

function MobileDiagram({ step, label }: { step: number; label: string }) {
  return (
    <svg
      className="learning-diagram mobile-learning-diagram"
      viewBox="0 0 340 250"
      role="img"
      aria-label={label}
    >
      <text
        x="170"
        y="26"
        textAnchor="middle"
        fontSize="12"
        fill={ink}
        fontWeight="600"
      >
        {
          [
            "伝える → 確かめる → 活用する",
            "考える → つくる → 公開する",
            "画面と、仕組みをつなげる",
          ][step]
        }
      </text>
      {step < 2 ? (
        <>
          <WindowFrame
            x={12}
            y={48}
            width={131}
            height={154}
            title={step === 0 ? "AIへの指示" : "アイデアの設計"}
          >
            <text x="12" y="56" fontSize="11" fill={ink} fontWeight="600">
              {step === 0 ? "企画を考えたい" : "自分のサイト"}
            </text>
            {step === 0 ? (
              <>
                {["目的を伝える", "相手を伝える", "条件を伝える"].map(
                  (s, i) => (
                    <g key={s}>
                      <circle cx="17" cy={79 + i * 24} r="5" fill={blue} />
                      <text x="30" y={83 + i * 24} fontSize="10" fill="#506177">
                        {s}
                      </text>
                    </g>
                  ),
                )}
              </>
            ) : (
              <>
                <rect x="13" y="71" width="105" height="21" fill="#dcece2" />
                <rect x="13" y="101" width="45" height="36" fill="#dcece2" />
                <path
                  d="M68 106h45m-45 12h45m-45 12h32"
                  stroke="#96b9a5"
                  strokeWidth="3"
                />
              </>
            )}
          </WindowFrame>
          <path
            d="M151 124h31m-6-5 6 5-6 5"
            fill="none"
            stroke={step === 0 ? blue : teal}
            strokeWidth="2"
          />
          <WindowFrame
            x={193}
            y={48}
            width={135}
            height={154}
            title={step === 0 ? "AIの回答" : "Webサイト"}
          >
            <text x="12" y="57" fontSize="11" fill={ink} fontWeight="600">
              {step === 0 ? "企画のたたき台" : "好きなことを、"}
            </text>
            {step === 0 ? (
              <>
                {["誰に届ける？", "何を伝える？", "どう進める？"].map(
                  (s, i) => (
                    <text
                      key={s}
                      x="12"
                      y={84 + i * 24}
                      fontSize="10"
                      fill="#506177"
                    >
                      {i + 1}. {s}
                    </text>
                  ),
                )}
              </>
            ) : (
              <>
                <text x="12" y="75" fontSize="11" fill={ink} fontWeight="600">
                  仕事のかたちに。
                </text>
                <rect
                  x="12"
                  y="88"
                  width="110"
                  height="43"
                  fill="#c9ddc6"
                  rx="3"
                />
                <path d="M35 131l24-39 27 39" fill="#6d9c80" />
                <circle cx="103" cy="102" r="9" fill="#eef3d8" />
              </>
            )}
          </WindowFrame>
          <rect
            x="54"
            y="218"
            width="232"
            height="25"
            rx="4"
            fill={step === 0 ? blue : teal}
          />
          <text x="170" y="234" textAnchor="middle" fontSize="10" fill="white">
            {step === 0
              ? "自分で内容を確かめて、仕事に活かす"
              : "PC・スマートフォンで見られるサイトへ"}
          </text>
        </>
      ) : (
        <>
          <WindowFrame
            x={12}
            y={87}
            width={135}
            height={112}
            title="自分のWebアプリ"
          >
            <text x="12" y="55" fontSize="11" fill={ink} fontWeight="600">
              今日のタスク
            </text>
            <rect x="12" y="67" width="109" height="15" fill="#e3edfc" />
            <rect x="12" y="89" width="109" height="10" fill="#edf2f8" />
          </WindowFrame>
          <path
            d="M147 142h31V66h22m-22 76h22m-22 0v67h22"
            fill="none"
            stroke={blue}
            strokeWidth="1.5"
          />
          {[
            ["データの保存", "記録を残す"],
            ["ログイン機能", "利用者を守る"],
            ["AIとの連携", "できることを増やす"],
          ].map(([title, sub], i) => (
            <g transform={`translate(202 ${43 + i * 71})`} key={title}>
              <rect
                width="124"
                height="49"
                rx="5"
                fill="white"
                stroke="#bbcee5"
              />
              <text x="12" y="20" fontSize="11" fill={ink} fontWeight="600">
                {title}
              </text>
              <text x="12" y="37" fontSize="9" fill="#657e99">
                {sub}
              </text>
            </g>
          ))}
        </>
      )}
    </svg>
  );
}

export default function LearningDiagram({ step }: { step: number }) {
  const labels = [
    "目的を伝え、AIの回答を確認して仕事で使えるアウトプットに整える図",
    "アイデアを設計し、AIと一緒にWebサイトを制作して公開する図",
    "Webアプリをデータベース・認証・AIとつなぐ構成図",
  ];
  return (
    <>
      <svg
        className="learning-diagram desktop-learning-diagram"
        viewBox="0 0 600 320"
        role="img"
        aria-label={labels[step]}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker
            id={`arrow-${step}`}
            markerWidth="7"
            markerHeight="7"
            refX="5"
            refY="3.5"
            orient="auto"
          >
            <path
              d="M0 0L6 3.5L0 7"
              fill="none"
              stroke={step === 1 ? teal : blue}
              strokeWidth="1.3"
            />
          </marker>
          <pattern
            id={`grid-${step}`}
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r=".7" fill="#b2c6df" opacity=".55" />
          </pattern>
        </defs>
        <rect width="600" height="320" fill={`url(#grid-${step})`} />
        {step === 0 ? (
          <>
            <text x="35" y="34" fill={ink} fontSize="12" fontWeight="600">
              伝え方が変わると、答えも変わる。
            </text>
            <WindowFrame
              x={32}
              y={67}
              width={214}
              height={191}
              title="あなたからの指示"
            >
              <rect
                x="15"
                y="47"
                width="184"
                height="54"
                rx="5"
                fill="#edf3ff"
              />
              <text x="26" y="67" fontSize="11" fill={ink}>
                新しい企画のアイデアを
              </text>
              <text x="26" y="84" fontSize="11" fill={ink}>
                一緒に考えてください。
              </text>
              {["目的を伝える", "相手を伝える", "条件を伝える"].map((t, i) => (
                <g key={t}>
                  <circle cx="23" cy={120 + i * 22} r="6" fill={blue} />
                  <path
                    d={`M20 ${120 + i * 22}l2 2 4-4`}
                    fill="none"
                    stroke="white"
                    strokeWidth="1.3"
                  />
                  <text x="38" y={124 + i * 22} fontSize="10" fill="#506177">
                    {t}
                  </text>
                </g>
              ))}
            </WindowFrame>
            <path
              d="M262 159H327"
              fill="none"
              stroke={blue}
              strokeWidth="2"
              markerEnd={`url(#arrow-${step})`}
            />
            <text x="293" y="142" fontSize="9" fill={blue} textAnchor="middle">
              AIと対話
            </text>
            <WindowFrame
              x={347}
              y={53}
              width={221}
              height={209}
              title="使えるアウトプット"
            >
              <text x="20" y="59" fontSize="13" fill={ink} fontWeight="700">
                企画のたたき台
              </text>
              <path d="M20 73H199" stroke="#dce5f0" />
              {["誰に届ける？", "何を伝える？", "どう実行する？"].map(
                (t, i) => (
                  <g key={t}>
                    <rect
                      x="20"
                      y={88 + i * 31}
                      width="21"
                      height="20"
                      rx="4"
                      fill="#edf3ff"
                    />
                    <text
                      x="30.5"
                      y={102 + i * 31}
                      textAnchor="middle"
                      fontSize="9"
                      fill={blue}
                    >
                      {i + 1}
                    </text>
                    <text x="51" y={101 + i * 31} fontSize="10" fill={ink}>
                      {t}
                    </text>
                  </g>
                ),
              )}
              <rect
                x="20"
                y="181"
                width="179"
                height="4"
                rx="2"
                fill="#dbe6f4"
              />
            </WindowFrame>
            <g transform="translate(412 232) rotate(-9)">
              <rect width="151" height="41" rx="5" fill={blue} />
              <path
                d="M14 20l5 5 10-11"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
              <text x="40" y="25" fontSize="10" fill="white">
                最後は、自分で確かめる
              </text>
            </g>
            <text
              x="300"
              y="302"
              textAnchor="middle"
              fontSize="10"
              fill="#62758f"
            >
              調べる・要約する・資料をつくる。身近な仕事から実践。
            </text>
          </>
        ) : step === 1 ? (
          <>
            <text x="35" y="34" fill={ink} fontSize="12" fontWeight="600">
              頭の中のイメージを、画面にする。
            </text>
            <g transform="translate(30 98) rotate(-6 56 65)">
              <rect
                x="4"
                y="6"
                width="115"
                height="132"
                rx="3"
                fill="#172033"
                opacity=".06"
              />
              <rect
                width="115"
                height="132"
                rx="3"
                fill="white"
                stroke="#a9c9bd"
              />
              <rect
                x="38"
                y="-6"
                width="42"
                height="13"
                fill="#b5dccc"
                opacity=".8"
              />
              <text x="15" y="32" fontSize="11" fill={ink} fontWeight="600">
                つくりたいサイト
              </text>
              <rect x="15" y="47" width="85" height="20" fill="#e8f2ed" />
              <rect x="15" y="75" width="39" height="33" fill="#e8f2ed" />
              <path
                d="M64 80h34m-34 10h34m-34 10h24"
                stroke="#91b9a7"
                strokeWidth="3"
              />
              <text x="16" y="124" fontSize="8" fill="#608773">
                まずは、ラフでOK。
              </text>
            </g>
            <path
              d="M162 161H200"
              fill="none"
              stroke={teal}
              strokeWidth="2"
              markerEnd={`url(#arrow-${step})`}
            />
            <WindowFrame
              x={219}
              y={60}
              width={276}
              height={192}
              title="AIと一緒に制作・確認"
            >
              <rect
                x="12"
                y="43"
                width="252"
                height="136"
                rx="2"
                fill="#f4f4ed"
              />
              <text
                x="26"
                y="61"
                fill="#3e5b4b"
                fontSize="11"
                fontFamily="Georgia"
              >
                my portfolio.
              </text>
              <text x="26" y="96" fill="#2f483b" fontSize="17" fontWeight="600">
                好きなことを、
              </text>
              <text
                x="26"
                y="122"
                fill="#2f483b"
                fontSize="17"
                fontWeight="600"
              >
                仕事のかたちに。
              </text>
              <rect
                x="26"
                y="141"
                width="58"
                height="14"
                rx="2"
                fill="#3e6957"
              />
              <rect
                x="162"
                y="78"
                width="80"
                height="78"
                rx="40"
                fill="#c5d8bc"
              />
              <path d="M171 156l31-56 32 56" fill="#6b927e" />
              <circle cx="222" cy="93" r="10" fill="#e4edcc" />
            </WindowFrame>
            <g transform="translate(467 138)">
              <rect width="81" height="137" rx="11" fill={ink} />
              <rect x="4" y="5" width="73" height="126" rx="8" fill="#f4f4ed" />
              <rect x="27" y="8" width="28" height="4" rx="2" fill={ink} />
              <text x="12" y="36" fontSize="8" fill="#3e5b4b">
                my portfolio.
              </text>
              <rect
                x="12"
                y="47"
                width="57"
                height="44"
                rx="3"
                fill="#c5d8bc"
              />
              <path d="M17 107h46m-46 9h35" stroke="#91b9a7" strokeWidth="3" />
            </g>
            <g transform="translate(239 260)">
              <circle cx="9" cy="9" r="8" fill={teal} />
              <path
                d="M5 9l3 3 5-6"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
              />
              <text x="25" y="13" fontSize="10" fill={teal}>
                スマートフォンにも対応して公開
              </text>
            </g>
            <text
              x="300"
              y="302"
              textAnchor="middle"
              fontSize="10"
              fill="#62758f"
            >
              デザイン → 制作 → 動作確認 → 公開までを経験。
            </text>
          </>
        ) : (
          <>
            <text x="35" y="34" fill={ink} fontSize="12" fontWeight="600">
              画面の向こうに、動く仕組みを。
            </text>
            <path
              d="M305 125V80H468m-163 84h163m-163 48v43h163"
              fill="none"
              stroke={blue}
              strokeWidth="1.6"
              strokeDasharray="5 4"
            />
            <WindowFrame
              x={31}
              y={86}
              width={259}
              height={158}
              title="あなたのWebアプリ"
            >
              <text x="17" y="59" fill={ink} fontSize="13" fontWeight="700">
                今日のタスク
              </text>
              <rect
                x="17"
                y="75"
                width="225"
                height="22"
                rx="3"
                fill="#eff4fd"
              />
              <rect x="24" y="81" width="9" height="9" rx="2" fill={blue} />
              <text x="42" y="90" fontSize="9" fill={ink}>
                アイデアをまとめる
              </text>
              <rect
                x="17"
                y="104"
                width="225"
                height="22"
                rx="3"
                fill="#f5f7fa"
              />
              <rect
                x="24"
                y="110"
                width="9"
                height="9"
                rx="2"
                fill="none"
                stroke="#9aacc3"
              />
              <text x="42" y="119" fontSize="9" fill={ink}>
                最初のページをつくる
              </text>
              <rect
                x="17"
                y="139"
                width="98"
                height="3"
                rx="1"
                fill="#cedbeb"
              />
            </WindowFrame>
            <path
              d="M290 165H344"
              fill="none"
              stroke={blue}
              strokeWidth="2"
              markerEnd={`url(#arrow-${step})`}
            />
            {[
              ["データを保存", "Supabase / SQL", 64],
              ["利用者を守る", "ログイン・認証", 150],
              ["AIとつながる", "API連携", 236],
            ].map(([title, sub, y], i) => (
              <g transform={`translate(372 ${Number(y) - 20})`} key={title}>
                <rect
                  x="4"
                  y="5"
                  width="197"
                  height="64"
                  rx="7"
                  fill="#172033"
                  opacity=".05"
                />
                <rect
                  width="197"
                  height="64"
                  rx="7"
                  fill="white"
                  stroke="#b9cce6"
                />
                {i === 0 ? (
                  <g fill="#e5efff" stroke={blue} strokeWidth="1.4">
                    <path d="M19 21v24c0 8 29 8 29 0V21" />
                    <ellipse cx="34" cy="21" rx="15" ry="6" />
                    <path d="M19 33c0 8 29 8 29 0" />
                  </g>
                ) : i === 1 ? (
                  <g fill="none" stroke={blue} strokeWidth="1.5">
                    <rect
                      x="20"
                      y="28"
                      width="27"
                      height="22"
                      rx="3"
                      fill="#e5efff"
                    />
                    <path d="M26 28v-7a8 8 0 0116 0v7" />
                    <circle cx="34" cy="38" r="2" />
                  </g>
                ) : (
                  <g fill="none" stroke={blue} strokeWidth="1.5">
                    <path d="M26 20l-10 12 10 12m17-24l10 12-10 12m-6-29l-6 34" />
                  </g>
                )}
                <text x="64" y="27" fontSize="12" fill={ink} fontWeight="600">
                  {title}
                </text>
                <text x="64" y="45" fontSize="9" fill="#637c9b">
                  {sub}
                </text>
              </g>
            ))}
            <text
              x="300"
              y="309"
              textAnchor="middle"
              fontSize="10"
              fill="#62758f"
            >
              「表示する」から、「保存する・つながる・動く」へ。
            </text>
          </>
        )}
      </svg>
      <MobileDiagram step={step} label={labels[step]} />
    </>
  );
}
