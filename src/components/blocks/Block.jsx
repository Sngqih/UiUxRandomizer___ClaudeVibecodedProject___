import Visual from '../Visual.jsx';
import Picture from '../Picture.jsx';
import { VISUAL_KINDS } from '../../lib/layout.js';
import {
  Ico, NAV_LINKS, FEATURES, STATS, PROJECTS, NAMES, QUOTES, TX, ACTIVITY, initials,
} from './parts.jsx';

// Deterministic visual kind for a given seed (keeps multi-tile sections varied).
const kindAt = (s) => VISUAL_KINDS[Math.abs(s) % VISUAL_KINDS.length];

function SectionHead({ eyebrow, title, sub, center }) {
  return (
    <div className={`pv-section-head ${center ? 'is-center' : ''}`}>
      {eyebrow && <span className="pv-eyebrow">{eyebrow}</span>}
      <h2 className="pv-h2">{title}</h2>
      {sub && <p className="pv-lead">{sub}</p>}
    </div>
  );
}

/* ---------------- Chrome ---------------- */
function Nav({ block, ctx }) {
  const { theme, icons, stroke } = ctx;
  const brand = (
    <div className="pv-brand">
      <span className="pv-logo"><Ico icons={icons} i={0} size={18} stroke={stroke} color="var(--c-primary-contrast)" /></span>
      <span className="pv-brand-name">{theme.name}</span>
    </div>
  );
  if (block.variant === 'centered') {
    return (
      <header className="pv-nav-bar is-centered">
        <nav className="pv-nav-links">{NAV_LINKS.slice(0, 2).map((l) => <span key={l} className="pv-nav-link">{l}</span>)}</nav>
        {brand}
        <nav className="pv-nav-links">{NAV_LINKS.slice(2, 4).map((l) => <span key={l} className="pv-nav-link">{l}</span>)}</nav>
      </header>
    );
  }
  return (
    <header className="pv-nav-bar">
      {brand}
      <nav className="pv-nav-links">{NAV_LINKS.slice(0, 5).map((l) => <span key={l} className="pv-nav-link">{l}</span>)}</nav>
      {block.variant === 'bar-cta' ? (
        <button className="pv-btn pv-btn-primary pv-btn-sm">Get started</button>
      ) : (
        <div className="pv-nav-actions">
          <span className="pv-nav-link">Sign in</span>
          <button className="pv-btn pv-btn-primary pv-btn-sm">Sign up</button>
        </div>
      )}
    </header>
  );
}

function Sidebar({ ctx }) {
  const { theme, icons, stroke } = ctx;
  const items = ['Dashboard', 'Analytics', 'Projects', 'Team', 'Settings'];
  return (
    <aside className="pv-sidebar">
      <div className="pv-brand">
        <span className="pv-logo"><Ico icons={icons} i={0} size={16} stroke={stroke} color="var(--c-primary-contrast)" /></span>
        <span className="pv-brand-name">{theme.name}</span>
      </div>
      <nav className="pv-side-nav">
        {items.map((it, i) => (
          <span key={it} className={`pv-side-link ${i === 0 ? 'is-active' : ''}`}>
            <Ico icons={icons} i={i + 1} size={16} stroke={stroke} />
            {it}
          </span>
        ))}
      </nav>
      <div className="pv-side-foot">
        <span className="pv-avatar sm">{initials('Ava Chen')}</span>
        <span className="pv-muted">Ava Chen</span>
      </div>
    </aside>
  );
}

function Footer({ block, ctx }) {
  const { theme } = ctx;
  if (block.variant === 'columns') {
    const cols = { Product: ['Features', 'Pricing', 'Changelog'], Company: ['About', 'Blog', 'Careers'], Legal: ['Privacy', 'Terms'] };
    return (
      <footer className="pv-footer pv-footer--cols">
        <div className="pv-footer-brand">
          <span className="pv-brand-name">{theme.name}</span>
          <p className="pv-muted">Themes that feel designed, not generated.</p>
        </div>
        {Object.entries(cols).map(([h, links]) => (
          <div key={h} className="pv-footer-col">
            <span className="pv-footer-head">{h}</span>
            {links.map((l) => <span key={l} className="pv-nav-link">{l}</span>)}
          </div>
        ))}
      </footer>
    );
  }
  return (
    <footer className="pv-footer">
      <span className="pv-brand-name">{theme.name}</span>
      <span className="pv-muted">© 2026 — all rights reserved</span>
    </footer>
  );
}

