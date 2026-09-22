import {UTM_KEYS, localDateKey, nightsBetween, mergeAttribution, reservationUrl} from './booking-core.mjs';

const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));
const today = new Date();
const todayKey = localDateKey(today);
let viewMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const firstMonth = viewMonth.getTime();
const state = {start: '', end: '', cta: 'sticky', selecting: 'start'};
let attribution = {};

// Airhostの日別最低料金 (redirect-tracker経由・24hキャッシュ)。取得失敗時は価格表示なしで通常動作。
const RATES_URL = 'https://redirect-tracker-eta.vercel.app/api/rates/ao';
const PRICE_DIVISOR = 10; // 1名あたり = 1棟料金 ÷ 最大10名 (RATESセクションの「1名あたりの料金目安」と同じ換算)
let perNight = {};
const perPersonLabel = key => {
  const total = perNight[key];
  if (!total) return '';
  const pp = Math.round(total / PRICE_DIVISOR / 100) * 100; // 100円単位に四捨五入 (RATESセクションの¥9,800〜表記と同じ丸め)
  return pp >= 10000 ? `¥${String(Math.floor(pp / 1000) / 10).replace(/\.0$/, '')}万〜` : `¥${pp.toLocaleString('ja-JP')}〜`;
};

// Same source propagation and 30-day first-party cookie as the original AO site.
// No production page-view beacon or new advertising pixels are added to this separate design.
try {
  const entry = document.cookie.split('; ').find(value => value.startsWith('ao_utm='));
  const previous = entry ? JSON.parse(decodeURIComponent(entry.slice('ao_utm='.length))) : {};
  attribution = mergeAttribution(previous, new URL(location.href).searchParams);
} catch {
  attribution = mergeAttribution({}, new URL(location.href).searchParams);
}
try {
  const currentUrl = new URL(location.href);
  const incoming = UTM_KEYS.some(key => currentUrl.searchParams.get(key));
  if (incoming && Object.keys(attribution).length) {
    document.cookie = `ao_utm=${encodeURIComponent(JSON.stringify(attribution))}; path=/; max-age=${30 * 86400}; samesite=lax${location.protocol === 'https:' ? '; secure' : ''}`;
  }
  let changed = false;
  UTM_KEYS.forEach(key => {
    if (attribution[key] && !currentUrl.searchParams.has(key)) { currentUrl.searchParams.set(key, attribution[key]); changed = true; }
  });
  if (changed) history.replaceState(history.state, '', currentUrl.toString());
} catch { /* Booking still works when browser storage is unavailable. */ }

$$('[data-keep-attribution]').forEach(link => {
  const target = new URL(link.getAttribute('href'), location.href);
  UTM_KEYS.forEach(key => { if (attribution[key]) target.searchParams.set(key, attribution[key]); });
  link.href = target.toString();
});

function closeDialog(dialog) { if (dialog?.open) dialog.close(); }
function openDialog(dialog) {
  $$('dialog[open]').forEach(closeDialog);
  dialog.showModal();
}
$$('[data-close-dialog]').forEach(button => button.addEventListener('click', () => closeDialog(button.closest('dialog'))));
$$('dialog').forEach(dialog => {
  let startedOutside = false;
  const outside = e => { const r = dialog.getBoundingClientRect(); return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom; };
  dialog.addEventListener('pointerdown', e => { startedOutside = e.target === dialog && outside(e); });
  dialog.addEventListener('click', e => { if (startedOutside && e.target === dialog && outside(e)) closeDialog(dialog); startedOutside = false; });
});
$$('[data-open-menu]').forEach(button => button.addEventListener('click', () => openDialog($('#menu-dialog'))));
$$('[data-open-sauna]').forEach(button => button.addEventListener('click', () => {
  const dialog = $('#sauna-dialog');
  openDialog(dialog);
  dialog.scrollTop = 0;
}));
$$('.menu-nav a').forEach(link => link.addEventListener('click', () => closeDialog($('#menu-dialog'))));

const shortDate = key => { if (!key) return '日付を選択'; const [year, month, date] = key.split('-').map(Number); return `${month}月${date}日`; };
const compactDate = key => { const [, month, date] = key.split('-').map(Number); return `${month}/${date}`; };
const displayDate = key => `${key.slice(0, 4)}年${shortDate(key)}`;
const hasRange = () => nightsBetween(state.start, state.end) > 0;

