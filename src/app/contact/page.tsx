import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { contactConfigured, googleFormUrl, siteUrl } from "@/lib/config";
export const metadata: Metadata = {
  title: "無料相談",
  alternates: siteUrl() ? { canonical: `${siteUrl()}/contact` } : undefined,
};
export const dynamic = "force-dynamic";
export default function ContactPage() {
  return (
    <>
      <main id="main" className="contact-page">
        <div className="container">
          <Link href="/" className="back-link">
            <ArrowLeft size={14} />
            ホームに戻る
          </Link>
          <div className="contact-grid">
            <div className="contact-intro">
              <p className="section-label">Let’s find your possibilities.</p>
              <h1>
                あなたの「やってみたい」を、
                <br />
                聞かせてください。
              </h1>
              <p>
                AIのこと、学び方のこと、つくりたいもののこと。
                <br />
                まずは、今の気持ちからで大丈夫です。
              </p>
              <div className="contact-aside">
                <MessageCircle size={24} />
                <h2>最初の一歩を、一緒に。</h2>
                <p>
                  学習の目的や経験をもとに、
                  <br />
                  あなたに合った学び方を考えるための相談窓口です。
                </p>
              </div>
            </div>
            <ContactForm
              configured={contactConfigured()}
              formUrl={googleFormUrl()}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