/* ---------------- Hero ---------------- */
function Hero({ block, ctx }) {
  const { theme } = ctx;
  const v = block.variant;
  const eyebrow = `${theme.meta.preset || theme.meta.harmony} system`;
  const Text = ({ onImage }) => (
    <div className={`pv-hero-text ${onImage ? 'on-image' : ''}`}>
      <span className="pv-eyebrow">{eyebrow}</span>
      <h1 className="pv-h1">Design that feels intentional.</h1>
      <p className="pv-lead">A complete theme — palette, type, icons, and layout — generated to feel deliberate and ready to ship.</p>
      <div className="pv-actions">
        <button className="pv-btn pv-btn-primary">Get started</button>
        <button className="pv-btn pv-btn-ghost">Live demo</button>
      </div>
    </div>
  );
  const viz = <Picture ctx={ctx} kind={block.visualKind} seed={block.seed} className="pv-hero-viz" />;

  if (v === 'image-bg') {
    return (
      <section className="pv-hero pv-hero--imagebg">
        {viz}
        <div className="pv-hero-scrim" />
        <div className="pv-hero-overlay"><Text onImage /></div>
      </section>
    );
  }
  if (v === 'cover') {
    return (
      <section className="pv-hero pv-hero--cover">
        {viz}
        <div className="pv-hero-scrim" />
        <span className="pv-sticker">Vol.<br />01</span>
        <div className="pv-cover-content">
          <span className="pv-eyebrow on-image">{eyebrow}</span>
          <h1 className="pv-h1 pv-cover-title">Design that feels intentional.</h1>
          <div className="pv-cover-meta"><span>2026</span><span>Issue 01</span><span>{theme.name}</span></div>
        </div>
      </section>
    );
  }
  if (v === 'split-left') return <section className="pv-hero pv-hero--split"><Text /><div className="pv-hero-media">{viz}</div></section>;
  if (v === 'split-right') return <section className="pv-hero pv-hero--split is-rev"><div className="pv-hero-media">{viz}</div><Text /></section>;
  if (v === 'stacked') return <section className="pv-hero pv-hero--stacked"><Text /><div className="pv-hero-media is-wide">{viz}</div></section>;
  if (v === 'minimal') {
    return (
      <section className="pv-hero pv-hero--minimal">
        <h1 className="pv-h1 pv-h1--xl">Intentional<br />by design.</h1>
        <p className="pv-lead">A randomized system that still feels considered.</p>
      </section>
    );
  }
  if (v === 'overlap') {
    return (
      <section className="pv-hero pv-hero--overlap">
        <div className="pv-hero-media is-overlap">{viz}</div>
        <div className="pv-hero-overlapcard"><Text /></div>
      </section>
    );
  }
  if (v === 'editorial') {
    return (
      <section className="pv-hero pv-hero--editorial">
        <span className="pv-eyebrow">{eyebrow}</span>
        <h1 className="pv-h1 pv-h1--xl">Design that feels intentional.</h1>
        <div className="pv-hero-editorial-row">
          <div className="pv-hero-media is-inline">{viz}</div>
          <p className="pv-lead">A complete theme — palette, type, icons, and layout — generated to feel deliberate and ready to ship.</p>
        </div>
        <div className="pv-actions">
          <button className="pv-btn pv-btn-primary">Get started</button>
          <button className="pv-btn pv-btn-ghost">Live demo</button>
        </div>
      </section>
    );
  }
  return <section className="pv-hero pv-hero--centered"><Text /></section>;
}

