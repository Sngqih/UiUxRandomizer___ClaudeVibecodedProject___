// The layout engine. Beyond colors/fonts, this randomizes the *structure* of a
// design: which page archetype, the shell (stack / sidebar / phone), nav style,
// hero variant, section order, grid layouts, card treatment, density, alignment,
// and where themed visuals are placed.
import { pick, randInt, chance, shuffle } from './util.js';

export const ARCHETYPES = {
  landing: { key: 'landing', label: 'Landing' },
  dashboard: { key: 'dashboard', label: 'Dashboard' },
  portfolio: { key: 'portfolio', label: 'Portfolio' },
  editorial: { key: 'editorial', label: 'Editorial' },
  app: { key: 'app', label: 'App screen' },
  poster: { key: 'poster', label: 'Poster' },
};
export const ARCHETYPE_LIST = Object.values(ARCHETYPES);
const ARCHETYPE_KEYS = Object.keys(ARCHETYPES);

// Decorative visual styles and chart styles (rendered from the palette).
export const VISUAL_KINDS = ['gradient', 'mesh', 'blob', 'shapes', 'rings', 'waves'];
export const CHART_KINDS = ['bars', 'area', 'donut'];

const visualKind = () => pick(VISUAL_KINDS);

let seedCounter = 1;
const nextSeed = () => randInt(1, 2_000_000_000) ^ (seedCounter++ << 13);

// Attach a stable seed to every block (visuals derive their randomness from it).
function withSeeds(blocks) {
  return blocks.map((b) => ({ seed: nextSeed(), ...b }));
}

function finalize(archetype, blocks, extra = {}) {
  return {
    archetype,
    shell: extra.shell ?? 'stack',
    density: pick(['airy', 'comfortable', 'comfortable', 'compact']),
    align: extra.align ?? pick(['left', 'left', 'center']),
    cardStyle: pick(['bordered', 'elevated', 'filled', 'flat']),
    accent: pick(['subtle', 'bold']),
    grain: extra.grain ?? chance(0.22),
    blocks: withSeeds(blocks),
  };
}

function hero(allowed) {
  const variant = pick(allowed);
  const withVisual = ['split-left', 'split-right', 'image-bg', 'stacked', 'overlap', 'editorial', 'cover'].includes(variant);
  return { type: 'hero', variant, withVisual, visualKind: visualKind() };
}

/* ---------- Landing ---------- */
function composeLanding() {
  const blocks = [{ type: 'nav', variant: pick(['bar-links', 'bar-cta', 'centered']) }];
  blocks.push(hero(['centered', 'split-left', 'split-right', 'image-bg', 'minimal', 'stacked', 'overlap', 'editorial', 'cover']));

  const pool = [
    { type: 'features', variant: pick(['cols-3', 'cols-2', 'cols-4', 'alternating', 'list']) },
    { type: 'stats', variant: pick(['row-3', 'row-4', 'bento']) },
    { type: 'showcase', variant: pick(['grid-3', 'grid-2', 'feature']), visualKind: visualKind() },
    { type: 'testimonial', variant: pick(['single', 'cards-2', 'quote']) },
    { type: 'media', variant: pick(['full', 'framed', 'split']), visualKind: visualKind() },
    { type: 'photobento', variant: pick(['feature', 'mosaic']), visualKind: visualKind() },
    { type: 'marquee', variant: pick(['bold', 'outline']) },
    { type: 'bigstatement', variant: pick(['centered', 'left']) },
    { type: 'logos', variant: 'row' },
    { type: 'steps', variant: pick(['numbered', 'cards']) },
  ];
  blocks.push(...shuffle(pool).slice(0, randInt(3, 5)));
  blocks.push({ type: 'cta', variant: pick(['banner', 'centered-card', 'split']), visualKind: visualKind() });
  blocks.push({ type: 'footer', variant: pick(['columns', 'simple']) });
  return finalize('landing', blocks);
}

/* ---------- Dashboard ---------- */
function composeDashboard() {
  const shell = pick(['stack', 'sidebar']);
  const blocks = [];
  if (shell === 'sidebar') blocks.push({ type: 'sidebar', variant: 'icons-labels' });
  else blocks.push({ type: 'nav', variant: pick(['bar-links', 'bar-cta']) });

  blocks.push({ type: 'pageheader', variant: pick(['title-actions', 'title-tabs']) });
  blocks.push({ type: 'kpis', variant: pick(['row-4', 'row-3', 'bento']) });
  blocks.push({ type: 'analytics', variant: pick(['chart-side', 'chart-full', 'two-charts']), chartKind: pick(CHART_KINDS) });

  const tail = shuffle([
    { type: 'table', variant: pick(['rows', 'avatars']) },
    { type: 'activity', variant: pick(['feed', 'list']) },
  ]);
  blocks.push(...tail);
  return finalize('dashboard', blocks, { shell, align: 'left' });
}

