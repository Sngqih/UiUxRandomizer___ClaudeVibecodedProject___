// Shared helpers + filler content used by the block renderers.

export const NAV_LINKS = ['Product', 'Features', 'Pricing', 'Docs', 'About', 'Blog'];

export const FEATURES = [
  { t: 'Lightning fast', d: 'Tuned for performance at every layer of the stack.' },
  { t: 'Secure by default', d: 'Encryption and sensible defaults, out of the box.' },
  { t: 'Fully themeable', d: 'Design tokens that adapt to any brand in seconds.' },
  { t: 'Composable', d: 'Mix and match building blocks without friction.' },
  { t: 'Realtime sync', d: 'Changes propagate instantly across every client.' },
  { t: 'Insightful', d: 'Dashboards that turn raw data into decisions.' },
];

export const STATS = [
  { label: 'Active users', value: '12.4k', delta: '+18%' },
  { label: 'Revenue', value: '$92.3k', delta: '+7.4%' },
  { label: 'Conversion', value: '4.6%', delta: '+0.9%' },
  { label: 'Retention', value: '88%', delta: '+2.1%' },
];

export const PROJECTS = ['Northwind', 'Aperture', 'Helios', 'Monarch', 'Cascade', 'Vertex'];

export const NAMES = ['Ava Chen', 'Liam Patel', 'Noah Kim', 'Mia Rossi', 'Ethan Cole', 'Zoe Park'];

export const QUOTES = [
  { q: 'This completely changed how our team ships interfaces. We move twice as fast now.', n: 'Ava Chen', r: 'Head of Design, Northwind' },
  { q: 'The cleanest system we have ever adopted. Onboarding took an afternoon.', n: 'Liam Patel', r: 'CTO, Aperture' },
];

export const TX = [
  { t: 'Spotify', s: 'Subscription', v: '-$9.99', up: false },
  { t: 'Salary', s: 'Acme Inc', v: '+$4,200', up: true },
  { t: 'Whole Foods', s: 'Groceries', v: '-$64.20', up: false },
  { t: 'Dribbble', s: 'Refund', v: '+$12.00', up: true },
];

export const ACTIVITY = [
  { who: 'Ava Chen', what: 'merged a pull request', when: '2m' },
  { who: 'Liam Patel', what: 'commented on #482', when: '14m' },
  { who: 'Noah Kim', what: 'deployed to production', when: '1h' },
  { who: 'Mia Rossi', what: 'opened an incident', when: '3h' },
];

export const initials = (name) => name.split(' ').map((p) => p[0]).join('').slice(0, 2);

// Render an icon from the theme's sampled set by index (wraps around).
export function Ico({ icons, i = 0, size = 18, stroke = 1.75, color }) {
  const item = icons[((i % icons.length) + icons.length) % icons.length];
  if (!item?.Comp) return null;
  const Comp = item.Comp;
  return <Comp size={size} strokeWidth={stroke} color={color} />;
}