/* ---------------- Content sections ---------------- */
function Features({ block, ctx }) {
  const { icons, stroke } = ctx;
  const v = block.variant;
  const head = <SectionHead eyebrow="Features" title="Everything you need to ship" center />;

  if (v === 'alternating') {
    return (
      <section className="pv-section">
        {head}
        <div className="pv-alt">
          {FEATURES.slice(0, 3).map((f, i) => (
            <div key={f.t} className={`pv-alt-row ${i % 2 ? 'is-rev' : ''}`}>
              <Picture ctx={ctx} kind={kindAt(block.seed + i)} seed={block.seed + i} className="pv-alt-viz" />
              <div className="pv-alt-text">
                <h3 className="pv-h3">{f.t}</h3>
                <p className="pv-muted">{f.d}</p>
                <span className="pv-link">Learn more →</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  if (v === 'list') {
    return (
      <section className="pv-section">
        {head}
        <div className="pv-flist">
          {FEATURES.slice(0, 4).map((f, i) => (
            <div key={f.t} className="pv-card pv-flist-row">
              <span className="pv-feature-icon"><Ico icons={icons} i={i + 2} size={18} stroke={stroke} /></span>
              <div><h3 className="pv-h3">{f.t}</h3><p className="pv-muted">{f.d}</p></div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  const cols = v === 'cols-4' ? 4 : v === 'cols-2' ? 2 : 3;
  const count = cols === 2 ? 4 : cols;
  return (
    <section className="pv-section">
      {head}
      <div className="pv-grid" style={{ '--cols': cols }}>
        {FEATURES.slice(0, count).map((f, i) => (
          <div key={f.t} className="pv-card pv-feature">
            <span className="pv-feature-icon"><Ico icons={icons} i={i + 2} size={18} stroke={stroke} /></span>
            <h3 className="pv-h3">{f.t}</h3>
            <p className="pv-muted">{f.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Stats({ block, ctx, bare }) {
  const { icons, stroke } = ctx;
  const v = block.variant;
  const bento = v === 'bento';
  const cols = bento ? 3 : v === 'row-3' ? 3 : 4;
  const items = STATS.slice(0, v === 'row-3' ? 3 : 4);
  return (
    <section className={`pv-section ${bare ? 'is-bare' : ''}`}>
      {!bare && <SectionHead eyebrow="By the numbers" title="Trusted at scale" center />}
      <div className="pv-grid" style={{ '--cols': cols }}>
        {items.map((s, i) => (
          <div key={s.label} className={`pv-card pv-stat ${bento && i === 0 ? 'is-span2' : ''} ${i === 1 ? 'pv-stat-accent' : ''}`}>
            <span className="pv-stat-icon"><Ico icons={icons} i={i + 4} size={18} stroke={stroke} /></span>
            <span className="pv-stat-label">{s.label}</span>
            <span className="pv-stat-value">{s.value}</span>
            <span className="pv-badge pv-badge-success">{s.delta}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Tiles({ block, ctx, head, captions }) {
  const v = block.variant;
  if (v === 'feature' || v === 'feature-asymmetric') {
    return (
      <section className="pv-section">
        {head}
        <div className="pv-tiles pv-tiles--feature">
          <div className="pv-tile is-big">
            <Picture ctx={ctx} kind={kindAt(block.seed)} seed={block.seed} />
            <span className="pv-tile-cap">{captions[0]}</span>
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="pv-tile">
              <Picture ctx={ctx} kind={kindAt(block.seed + i)} seed={block.seed + i} />
              <span className="pv-tile-cap">{captions[i % captions.length]}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }
  const masonry = v === 'masonry';
  const cols = v === 'grid-2' ? 2 : 3;
  const count = cols === 2 ? 4 : 6;
  return (
    <section className="pv-section">
      {head}
      <div className={`pv-tiles ${masonry ? 'pv-tiles--masonry' : ''}`} style={{ '--cols': masonry ? 3 : cols }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={`pv-tile ${masonry && i % 3 === 0 ? 'is-tall' : ''}`}>
            <Picture ctx={ctx} kind={kindAt(block.seed + i)} seed={block.seed + i} />
            <span className="pv-tile-cap">{captions[i % captions.length]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonial({ block }) {
  const v = block.variant;
  if (v === 'cards-2') {
    return (
      <section className="pv-section">
        <div className="pv-grid" style={{ '--cols': 2 }}>
          {QUOTES.map((qt) => (
            <div key={qt.n} className="pv-card pv-quote-card">
              <p className="pv-quote">“{qt.q}”</p>
              <div className="pv-quote-by"><span className="pv-avatar sm">{initials(qt.n)}</span><span><strong>{qt.n}</strong><span className="pv-muted">{qt.r}</span></span></div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  if (v === 'quote') {
    return (
      <section className="pv-section pv-section--quote">
        <p className="pv-bigquote">“{QUOTES[0].q}”</p>
        <span className="pv-muted">{QUOTES[0].n} — {QUOTES[0].r}</span>
      </section>
    );
  }
  const qt = QUOTES[0];
  return (
    <section className="pv-section">
      <div className="pv-card pv-quote-card pv-quote-single">
        <p className="pv-quote">“{qt.q}”</p>
        <div className="pv-quote-by"><span className="pv-avatar sm">{initials(qt.n)}</span><span><strong>{qt.n}</strong><span className="pv-muted">{qt.r}</span></span></div>
      </div>
    </section>
  );
}

function Media({ block, ctx }) {
  const v = block.variant;
  const viz = <Picture ctx={ctx} kind={block.visualKind} seed={block.seed} className="pv-media-viz" />;
  if (v === 'split') {
    return (
      <section className="pv-section pv-media-split">
        <div className="pv-media-text">
          <span className="pv-eyebrow">Why teams switch</span>
          <h2 className="pv-h2">A workflow that disappears into the work.</h2>
          <p className="pv-lead">Spend time on decisions, not plumbing.</p>
          <span className="pv-link">Read the case study →</span>
        </div>
        {viz}
      </section>
    );
  }
  return (
    <section className="pv-section">
      <div className={`pv-media ${v === 'framed' ? 'is-framed' : 'is-full'}`}>{viz}</div>
    </section>
  );
}

function Cta({ block, ctx }) {
  const v = block.variant;
  if (v === 'centered-card') {
    return (
      <section className="pv-section">
        <div className="pv-card pv-cta-card">
          <h2 className="pv-h2">Ready to build something good?</h2>
          <p className="pv-lead">Start free. No credit card required.</p>
          <div className="pv-actions"><button className="pv-btn pv-btn-primary">Get started</button><button className="pv-btn pv-btn-ghost">Talk to us</button></div>
        </div>
      </section>
    );
  }
  if (v === 'split') {
    return (
      <section className="pv-section">
        <div className="pv-cta-banner pv-cta-split">
          <div><h2 className="pv-h2">Bring your interface to life.</h2><div className="pv-actions"><button className="pv-btn pv-btn-onaccent">Get started</button></div></div>
          <Picture ctx={ctx} kind={block.visualKind} seed={block.seed} className="pv-cta-viz" />
        </div>
      </section>
    );
  }
  return (
    <section className="pv-section">
      <div className="pv-cta-banner">
        <h2 className="pv-h2">Bring your interface to life.</h2>
        <button className="pv-btn pv-btn-onaccent">Get started</button>
      </div>
    </section>
  );
}

function PageHeader({ block }) {
  return (
    <div className="pv-pagehead">
      <div>
        <h2 className="pv-h2 pv-pagehead-title">Overview</h2>
        <p className="pv-muted">Welcome back — here's what's happening today.</p>
      </div>
      {block.variant === 'title-tabs' ? (
        <div className="pv-tabs">{['Overview', 'Analytics', 'Reports'].map((t, i) => <span key={t} className={`pv-tab-pill ${i === 0 ? 'is-active' : ''}`}>{t}</span>)}</div>
      ) : (
        <div className="pv-pagehead-actions"><button className="pv-btn pv-btn-ghost pv-btn-sm">Export</button><button className="pv-btn pv-btn-primary pv-btn-sm">New report</button></div>
      )}
    </div>
  );
}

function ChartCard({ ck, seed, theme, title }) {
  return (
    <div className="pv-card pv-chart-card">
      <div className="pv-card-head">
        <h3 className="pv-h3">{title}</h3>
        <div className="pv-legend"><span style={{ background: 'var(--c-primary)' }} /><span style={{ background: 'var(--c-accent)' }} /></div>
      </div>
      <Visual kind={ck} seed={seed} theme={theme} className="pv-chart-viz" />
    </div>
  );
}

function Analytics({ block, ctx }) {
  const { theme } = ctx;
  const v = block.variant;
  const ck = block.chartKind;
  if (v === 'two-charts') {
    return (
      <div className="pv-grid" style={{ '--cols': 2 }}>
        <ChartCard ck={ck} seed={block.seed} theme={theme} title="Revenue" />
        <ChartCard ck={ck === 'donut' ? 'bars' : 'donut'} seed={block.seed + 9} theme={theme} title="Traffic" />
      </div>
    );
  }
  if (v === 'chart-full') return <ChartCard ck={ck} seed={block.seed} theme={theme} title="Performance" />;
  return (
    <div className="pv-analytics">
      <ChartCard ck={ck} seed={block.seed} theme={theme} title="Revenue over time" />
      <div className="pv-analytics-side">
        {STATS.slice(0, 2).map((s) => (
          <div key={s.label} className="pv-card pv-stat">
            <span className="pv-stat-label">{s.label}</span>
            <span className="pv-stat-value">{s.value}</span>
            <span className="pv-badge pv-badge-success">{s.delta}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Table({ block }) {
  const roles = ['Admin', 'Editor', 'Viewer', 'Editor'];
  return (
    <div className="pv-card pv-table-card">
      <div className="pv-card-head"><h3 className="pv-h3">Team members</h3><span className="pv-muted">{NAMES.length} people</span></div>
      <div className="pv-table">
        {NAMES.slice(0, 4).map((n, i) => (
          <div key={n} className="pv-tr">
            {block.variant === 'avatars' && <span className="pv-avatar sm">{initials(n)}</span>}
            <span className="pv-td pv-td-name">{n}</span>
            <span className="pv-td pv-muted">{roles[i]}</span>
            <span className="pv-badge pv-badge-success">Active</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityFeed() {
  return (
    <div className="pv-card">
      <div className="pv-card-head"><h3 className="pv-h3">Activity</h3></div>
      <div className="pv-activity">
        {ACTIVITY.map((a, i) => (
          <div key={i} className="pv-activity-row">
            <span className="pv-avatar sm">{initials(a.who)}</span>
            <span className="pv-activity-text"><strong>{a.who}</strong> {a.what}</span>
            <span className="pv-muted">{a.when}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function About({ block, ctx }) {
  if (block.variant === 'centered') {
    return (
      <section className="pv-section pv-about is-center">
        <span className="pv-eyebrow">About</span>
        <h2 className="pv-h2">I craft calm, considered interfaces.</h2>
        <p className="pv-lead">A designer-engineer working at the seam of product and craft, turning fuzzy ideas into shipped, durable systems.</p>
      </section>
    );
  }
  return (
    <section className="pv-section pv-about pv-about--split">
      <Picture ctx={ctx} kind={block.visualKind} seed={block.seed} className="pv-about-viz" />
      <div>
        <span className="pv-eyebrow">About</span>
        <h2 className="pv-h2">I craft calm, considered interfaces.</h2>
        <p className="pv-lead">A designer-engineer turning fuzzy ideas into shipped, durable systems.</p>
        <div className="pv-actions"><button className="pv-btn pv-btn-primary">Get in touch</button></div>
      </div>
    </section>
  );
}

/* ---------------- App screen ---------------- */
function AppBar({ block, ctx }) {
  const { theme, icons, stroke } = ctx;
  const v = block.variant;
  if (v === 'search') {
    return (
      <div className="pv-appbar">
        <div className="pv-app-search"><Ico icons={icons} i={1} size={16} stroke={stroke} /><span className="pv-muted">Search</span></div>
        <span className="pv-avatar sm">AV</span>
      </div>
    );
  }
  if (v === 'greeting') {
    return (
      <div className="pv-appbar">
        <div><span className="pv-muted">Good morning</span><h3 className="pv-h3">Ava</h3></div>
        <span className="pv-avatar sm">AV</span>
      </div>
    );
  }
  return (
    <div className="pv-appbar">
      <h3 className="pv-h3">{theme.name}</h3>
      <span className="pv-avatar sm">AV</span>
    </div>
  );
}

function AppHero({ block, ctx }) {
  const { theme } = ctx;
  const v = block.variant;
  if (v === 'featured') {
    return (
      <div className="pv-app-featured">
        <Picture ctx={ctx} kind={block.visualKind} seed={block.seed} />
        <div className="pv-hero-scrim" />
        <div className="pv-app-featured-cap"><span className="pv-eyebrow on-image">Featured</span><h3 className="pv-app-featured-title">Discover something new today</h3></div>
      </div>
    );
  }
  if (v === 'progress') {
    return (
      <div className="pv-card pv-app-progress">
        <div className="pv-app-progress-viz"><Visual kind="donut" seed={block.seed} theme={theme} /></div>
        <div>
          <span className="pv-muted">Daily goal</span>
          <span className="pv-app-balance-val sm">72%</span>
          <span className="pv-badge pv-badge-success">on track</span>
        </div>
      </div>
    );
  }
  return (
    <div className="pv-card pv-app-balance">
      <span className="pv-muted">Total balance</span>
      <span className="pv-app-balance-val">$12,480.55</span>
      <div className="pv-actions"><button className="pv-btn pv-btn-primary pv-btn-sm">Send</button><button className="pv-btn pv-btn-ghost pv-btn-sm">Request</button></div>
    </div>
  );
}

function QuickActions({ ctx }) {
  const { icons, stroke } = ctx;
  const labels = ['Send', 'Top up', 'Pay', 'Scan'];
  return (
    <div className="pv-quick">
      {labels.map((l, i) => (
        <div key={l} className="pv-quick-item">
          <span className="pv-quick-icon"><Ico icons={icons} i={i + 3} size={18} stroke={stroke} /></span>
          <span>{l}</span>
        </div>
      ))}
    </div>
  );
}

function AppList({ block, ctx }) {
  const { icons, stroke } = ctx;
  const v = block.variant;
  const head = v === 'transactions' ? 'Recent activity' : v === 'contacts' ? 'Contacts' : 'Today';
  const rows =
    v === 'transactions'
      ? TX
      : v === 'contacts'
        ? NAMES.map((n) => ({ t: n, s: 'Tap to message' }))
        : [{ t: 'Design review', s: '9:00 AM' }, { t: 'Standup', s: '10:30 AM' }, { t: '1:1 with Ava', s: '2:00 PM' }, { t: 'Ship release', s: '5:00 PM' }];
  return (
    <div className="pv-card">
      <div className="pv-card-head"><h3 className="pv-h3">{head}</h3><span className="pv-muted">See all</span></div>
      <div className="pv-applist">
        {rows.slice(0, 4).map((r, i) => (
          <div key={i} className="pv-applist-row">
            {v === 'contacts'
              ? <span className="pv-avatar sm">{initials(r.t)}</span>
              : <span className="pv-quick-icon sm"><Ico icons={icons} i={i + 2} size={15} stroke={stroke} /></span>}
            <span className="pv-applist-main"><strong>{r.t}</strong><span className="pv-muted">{r.s}</span></span>
            {v === 'transactions' && <span className={`pv-tx ${r.up ? 'is-up' : ''}`}>{r.v}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function AppCards({ block, ctx }) {
  return (
    <div className={`pv-appcards ${block.variant === 'carousel' ? 'is-carousel' : ''}`}>
      {[0, 1, 2].map((i) => (
        <div key={i} className="pv-appcard">
          <Picture ctx={ctx} kind={kindAt(block.seed + i)} seed={block.seed + i} />
          <div className="pv-appcard-cap"><strong>{PROJECTS[i]}</strong><span className="pv-muted">Updated today</span></div>
        </div>
      ))}
    </div>
  );
}

function TabBar({ ctx }) {
  const { icons, stroke } = ctx;
  const tabs = ['Home', 'Search', 'Wallet', 'Profile'];
  return (
    <div className="pv-tabbar">
      {tabs.map((t, i) => (
        <span key={t} className={`pv-tab ${i === 0 ? 'is-active' : ''}`}>
          <Ico icons={icons} i={i} size={20} stroke={stroke} />
          <span>{t}</span>
        </span>
      ))}
    </div>
  );
}

/* ---------------- Editorial sections (creative variety) ---------------- */
function Marquee({ block }) {
  const phrase = 'Design · System · Build · Ship · Repeat · ';
  return (
    <section className={`pv-marquee ${block.variant === 'outline' ? 'is-outline' : ''}`}>
      <div className="pv-marquee-track">{phrase.repeat(4)}</div>
    </section>
  );
}

function BigStatement({ block }) {
  return (
    <section className={`pv-bigstatement ${block.variant === 'left' ? 'is-left' : ''}`}>
      <p className="pv-bigstatement-text">We build interfaces that feel <em>inevitable</em> — considered, durable, and unmistakably yours.</p>
    </section>
  );
}

function Logos({ ctx }) {
  const { icons, stroke } = ctx;
  return (
    <section className="pv-logos">
      <span className="pv-muted">Trusted by teams at</span>
      <div className="pv-logos-row">
        {PROJECTS.map((n, i) => (
          <span key={n} className="pv-logo-item"><Ico icons={icons} i={i + 1} size={16} stroke={stroke} />{n}</span>
        ))}
      </div>
    </section>
  );
}

const STEPS = [
  { t: 'Explore', d: 'Map the problem space, constraints, and the shape of a good answer.' },
  { t: 'Design', d: 'Generate options, pressure-test them, and commit to a direction.' },
  { t: 'Build', d: 'Ship in small, durable increments that compound over time.' },
];
function Steps({ block }) {
  const cards = block.variant === 'cards';
  return (
    <section className="pv-section">
      <SectionHead eyebrow="Process" title="How it works" center={!cards} />
      <div className={`pv-steps ${cards ? 'is-cards' : ''}`}>
        {STEPS.map((s, i) => (
          <div key={s.t} className={`pv-step ${cards ? 'pv-card' : ''}`}>
            <span className="pv-step-num">{String(i + 1).padStart(2, '0')}</span>
            <div><h3 className="pv-h3">{s.t}</h3><p className="pv-muted">{s.d}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Creative photo-forward blocks ---------------- */
const BENTO_TAGS = ['Brand', 'Motion', 'Product', 'Editorial', 'Type', 'Art'];

function PhotoBento({ block, ctx }) {
  const head = <SectionHead eyebrow="Gallery" title="Selected frames" />;
  if (block.variant === 'mosaic') {
    return (
      <section className="pv-section">
        {head}
        <div className="pv-bento pv-bento--mosaic">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className={`pv-bento-cell b${i}`}>
              <Picture ctx={ctx} kind={kindAt(block.seed + i)} seed={block.seed + i} />
              <span className="pv-tag">{BENTO_TAGS[i % BENTO_TAGS.length]}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }
  return (
    <section className="pv-section">
      {head}
      <div className="pv-bento pv-bento--feature">
        <div className="pv-bento-cell is-big">
          <Picture ctx={ctx} kind={kindAt(block.seed)} seed={block.seed} />
          <span className="pv-tag">{BENTO_TAGS[0]}</span>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="pv-bento-cell">
            <Picture ctx={ctx} kind={kindAt(block.seed + i)} seed={block.seed + i} />
            <span className="pv-tag">{BENTO_TAGS[i]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const INDEX_ROWS = [
  ['Northwind', 'Brand system', '2026'],
  ['Aperture', 'Product design', '2025'],
  ['Helios', 'Art direction', '2025'],
  ['Monarch', 'Identity', '2024'],
];
function IndexList({ block, ctx }) {
  const thumbs = block.variant === 'thumbs';
  return (
    <section className="pv-section">
      <SectionHead eyebrow="Index" title="Selected work" />
      <div className={`pv-index ${thumbs ? 'has-thumbs' : ''}`}>
        {INDEX_ROWS.map((r, i) => (
          <div key={r[0]} className="pv-index-row">
            <span className="pv-index-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="pv-index-title">{r[0]}</span>
            <span className="pv-index-meta">{r[1]}</span>
            <span className="pv-index-year">{r[2]}</span>
            {thumbs && (
              <div className="pv-index-thumb">
                <Picture ctx={ctx} kind={kindAt(block.seed + i)} seed={block.seed + i} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ImageMarquee({ block, ctx }) {
  const items = [0, 1, 2, 3, 4, 5];
  return (
    <section className="pv-imarquee">
      <div className="pv-imarquee-track">
        {items.concat(items).map((i, idx) => (
          <div key={idx} className="pv-imarquee-item">
            <Picture ctx={ctx} kind={kindAt(block.seed + i)} seed={block.seed + i} />
          </div>
        ))}
      </div>
    </section>
  );
}

function StatementPhoto({ block, ctx }) {
  const right = block.variant === 'right';
  const text = (
    <div className="pv-sp-text">
      <span className="pv-eyebrow">Manifesto</span>
      <p className="pv-sp-quote">Interfaces should feel <em>inevitable</em> — as if they were always meant to be.</p>
      <span className="pv-link">Read the essay →</span>
    </div>
  );
  const viz = <Picture ctx={ctx} kind={block.visualKind} seed={block.seed} className="pv-sp-viz" />;
  return (
    <section className={`pv-statementphoto ${right ? 'is-right' : ''}`}>
      {right ? <>{text}{viz}</> : <>{viz}{text}</>}
    </section>
  );
}

/* ---------------- Poster / infographic ---------------- */
function PosterHead({ block, ctx }) {
  const kicker = 'The 2026 Report';
  const title = 'The State of Interface Design';
  const v = block.variant;
  if (v === 'split') {
    return (
      <header className="pv-poster-head is-split">
        <div>
          <span className="pv-poster-kicker">{kicker}</span>
          <h1 className="pv-poster-title">{title}</h1>
        </div>
        <div className="pv-poster-headfig">
          <span className="pv-figure-num">87%</span>
          <span className="pv-muted">of teams ship faster with a design system</span>
        </div>
      </header>
    );
  }
  if (v === 'index') {
    return (
      <header className="pv-poster-head is-index">
        <span className="pv-poster-index">01</span>
        <div>
          <span className="pv-poster-kicker">{kicker}</span>
          <h1 className="pv-poster-title">{title}</h1>
          <p className="pv-lead">A field guide to building interfaces that last.</p>
        </div>
      </header>
    );
  }
  return (
    <header className="pv-poster-head">
      <span className="pv-poster-kicker">{kicker}</span>
      <h1 className="pv-poster-title">{title}</h1>
      <p className="pv-lead">A field guide to building interfaces that last — the patterns, pitfalls, and data behind them.</p>
    </header>
  );
}

const FIGURES = [
  { n: '3.2M', l: 'designs generated' },
  { n: '87%', l: 'ship faster' },
  { n: '12k', l: 'teams onboard' },
  { n: '4.6', l: 'avg. rating' },
];
function Figures({ block }) {
  const v = block.variant;
  const count = v === 'duo' ? 2 : 3;
  return (
    <section className={`pv-figures pv-figures--${v}`}>
      {FIGURES.slice(0, count).map((d, i) => (
        <div key={d.l} className={`pv-figure ${i % 2 ? 'is-accent' : ''}`}>
          <span className="pv-figure-num">{d.n}</span>
          <span className="pv-figure-label">{d.l}</span>
        </div>
      ))}
    </section>
  );
}

function PostChart({ block, ctx }) {
  const { theme } = ctx;
  return (
    <section className="pv-card pv-postchart">
      <div className="pv-card-head">
        <h3 className="pv-h3">Adoption by quarter</h3>
        <span className="pv-muted">2026</span>
      </div>
      <Visual kind={block.chartKind} seed={block.seed} theme={theme} className="pv-postchart-viz" />
      <div className="pv-legend-row">
        <span className="pv-legend-item"><i style={{ background: 'var(--c-primary)' }} />This year</span>
        <span className="pv-legend-item"><i style={{ background: 'var(--c-accent)' }} />Last year</span>
      </div>
    </section>
  );
}

const BREAKDOWN = [
  { l: 'Sans', p: 46, c: 'var(--c-primary)' },
  { l: 'Serif', p: 28, c: 'var(--c-accent)' },
  { l: 'Mono', p: 16, c: 'var(--c-secondary)' },
  { l: 'Display', p: 10, c: 'var(--c-surface-alt)' },
];
function Breakdown({ block }) {
  const segments = block.variant === 'segments';
  return (
    <section className="pv-breakdown">
      <h3 className="pv-h3">Typeface usage</h3>
      <div className={`pv-breakdown-bar ${segments ? 'is-segments' : ''}`}>
        {BREAKDOWN.map((s) => (
          <span key={s.l} className="pv-breakdown-seg" style={{ width: `${s.p}%`, background: s.c }} />
        ))}
      </div>
      <div className="pv-breakdown-legend">
        {BREAKDOWN.map((s) => (
          <span key={s.l} className="pv-legend-item"><i style={{ background: s.c }} />{s.l} · {s.p}%</span>
        ))}
      </div>
    </section>
  );
}

function Callout({ block }) {
  if (block.variant === 'quote') {
    return (
      <section className="pv-callout is-quote">
        <p className="pv-callout-quote">“The best interface is the one that gets out of the way.”</p>
        <span className="pv-muted">— Field notes, 2026</span>
      </section>
    );
  }
  return (
    <section className="pv-callout">
      <span className="pv-poster-kicker on-accent">Key takeaway</span>
      <p className="pv-callout-text">Teams that adopt a system ship 2× faster and report markedly higher design satisfaction.</p>
    </section>
  );
}

function PosterCredit({ ctx }) {
  const { theme } = ctx;
  return (
    <footer className="pv-poster-credit">
      <span className="pv-brand-name">{theme.name}</span>
      <span className="pv-muted">Source: Theme Randomizer · 2026</span>
    </footer>
  );
}

/* ---------------- Dispatcher ---------------- */
export default function Block({ block, ctx }) {
  switch (block.type) {
    case 'nav': return <Nav block={block} ctx={ctx} />;
    case 'sidebar': return <Sidebar ctx={ctx} />;
    case 'footer': return <Footer block={block} ctx={ctx} />;
    case 'hero': return <Hero block={block} ctx={ctx} />;
    case 'features': return <Features block={block} ctx={ctx} />;
    case 'stats': return <Stats block={block} ctx={ctx} />;
    case 'kpis': return <Stats block={block} ctx={ctx} bare />;
    case 'showcase': return <Tiles block={block} ctx={ctx} head={<SectionHead eyebrow="Showcase" title="Built with the system" center />} captions={PROJECTS} />;
    case 'gallery': return <Tiles block={block} ctx={ctx} head={<SectionHead eyebrow="Work" title="Selected projects" />} captions={PROJECTS} />;
    case 'testimonial': return <Testimonial block={block} />;
    case 'media': return <Media block={block} ctx={ctx} />;
    case 'cta': return <Cta block={block} ctx={ctx} />;
    case 'about': return <About block={block} ctx={ctx} />;
    case 'pageheader': return <PageHeader block={block} />;
    case 'analytics': return <Analytics block={block} ctx={ctx} />;
    case 'table': return <Table block={block} />;
    case 'activity': return <ActivityFeed />;
    case 'appbar': return <AppBar block={block} ctx={ctx} />;
    case 'apphero': return <AppHero block={block} ctx={ctx} />;
    case 'quickactions': return <QuickActions ctx={ctx} />;
    case 'applist': return <AppList block={block} ctx={ctx} />;
    case 'appcards': return <AppCards block={block} ctx={ctx} />;
    case 'tabbar': return <TabBar ctx={ctx} />;
    case 'marquee': return <Marquee block={block} />;
    case 'bigstatement': return <BigStatement block={block} />;
    case 'logos': return <Logos ctx={ctx} />;
    case 'steps': return <Steps block={block} />;
    case 'photobento': return <PhotoBento block={block} ctx={ctx} />;
    case 'indexlist': return <IndexList block={block} ctx={ctx} />;
    case 'imagemarquee': return <ImageMarquee block={block} ctx={ctx} />;
    case 'statementphoto': return <StatementPhoto block={block} ctx={ctx} />;
    case 'posterhead': return <PosterHead block={block} ctx={ctx} />;
    case 'figures': return <Figures block={block} />;
    case 'postchart': return <PostChart block={block} ctx={ctx} />;
    case 'breakdown': return <Breakdown block={block} />;
    case 'callout': return <Callout block={block} />;
    case 'postercredit': return <PosterCredit ctx={ctx} />;
    default: return null;
  }
}
