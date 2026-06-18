import Block from './blocks/Block.jsx';
import { iconByName } from '../lib/icons.js';
import { toCssVars } from '../lib/tokens.js';

// Renders the generated layout. The theme's CSS variables + layout data-attrs
// (density / card style / alignment) drive all styling; each block is rendered
// by the Block dispatcher. Three shells: vertical stack, sidebar app, phone.
export default function Preview({ theme, images }) {
  const { layout } = theme;
  const stroke = theme.icons.strokeWidth;
  const icons = theme.icons.sample
    .map((name) => ({ name, Comp: iconByName(name) }))
    .filter((i) => i.Comp);
  const ctx = { theme, icons, stroke, images };

  const surfaceStyle = { ...toCssVars(theme), background: 'var(--bg)' };
  const dataAttrs = {
    'data-density': layout.density,
    'data-cards': layout.cardStyle,
    'data-align': layout.align,
    'data-accent': layout.accent,
    'data-archetype': layout.archetype,
  };

  if (layout.shell === 'sidebar') {
    const sidebar = layout.blocks.find((b) => b.type === 'sidebar');
    const rest = layout.blocks.filter((b) => b.type !== 'sidebar');
    return (
      <div className="preview-surface pv-shell-sidebar-wrap" style={surfaceStyle} {...dataAttrs}>
        <div className="pv-shell-sidebar">
          {sidebar && <Block block={sidebar} ctx={ctx} />}
          <main className="pv-main">
            {rest.map((b) => <Block key={b.seed} block={b} ctx={ctx} />)}
          </main>
        </div>
      </div>
    );
  }

  if (layout.shell === 'poster') {
    return (
      <div className="preview-surface pv-poster-stage" style={surfaceStyle} {...dataAttrs}>
        <div className="pv-poster">
          {layout.grain && <div className="pv-grain" />}
          {layout.blocks.map((b) => <Block key={b.seed} block={b} ctx={ctx} />)}
        </div>
      </div>
    );
  }

  if (layout.shell === 'phone') {
    return (
      <div className="preview-surface pv-phone-stage" style={surfaceStyle} {...dataAttrs}>
        <div className="pv-phone">
          <div className="pv-phone-notch" />
          <div className="pv-phone-screen">
            {layout.blocks.map((b) => <Block key={b.seed} block={b} ctx={ctx} />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="preview-surface" style={surfaceStyle} {...dataAttrs}>
      <div className="pv-page">
        {layout.grain && <div className="pv-grain" />}
        {layout.blocks.map((b) => <Block key={b.seed} block={b} ctx={ctx} />)}
      </div>
    </div>
  );
}
