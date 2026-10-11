# OPTERA

日本語のAI学習サービス紹介サイト。Next.js App Router / TypeScript / React / Lucide / CSS 3D。

## 起動

Node.js 20.9以上（検証環境: Node.js 24.14.0）、npmを使用します。

```powershell
npm ci
npm run dev -- --port 3100
```

http://127.0.0.1:3100 を開いてください。別プロジェクトが3000番を使用していたため、3100番で検証しています。

```powershell
npm run typecheck
npm test
npm run build
npm start -- --port 3100
```

ブラウザーテストはWindowsのインストール済みMicrosoft Edgeを使用します。別環境では `PLAYWRIGHT_CHANNEL=chromium` を設定し、`npx playwright install chromium` を実行してください。既存の本番サーバーをテストする場合は `PLAYWRIGHT_BASE_URL` を指定できます。

## 実装

- 4場面のCSS 3Dカルーセル。サイト／アプリ／AI業務支援／クラウド。HTMLで制作した画面を立体配置しています。WebGL・重量モデルは不要です。
- 初期入場、浮遊、マウス視差、方向付き奥行き遷移、矢印、フォーカス中の左右キー、ドラッグ・タッチスワイプ。
- 8.5秒間隔の自動再生。フォーカス、ホバー、タッチ操作、非表示、画面外、明示的停止、動きを減らす設定では停止。
- 指定の12セクション、6つの学習用制作サンプル、3段階カリキュラム、ネイティブFAQ。
- `/contact`、`/privacy`、サーバー側入力検証を行う `/api/contact`。
- 入力同意、ハニーポット、16KB本文上限、Origin確認、転送の10秒制限、外部転送先のHTTPS・認証・リダイレクト拒否。
- 日本語メタデータ。実ドメイン設定時のみcanonical・OG画像URL・sitemapが有効。未設定時はrobotsでインデックスを禁止。
- 既存の透明PNGロゴを変更せず使用。CSSで余白を表示範囲外に置いています。
- GA4は有効なID設定後、利用者が解析を許可したときのみロード。個人情報をイベントへ渡しません。

## 環境変数

`.env.example` を `.env.local` へコピーし、実際の値を設定してください。秘密情報をGitへコミットしないでください。

| 変数                    | 用途                                                      |
| ----------------------- | --------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | 本番のHTTPSオリジン。空ならプレビューとして検索登録を禁止 |
| `NEXT_PUBLIC_GA4_ID`    | 任意の実在するGA4 ID（G-から始まる値）                    |
| `CONTACT_WEBHOOK_URL`   | サーバー専用のHTTPS相談受付先                             |
| `CONTACT_WEBHOOK_TOKEN` | 受付先へBearer認証で渡す秘密トークン                      |
| `CONTACT_PRIVACY_READY` | 運営者が個人情報ページを正式内容に更新後にのみ `true`     |
| `GOOGLE_FORM_URL`       | 任意の実在するGoogle Forms URL                            |

**現在は送信先未設定です。フォームはブラウザー内で入力検証のみ行い、入力した個人情報を送信・保存しません。** APIを直接呼び出しても、未設定なら503を返し、受信成功を表示しません。確認用には架空のテストデータだけを使ってください。

### 受付先の契約

本番フォームはサーバーから `CONTACT_WEBHOOK_URL` にJSONでPOSTします。`Authorization: Bearer <CONTACT_WEBHOOK_TOKEN>` を送ります。

```json
{
  "name": "入力された氏名",
  "email": "利用者のメールアドレス",
  "objective": "選択された目的",
  "experience": "選択された経験",
  "topics": ["選択された学習内容"],
  "message": "任意のメッセージ",
  "consent": true,
  "website": "",
  "source": "optera-consultation",
  "submittedAt": "ISO 8601 UTC"
}
```

受付先は**永続的な保存／受付を確認してから2xxを返す**必要があります。認証失敗や保存失敗では非2xxを返してください。ブラウザーは非2xx・通信失敗を成功として扱いません。タイムアウト後の再試行で重複する可能性があるため、受付先で重複整理を行ってください。送信先接続・実メール通知・本番成功状態は、資格情報がないため実環境では未検証です。

Supabaseへの直接接続は導入していません。利用する場合はこの受付先をSupabase Edge Function等で構築し、サービス用鍵をブラウザーへ公開せず、テーブルへの一般アクセスを拒否してください。

## Vercel公開

1. このプロジェクトを自分のGitリポジトリへ配置し、VercelにImportします。
2. Framework presetはNext.js、Root Directoryは本プロジェクト、Build Commandは `npm run build`。
3. Previewは送信先・ドメイン変数を空に保ち、確認用として扱います。
4. Productionに実ドメインと必要な環境変数を設定。公開前に下の事業情報を確定し、プライバシーページを更新してください。
5. 受付先をテストし、永続保存と正しい応答を確認後、`CONTACT_PRIVACY_READY=true` にして再デプロイ。
6. ホスティング側WAFのレート制限・Bot対策を `/api/contact` に設定してください。分散環境で有効なレート制限はアプリ内には実装していません。
7. 実ドメインで相談の成功・失敗、通知、OG画像、robots、sitemap、モバイル表示を再確認します。

参照: [Next.js公式インストールガイド](https://nextjs.org/docs/app/getting-started/installation)。公開操作は今回実施していません。

## 公開前に必要な事業情報

- 正式な運営者名・問い合わせ先・本番ドメイン
- 確定した講座内容、受講形式、日程、料金、サポート範囲
- 個人情報の保存先・保管期間・委託先・削除等の窓口
- 相談の実受付先と認証情報（またはGoogle Forms URL）
- 解析を使う場合の実IDと案内内容

架空の料金・受講生実績・提携・受付先は設定していません。事業情報は `src/data/content.ts`、`src/components/Sections.tsx`、`src/app/privacy/page.tsx` で更新できます。

## 構成

`src/components/Hero.tsx` が操作状態、`HeroArtwork.tsx` がヒーローの立体端末、`Showcase.tsx` がサンプル画面部品、`LearningDiagram.tsx` がPC・モバイル別のカリキュラム図解、`src/data/content.ts` が学習内容、`src/lib/validation.ts` が共通検証、`src/app/api/contact/route.ts` が受付処理です。スタイルは基盤・セクション・フォーム・今回のFV改訂に分割しています。

FVは依頼により白基調へ改訂しました。JAPAN AIとSHIFT AIの見出し・製品ビジュアルの優先順位を参考にし、第三者の画像や実績は転載していません。カリキュラムは小さなアイコンカードから、学ぶ内容とアウトプットを示すオリジナル図解へ変更しています。

## 検証と制限

ブラウザー操作、レスポンシブ表示、reduced-motion、JS無効の本文・FAQ、入力エラー、未設定時の非送信、Origin・容量・同意チェックを自動テストで確認します。実端末Safari・Firefoxや低性能スマートフォンでの性能測定、本番Core Web Vitals、Lighthouseスコアの保証はしていません。日本語フォントはGoogle Fontsから `display=swap` で読み込み、失敗時はシステムフォントへフォールバックします。

WebGL不使用のため別の3Dランタイムを遅延ロードする必要はありません。CSS transforms中心の軽量構成です。フォーム送信にはJavaScriptが必要です。講座購入・会員ログイン機能は今回のサイト紹介・相談受付スコープには含みません。
