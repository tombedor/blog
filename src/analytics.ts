const isPreview =
  typeof window !== 'undefined' && window.location.hostname === 'preview.tombedor.dev';

export function track(event: string, data?: Record<string, unknown>): void {
  if (isPreview) {
    console.log('[analytics]', event, data ?? {});
    return;
  }
  window.umami?.track(event, data);
}
