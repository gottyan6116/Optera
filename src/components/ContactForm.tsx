"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Info, LoaderCircle } from "lucide-react";
import {
  experiences,
  objectives,
  topicOptions,
  validateContact,
  type Errors,
} from "@/lib/validation";
import { track } from "@/lib/analytics";
export default function ContactForm({
  configured,
  formUrl,
}: {
  configured: boolean;
  formUrl?: string;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const started = useRef(false);
  const result = useRef<HTMLDivElement>(null);
  const focusResult = () =>
    requestAnimationFrame(() => result.current?.focus());
  async function submit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const values = {
      name: f.get("name"),
      email: f.get("email"),
      objective: f.get("objective"),
      experience: f.get("experience"),
      topics: f.getAll("topics"),
      message: f.get("message"),
      consent: f.get("consent") === "on",
      website: f.get("website"),
    };
    const validation = validateContact(values);
    setErrors(validation.errors);
    if (!validation.data) {
      setStatus("error");
      setMessage("入力内容をご確認ください。");
      const first = Object.keys(validation.errors)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    if (!configured) {
      setStatus("error");
      setMessage(
        "入力内容を確認しました。現在は確認用フォームです。相談内容は送信・保存されていません。",
      );
      focusResult();
      return;
    }
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      const data = await res.json();
      if (!res.ok || data.success !== true) {
        setStatus("error");
        setMessage(
          data.error ||
            "送信できませんでした。時間をおいてもう一度お試しください。",
        );
        if (data.errors) setErrors(data.errors);
      } else {
        setStatus("success");
        track("contact_form_submit_success");
        form.reset();
      }
    } catch {
      setStatus("error");
      setMessage(
        "通信できませんでした。インターネット接続を確認して、もう一度お試しください。",
      );
    }
    focusResult();
  }
  const error = (key: keyof Errors) =>
    errors[key] ? (
      <p className="field-error" id={`${key}-error`}>
        {errors[key]}
      </p>
    ) : null;
  return (
    <div className="contact-form-wrap">
      {!configured && (
        <div className="form-notice">
          <Info size={19} />
          <div>
            <b>現在は確認用フォームです</b>
            <p>
              相談受付は準備中です。入力確認を試せますが、内容は送信・保存されません。実際の個人情報は入力しないでください。
            </p>
          </div>
        </div>
      )}
      {formUrl && (
        <a
          className="external-form"
          href={formUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Googleフォームで相談する <ArrowUpRight size={16} />
        </a>
      )}
      {status === "success" ? (
        <div className="form-success" ref={result} role="status" tabIndex={-1}>
          <CheckCircle2 size={40} />
          <h2>ご相談を受け付けました。</h2>
          <p>入力いただいた内容を確認のうえ、ご案内します。</p>
          <Link className="button button-dark" href="/">
            ホームに戻る
          </Link>
        </div>
      ) : (
        <form
          method="post"
          action="/api/contact"
          onSubmit={submit}
          noValidate
          onFocus={() => {
            if (!started.current) {
              started.current = true;
              track("contact_form_start");
            }
          }}
        >
          <div className="form-row">
            <div className="field">
              <label htmlFor="name">
                お名前 <span>必須</span>
              </label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                maxLength={80}
                placeholder={configured ? "山田 花子" : "テスト 太郎"}
                required
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {error("name")}
            </div>
            <div className="field">
              <label htmlFor="email">
                メールアドレス <span>必須</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                placeholder="hello@example.com"
                required
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {error("email")}
            </div>
          </div>
          <div className="field">
            <label htmlFor="objective">
              いちばん学びたいこと <span>必須</span>
            </label>
            <select
              id="objective"
              name="objective"
              defaultValue=""
              required
              aria-invalid={!!errors.objective}
              aria-describedby={
                errors.objective ? "objective-error" : undefined
              }
            >
              <option value="" disabled>
                選んでください
              </option>
              {objectives.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            {error("objective")}
          </div>
          <div className="field">
            <label htmlFor="experience">
              現在のAIの経験 <span>必須</span>
            </label>
            <select
              id="experience"
              name="experience"
              defaultValue=""
              required
              aria-invalid={!!errors.experience}
              aria-describedby={
                errors.experience ? "experience-error" : undefined
              }
            >
              <option value="" disabled>
                選んでください
              </option>
              {experiences.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            {error("experience")}
          </div>
          <fieldset className="field topic-field">
            <legend>
              興味のある内容 <small>複数選択可・任意</small>
            </legend>
            <div>
              {topicOptions.map((t) => (
                <label key={t}>
                  <input type="checkbox" name="topics" value={t} />
                  {t}
                </label>
              ))}
            </div>
            {error("topics")}
          </fieldset>
          <div className="field">
            <label htmlFor="message">
              相談したいこと <small>任意</small>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              maxLength={2000}
              placeholder="つくってみたいものや、学習について気になることをお聞かせください。"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            <span className="field-help">
              2,000文字以内。まだ具体的に決まっていなくても大丈夫です。
            </span>
            {error("message")}
          </div>
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <label className="consent">
            <input
              type="checkbox"
              name="consent"
              required
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
            />
            <span>
              <Link href="/privacy" target="_blank">
                個人情報の取り扱い（別タブ）
              </Link>
              を確認し、同意します。
            </span>
          </label>
          {error("consent")}
          {status === "error" && (
            <div
              className="form-status"
              ref={result}
              role="alert"
              tabIndex={-1}
            >
              {message}
            </div>
          )}
          <button
            type="submit"
            className="button button-dark form-submit"
            disabled={!ready || status === "sending"}
          >
            {status === "sending" ? (
              <>
                <LoaderCircle className="spinner" size={17} />
                確認中…
              </>
            ) : (
              <>
                {configured
                  ? "相談内容を送信する"
                  : "入力内容を確認する（確認用）"}
                <ArrowUpRight size={18} />
              </>
            )}
          </button>
          <noscript>
            <p className="form-notice">
              フォームの入力確認にはJavaScriptを有効にしてください。
            </p>
          </noscript>
          <p className="form-bottom-note">
            {configured
              ? "ご相談の送信だけで、受講のお申し込みが確定することはありません。"
              : "確認用の入力内容はブラウザーを閉じると失われます。"}
          </p>
        </form>
      )}
    </div>
  );
}