function renderBookingSummary() {
  $('#selected-start').textContent = shortDate(state.start);
  $('#selected-end').textContent = shortDate(state.end);
  $('#select-start').classList.toggle('is-selecting', state.selecting === 'start');
  $('#select-end').classList.toggle('is-selecting', state.selecting === 'end');
  const valid = hasRange();
  if (state.start) {
    const barText = valid ? `${compactDate(state.start)} — ${compactDate(state.end)}` : `${compactDate(state.start)} — 日付を選択`;
    ['#bar-date-text', '#intro-date-text'].forEach(sel => { const el = $(sel); if (el) el.textContent = barText; });
  }
  const datedLink = $('#dated-booking');
  datedLink.href = reservationUrl({...state, attribution});
  datedLink.setAttribute('aria-disabled', String(!valid));
  datedLink.textContent = valid ? `この日程の空室・料金を見る（${nightsBetween(state.start, state.end)}泊） ↗` : '日程を選択してください ↗';
  $('#undated-booking').href = reservationUrl({cta: state.cta, attribution});
  $('#calendar-status').textContent = valid && state.selecting !== 'start' ? `${displayDate(state.start)}〜${displayDate(state.end)}・${nightsBetween(state.start, state.end)}泊` : state.selecting === 'end' && state.start ? 'チェックアウト日を選択してください。' : 'チェックイン日を選択してください。';
}

function selectDay(key) {
  if (key < todayKey) return;
  if (state.selecting === 'start' || !state.start || key <= state.start) {
    state.start = key; state.end = ''; state.selecting = 'end';
  } else {
    state.end = key; state.selecting = 'complete';
  }
  renderCalendar(); renderBookingSummary();
  $(`[data-date="${key}"]`)?.focus({preventScroll: true});
}

function renderCalendar() {
  const year = viewMonth.getFullYear(); const month = viewMonth.getMonth();
  $('#calendar-month').textContent = `${year}年 ${month + 1}月`;
  $('#previous-month').disabled = viewMonth.getTime() <= firstMonth;
  const grid = $('#calendar-grid'); grid.replaceChildren();
  const offset = new Date(year, month, 1).getDay();
  const last = new Date(year, month + 1, 0).getDate();
  for (let empty = 0; empty < offset; empty++) { const span = document.createElement('span'); span.setAttribute('aria-hidden', 'true'); grid.append(span); }
  for (let date = 1; date <= last; date++) {
    const key = localDateKey(new Date(year, month, date));
    const button = document.createElement('button');
    button.className = 'day'; button.dataset.date = key;
    const num = document.createElement('span');
    num.className = 'day-num'; num.textContent = date;
    button.append(num);
    button.disabled = key < todayKey;
    const priceLabel = button.disabled ? '' : perPersonLabel(key);
    if (priceLabel) {
      const price = document.createElement('small');
      price.className = 'day-price'; price.textContent = priceLabel;
      button.append(price);
    }
    const selected = key === state.start || key === state.end;
    button.classList.toggle('is-selected', selected);
    button.classList.toggle('in-range', !!state.start && !!state.end && key > state.start && key < state.end);
    button.classList.toggle('is-today', key === todayKey);
    button.setAttribute('aria-label', `${year}年${month + 1}月${date}日${key === state.start ? ' チェックイン日' : key === state.end ? ' チェックアウト日' : ''}`);
    button.setAttribute('aria-pressed', String(selected));
    if (key === todayKey) button.setAttribute('aria-current', 'date');
    button.addEventListener('click', () => { if (state.selecting === 'complete') state.selecting = 'start'; selectDay(key); });
    button.addEventListener('keydown', event => {
      const movement = {ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7}[event.key];
      if (!movement) return;
      event.preventDefault();
      const target = new Date(year, month, date + movement); const targetKey = localDateKey(target);
      if (targetKey < todayKey) return;
      if (target.getMonth() !== month || target.getFullYear() !== year) { viewMonth = new Date(target.getFullYear(), target.getMonth(), 1); renderCalendar(); }
      $(`[data-date="${targetKey}"]`)?.focus();
    });
    grid.append(button);
  }
}

$$('[data-open-booking]').forEach(button => button.addEventListener('click', () => {
  state.cta = button.dataset.cta || 'sticky';
  renderCalendar(); renderBookingSummary();
  openDialog($('#booking-dialog'));
}));
$('#previous-month').addEventListener('click', () => { if (viewMonth.getTime() > firstMonth) { viewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1); renderCalendar(); } });
$('#next-month').addEventListener('click', () => { viewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1); renderCalendar(); });
$('#select-start').addEventListener('click', () => { state.selecting = 'start'; renderBookingSummary(); });
$('#select-end').addEventListener('click', () => { state.selecting = state.start ? 'end' : 'start'; renderBookingSummary(); });
$$('.booking-link').forEach(link => link.addEventListener('click', event => {
  if (link.getAttribute('aria-disabled') === 'true') { event.preventDefault(); return; }
  try { if (typeof window.fbq === 'function') window.fbq('track', 'InitiateCheckout'); } catch { /* Never block reservation navigation on optional analytics. */ }
}));
renderCalendar(); renderBookingSummary();

