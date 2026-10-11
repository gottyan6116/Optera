export function siteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  try {
    if (!value) return undefined;
    const url = new URL(value);
    return url.protocol === "https:" ? url.origin : undefined;
  } catch {
    return undefined;
  }
}
export function contactConfigured() {
  try {
    return (
      new URL(process.env.CONTACT_WEBHOOK_URL || "").protocol === "https:" &&
      !!process.env.CONTACT_WEBHOOK_TOKEN &&
      process.env.CONTACT_PRIVACY_READY === "true"
    );
  } catch {
    return false;
  }
}
export function googleFormUrl() {
  try {
    const url = new URL(process.env.GOOGLE_FORM_URL || "");
    return url.protocol === "https:" &&
      ["docs.google.com", "forms.gle"].includes(url.hostname)
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}
