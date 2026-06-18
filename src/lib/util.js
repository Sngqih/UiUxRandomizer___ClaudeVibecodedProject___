// Small random / array helpers used throughout the generator.

export const rand = (min, max) => Math.random() * (max - min) + min;

export const randInt = (min, max) => Math.floor(rand(min, max + 1));

export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const pickN = (arr, n) => shuffle(arr).slice(0, n);

export const chance = (p) => Math.random() < p;

// Round to the nearest step (used for "nice" radius values, etc.).
export const snap = (n, step) => Math.round(n / step) * step;

// Deterministic PRNG (mulberry32). Given a seed, returns a function producing
// floats in [0,1). Used so generated visuals are stable across React re-renders
// but change whenever a new theme (new seed) is rolled.
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Tiny string hash → 32-bit int, for deriving per-role seeds.
export function hashStr(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
