declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
export function track(
  name: string,
  params: Record<string, string | number> = {},
) {
  window.gtag?.("event", name, params);
}