fetch(RATES_URL)
  .then(r => (r.ok ? r.json() : null))
  .then(data => {
    if (data && data.per_night && Object.keys(data.per_night).length) {
      perNight = data.per_night;
      $('#calendar-price-note')?.removeAttribute('hidden');
      const priceNum = $('#bar-price-num');
      if (priceNum) {
        const min = Math.min(...Object.values(perNight));
        const pp = Math.round(min / PRICE_DIVISOR / 100) * 100;
        priceNum.textContent = `¥${pp.toLocaleString('ja-JP')}`;
      }
      renderCalendar();
    }
  })
  .catch(() => { /* 価格が取れなくても予約動線は通常どおり */ });

// 固定バー: FV(1画面目)では隠し、スクロールで表示 (heroが無いページでは常時表示)
const bookingBar = $('.booking-bar');
if (bookingBar) {
  if ($('.hero')) {
    const toggleBar = () => bookingBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.55);
    addEventListener('scroll', toggleBar, {passive: true});
    toggleBar();
  } else {
    bookingBar.classList.add('is-visible');
  }
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ($('.hero')) {
const slides = $$('.hero-slide');
let slide = 0; let userPaused = false; let heroHovered = false;
function showSlide(next) {
  slides[slide].classList.remove('is-active');
  slide = (next + slides.length) % slides.length;
  slides[slide].classList.add('is-active');
  $('#slide-number').textContent = String(slide + 1).padStart(2, '0');
}
function updatePauseButton() {
  const paused = userPaused || reducedMotion.matches;
  $('.slide-pause').disabled = reducedMotion.matches;
  $('.slide-pause').setAttribute('aria-pressed', String(paused));
  $('.slide-pause').setAttribute('aria-label', reducedMotion.matches ? '動きを減らす設定により自動切り替えを停止中' : paused ? '写真の自動切り替えを再開' : '写真の自動切り替えを停止');
  $('.slide-pause').firstElementChild.textContent = paused ? '▷' : 'Ⅱ';
}
$('.hero-prev').addEventListener('click', () => { showSlide(slide - 1); userPaused = true; updatePauseButton(); });
$('.hero-next').addEventListener('click', () => { showSlide(slide + 1); userPaused = true; updatePauseButton(); });
$('.slide-pause').addEventListener('click', () => { userPaused = !userPaused; updatePauseButton(); });
$('.hero').addEventListener('mouseenter', () => { heroHovered = true; });
$('.hero').addEventListener('mouseleave', () => { heroHovered = false; });
// 横スワイプで画像を切り替え (縦スクロールは通常どおり)
let swipeX = null;
const heroSlides = $('.hero-slides');
heroSlides.addEventListener('pointerdown', e => { swipeX = e.clientX; });
heroSlides.addEventListener('pointerup', e => {
  if (swipeX === null) return;
  const dx = e.clientX - swipeX; swipeX = null;
  if (Math.abs(dx) > 45) { showSlide(slide + (dx < 0 ? 1 : -1)); userPaused = true; updatePauseButton(); }
});
heroSlides.addEventListener('pointercancel', () => { swipeX = null; });
setInterval(() => {
  if (!userPaused && !heroHovered && !reducedMotion.matches && !document.hidden && !$('.hero').contains(document.activeElement) && !$('dialog[open]')) showSlide(slide + 1);
}, 2000);
reducedMotion.addEventListener('change', updatePauseButton); updatePauseButton();

}

const galleryItems = $$('[data-gallery]');
if (galleryItems.length && $('#gallery-dialog')) {
let galleryIndex = 0;
function showGallery(index) {
  galleryIndex = (index + galleryItems.length) % galleryItems.length;
  const image = galleryItems[galleryIndex].querySelector('img');
  $('#gallery-large').src = image.src; $('#gallery-large').alt = image.alt;
  $('#gallery-caption').textContent = image.alt;
  $('#gallery-counter').textContent = `${String(galleryIndex + 1).padStart(2, '0')} / ${String(galleryItems.length).padStart(2, '0')}`;
}
galleryItems.forEach((button, index) => button.addEventListener('click', () => { showGallery(index); openDialog($('#gallery-dialog')); }));
$('#gallery-prev').addEventListener('click', () => showGallery(galleryIndex - 1));
$('#gallery-next').addEventListener('click', () => showGallery(galleryIndex + 1));
$('#gallery-dialog').addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); showGallery(galleryIndex - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); showGallery(galleryIndex + 1); }
});

let swipeStart = null;
$('#gallery-large').addEventListener('pointerdown', event => { swipeStart = {x: event.clientX, y: event.clientY}; });
$('#gallery-large').addEventListener('pointerup', event => {
  if (!swipeStart) return;
  const dx = event.clientX - swipeStart.x; const dy = event.clientY - swipeStart.y;
  if (Math.abs(dx) > 60 && Math.abs(dy) < 60) showGallery(galleryIndex + (dx < 0 ? 1 : -1));
  swipeStart = null;
});
$('#gallery-large').addEventListener('pointercancel', () => { swipeStart = null; });
}
