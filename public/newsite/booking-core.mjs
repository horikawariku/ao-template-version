export const BOOKING_BASE = 'https://redirect-tracker-eta.vercel.app/api/redirect?p=ao&s=direct';
export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid'];
export const localDateKey = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
export const dayValue = key => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(key || '')) return NaN;
  const [y, m, d] = key.split('-').map(Number);
  const utc = Date.UTC(y, m - 1, d);
  const date = new Date(utc);
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d ? utc : NaN;
};
export const nightsBetween = (start, end) => Math.round((dayValue(end) - dayValue(start)) / 86400000);
export function mergeAttribution(previous, query) {
  const clean = {};
  UTM_KEYS.forEach(key => {
    if (typeof previous?.[key] === 'string' && previous[key]) clean[key] = previous[key];
    const current = query.get(key);
    if (current) clean[key] = current;
  });
  return clean;
}
export function reservationUrl({start = '', end = '', cta = 'sticky', attribution = {}} = {}) {
  const url = new URL(BOOKING_BASE);
  if (attribution.utm_source) url.searchParams.set('s', attribution.utm_source);
  if (attribution.fbclid) url.searchParams.set('fbclid', attribution.fbclid);
  const dated = nightsBetween(start, end) > 0;
  url.searchParams.set('cta', dated ? `${cta}_date` : cta);
  if (dated) {
    url.searchParams.set('start_date', start);
    url.searchParams.set('end_date', end);
  }
  return url.toString();
}