/* ---------- Portfolio ---------- */
function composePortfolio() {
  const blocks = [{ type: 'nav', variant: pick(['centered', 'bar-links']) }];
  blocks.push(hero(['minimal', 'split-left', 'split-right', 'stacked', 'centered']));

  const gallery = { type: 'gallery', variant: pick(['masonry', 'grid-2', 'grid-3', 'feature-asymmetric']), visualKind: visualKind() };
  const about = { type: 'about', variant: pick(['split', 'centered']), visualKind: visualKind() };
  blocks.push(...(chance(0.5) ? [gallery, about] : [about, gallery]));

  blocks.push({ type: 'cta', variant: pick(['centered-card', 'banner']), visualKind: visualKind() });
  blocks.push({ type: 'footer', variant: pick(['simple', 'columns']) });
  return finalize('portfolio', blocks);
}

/* ---------- App screen ---------- */
function composeApp() {
  const blocks = [{ type: 'appbar', variant: pick(['title-avatar', 'search', 'greeting']) }];
  blocks.push({ type: 'apphero', variant: pick(['balance', 'featured', 'progress']), visualKind: visualKind() });

  const pool = [
    { type: 'quickactions', variant: 'grid-4' },
    { type: 'applist', variant: pick(['transactions', 'contacts', 'tasks']) },
    { type: 'appcards', variant: pick(['carousel', 'stack']), visualKind: visualKind() },
  ];
  blocks.push(...shuffle(pool).slice(0, randInt(2, 3)));
  blocks.push({ type: 'tabbar', variant: 'icons' });
  return finalize('app', blocks, { shell: 'phone', align: 'left' });
}

/* ---------- Editorial (awwwards-style, photo-forward) ---------- */
function composeEditorial() {
  const blocks = [{ type: 'nav', variant: pick(['centered', 'bar-links']) }];
  blocks.push(hero(['cover', 'overlap', 'editorial', 'split-left', 'image-bg']));

  const pool = [
    { type: 'photobento', variant: pick(['feature', 'mosaic']), visualKind: visualKind() },
    { type: 'indexlist', variant: pick(['lines', 'thumbs']) },
    { type: 'imagemarquee', variant: 'row' },
    { type: 'statementphoto', variant: pick(['left', 'right']), visualKind: visualKind() },
    { type: 'bigstatement', variant: pick(['centered', 'left']) },
    { type: 'marquee', variant: pick(['bold', 'outline']) },
    { type: 'gallery', variant: pick(['masonry', 'grid-3']), visualKind: visualKind() },
  ];
  blocks.push(...shuffle(pool).slice(0, randInt(3, 4)));
  blocks.push({ type: 'cta', variant: pick(['banner', 'centered-card']), visualKind: visualKind() });
  blocks.push({ type: 'footer', variant: pick(['simple', 'columns']) });
  return finalize('editorial', blocks, { grain: chance(0.7), align: pick(['left', 'left', 'center']) });
}

/* ---------- Poster / infographic ---------- */
function composePoster() {
  const blocks = [{ type: 'posterhead', variant: pick(['stacked', 'split', 'index']), visualKind: visualKind() }];

  const pool = [
    { type: 'figures', variant: pick(['row-3', 'duo', 'stack']) },
    { type: 'postchart', variant: 'card', chartKind: pick(CHART_KINDS) },
    { type: 'steps', variant: pick(['numbered', 'cards']) },
    { type: 'breakdown', variant: pick(['bar', 'segments']) },
    { type: 'callout', variant: pick(['solid', 'quote']), visualKind: visualKind() },
    { type: 'marquee', variant: pick(['bold', 'outline']) },
  ];
  blocks.push(...shuffle(pool).slice(0, randInt(3, 4)));
  blocks.push({ type: 'postercredit', variant: 'simple' });
  return finalize('poster', blocks, { shell: 'poster', align: pick(['left', 'left', 'center']) });
}

const COMPOSERS = {
  landing: composeLanding,
  dashboard: composeDashboard,
  portfolio: composePortfolio,
  editorial: composeEditorial,
  app: composeApp,
  poster: composePoster,
};

// Build a layout. archetypeKey 'random' (or unknown) picks one at random.
export function buildLayout({ archetypeKey = 'random' } = {}) {
  const key = COMPOSERS[archetypeKey] ? archetypeKey : pick(ARCHETYPE_KEYS);
  return COMPOSERS[key]();
}
