export const objectives = [
  "AIを仕事で活用したい",
  "Webサイトをつくりたい",
  "Webアプリを開発したい",
  "AIを基礎から学びたい",
  "まだ決まっていない",
] as const;
export const experiences = [
  "未経験",
  "少し使ったことがある",
  "日常的に使っている",
] as const;
export const topicOptions = [
  "AIの基礎",
  "仕事への活用",
  "Webサイト制作",
  "アプリ開発",
  "クラウド・API",
] as const;
export type ContactData = {
  name: string;
  email: string;
  objective: string;
  experience: string;
  topics: string[];
  message: string;
  consent: boolean;
  website: string;
};
export type Errors = Partial<Record<keyof ContactData, string>>;
export function validateContact(raw: unknown): {
  data: ContactData | null;
  errors: Errors;
} {
  const r =
    typeof raw === "object" && raw !== null && !Array.isArray(raw)
      ? (raw as Record<string, unknown>)
      : {};
  const str = (key: string) =>
    typeof r[key] === "string" ? (r[key] as string).trim() : "";
  const data: ContactData = {
    name: str("name"),
    email: str("email"),
    objective: str("objective"),
    experience: str("experience"),
    topics: Array.isArray(r.topics)
      ? r.topics.filter((x): x is string => typeof x === "string")
      : [],
    message: str("message"),
    consent: r.consent === true,
    website: str("website"),
  };
  const errors: Errors = {};
  if (!data.name || data.name.length > 80)
    errors.name = "お名前を80文字以内で入力してください。";
  if (data.email.length > 254 || !/^\S+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "有効なメールアドレスを入力してください。";
  if (!objectives.includes(data.objective as (typeof objectives)[number]))
    errors.objective = "学習の目的を選んでください。";
  if (!experiences.includes(data.experience as (typeof experiences)[number]))
    errors.experience = "AIの経験を選んでください。";
  if (
    !Array.isArray(r.topics) ||
    data.topics.length > 5 ||
    r.topics.length !== data.topics.length ||
    data.topics.some(
      (t) => !topicOptions.includes(t as (typeof topicOptions)[number]),
    )
  )
    errors.topics = "学習内容を選択肢から選んでください。";
  if (typeof r.message !== "string" || data.message.length > 2000)
    errors.message = "メッセージは2,000文字以内で入力してください。";
  if (!data.consent) errors.consent = "個人情報の取り扱いへの同意が必要です。";
  if (data.website) errors.website = "送信内容を確認してください。";
  return { data: Object.keys(errors).length ? null : data, errors };
}
