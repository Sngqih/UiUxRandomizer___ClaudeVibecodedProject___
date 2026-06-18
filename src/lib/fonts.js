// Curated Google Font pairings. Each entry: heading [family, fallback] and
// body [family, fallback], the weights to load, and "vibe" tags used by
// style presets to filter to an on-brand subset.

export const FONT_PAIRS = [
  { id: 'playfair-source', h: ['Playfair Display', 'serif'], b: ['Source Sans 3', 'sans-serif'], hw: '600;800', bw: '400;600', vibes: ['elegant', 'editorial', 'serif'] },
  { id: 'space-inter', h: ['Space Grotesk', 'sans-serif'], b: ['Inter', 'sans-serif'], hw: '500;700', bw: '400;600', vibes: ['modern', 'tech', 'geometric', 'minimal'] },
  { id: 'archivo-roboto', h: ['Archivo Black', 'sans-serif'], b: ['Roboto', 'sans-serif'], hw: '400', bw: '400;500', vibes: ['bold', 'modern'] },
  { id: 'dmserif-dmsans', h: ['DM Serif Display', 'serif'], b: ['DM Sans', 'sans-serif'], hw: '400', bw: '400;500', vibes: ['elegant', 'editorial', 'serif'] },
  { id: 'bebas-work', h: ['Bebas Neue', 'sans-serif'], b: ['Work Sans', 'sans-serif'], hw: '400', bw: '400;600', vibes: ['bold', 'condensed', 'retro'] },
  { id: 'lora-nunito', h: ['Lora', 'serif'], b: ['Nunito Sans', 'sans-serif'], hw: '500;700', bw: '400;600', vibes: ['editorial', 'friendly', 'serif'] },
  { id: 'syne-inter', h: ['Syne', 'sans-serif'], b: ['Inter', 'sans-serif'], hw: '600;800', bw: '400;500', vibes: ['futuristic', 'geometric', 'modern'] },
  { id: 'fraunces-franklin', h: ['Fraunces', 'serif'], b: ['Libre Franklin', 'sans-serif'], hw: '500;700', bw: '400;500', vibes: ['editorial', 'elegant', 'organic'] },
  { id: 'sora-inter', h: ['Sora', 'sans-serif'], b: ['Inter', 'sans-serif'], hw: '600;700', bw: '400;500', vibes: ['tech', 'modern', 'minimal'] },
  { id: 'unbounded-inter', h: ['Unbounded', 'sans-serif'], b: ['Inter', 'sans-serif'], hw: '600;800', bw: '400;500', vibes: ['playful', 'bold', 'futuristic'] },
  { id: 'poppins-inter', h: ['Poppins', 'sans-serif'], b: ['Inter', 'sans-serif'], hw: '600;700', bw: '400;500', vibes: ['friendly', 'geometric', 'modern'] },
  { id: 'montserrat-open', h: ['Montserrat', 'sans-serif'], b: ['Open Sans', 'sans-serif'], hw: '600;800', bw: '400;600', vibes: ['corporate', 'modern', 'minimal'] },
  { id: 'oswald-lato', h: ['Oswald', 'sans-serif'], b: ['Lato', 'sans-serif'], hw: '500;700', bw: '400;700', vibes: ['condensed', 'bold', 'corporate'] },
  { id: 'abril-poppins', h: ['Abril Fatface', 'serif'], b: ['Poppins', 'sans-serif'], hw: '400', bw: '400;500', vibes: ['retro', 'elegant', 'playful'] },
  { id: 'righteous-karla', h: ['Righteous', 'sans-serif'], b: ['Karla', 'sans-serif'], hw: '400', bw: '400;600', vibes: ['retro', 'playful', 'friendly'] },
  { id: 'jetbrains-inter', h: ['JetBrains Mono', 'monospace'], b: ['Inter', 'sans-serif'], hw: '500;700', bw: '400;500', vibes: ['tech', 'mono'] },
  { id: 'spacemono-inter', h: ['Space Mono', 'monospace'], b: ['Inter', 'sans-serif'], hw: '400;700', bw: '400;500', vibes: ['tech', 'mono', 'retro'] },
  { id: 'spectral-inter', h: ['Spectral', 'serif'], b: ['Inter', 'sans-serif'], hw: '500;700', bw: '400;500', vibes: ['editorial', 'elegant', 'serif'] },
  { id: 'cormorant-proza', h: ['Cormorant Garamond', 'serif'], b: ['Proza Libre', 'sans-serif'], hw: '500;700', bw: '400;500', vibes: ['elegant', 'serif', 'editorial'] },
  { id: 'anton-roboto', h: ['Anton', 'sans-serif'], b: ['Roboto', 'sans-serif'], hw: '400', bw: '400;500', vibes: ['bold', 'condensed'] },
  { id: 'epilogue-inter', h: ['Epilogue', 'sans-serif'], b: ['Inter', 'sans-serif'], hw: '600;800', bw: '400;500', vibes: ['modern', 'geometric', 'minimal'] },
  { id: 'manrope', h: ['Manrope', 'sans-serif'], b: ['Manrope', 'sans-serif'], hw: '600;800', bw: '400;500', vibes: ['minimal', 'modern', 'clean'] },
  { id: 'libre-inter', h: ['Libre Baskerville', 'serif'], b: ['Inter', 'sans-serif'], hw: '400;700', bw: '400;500', vibes: ['editorial', 'elegant', 'serif'] },
  { id: 'chakra-inter', h: ['Chakra Petch', 'sans-serif'], b: ['Inter', 'sans-serif'], hw: '500;700', bw: '400;500', vibes: ['futuristic', 'tech'] },
  { id: 'bigshoulders-inter', h: ['Big Shoulders Display', 'sans-serif'], b: ['Inter', 'sans-serif'], hw: '600;800', bw: '400;500', vibes: ['bold', 'condensed', 'editorial'] },
  { id: 'pacifico-quicksand', h: ['Pacifico', 'cursive'], b: ['Quicksand', 'sans-serif'], hw: '400', bw: '400;600', vibes: ['playful', 'friendly', 'retro'] },
  { id: 'rubik', h: ['Rubik', 'sans-serif'], b: ['Rubik', 'sans-serif'], hw: '500;700', bw: '400;500', vibes: ['friendly', 'geometric', 'playful'] },
  { id: 'familjen-inter', h: ['Familjen Grotesk', 'sans-serif'], b: ['Inter', 'sans-serif'], hw: '500;700', bw: '400;500', vibes: ['minimal', 'modern', 'clean'] },

  // --- expressive / display / editorial pairings (more creative range) ---
  { id: 'bricolage-hanken', h: ['Bricolage Grotesque', 'sans-serif'], b: ['Hanken Grotesk', 'sans-serif'], hw: '600;800', bw: '400;600', vibes: ['display', 'grotesque', 'modern', 'statement'] },
  { id: 'instrument-inter', h: ['Instrument Serif', 'serif'], b: ['Inter', 'sans-serif'], hw: '400', bw: '400;500', vibes: ['elegant', 'editorial', 'magazine', 'serif'] },
  { id: 'gloock-inter', h: ['Gloock', 'serif'], b: ['Inter', 'sans-serif'], hw: '400', bw: '400;500', vibes: ['display', 'elegant', 'magazine', 'serif'] },
  { id: 'climate-inter', h: ['Climate Crisis', 'sans-serif'], b: ['Inter', 'sans-serif'], hw: '400', bw: '400;500', vibes: ['statement', 'display', 'poster', 'bold'] },
  { id: 'bungee-work', h: ['Bungee', 'sans-serif'], b: ['Work Sans', 'sans-serif'], hw: '400', bw: '400;600', vibes: ['poster', 'display', 'playful', 'bold'] },
  { id: 'monoton-space', h: ['Monoton', 'sans-serif'], b: ['Space Grotesk', 'sans-serif'], hw: '400', bw: '400;500', vibes: ['retro', 'display', 'poster', 'futuristic'] },
  { id: 'staatliches-inter', h: ['Staatliches', 'sans-serif'], b: ['Inter', 'sans-serif'], hw: '400', bw: '400;500', vibes: ['condensed', 'poster', 'bold', 'statement'] },
  { id: 'alfa-karla', h: ['Alfa Slab One', 'serif'], b: ['Karla', 'sans-serif'], hw: '400', bw: '400;600', vibes: ['bold', 'slab', 'poster', 'statement'] },
  { id: 'yeseva-work', h: ['Yeseva One', 'serif'], b: ['Work Sans', 'sans-serif'], hw: '400', bw: '400;600', vibes: ['elegant', 'display', 'magazine', 'serif'] },
  { id: 'prata-inter', h: ['Prata', 'serif'], b: ['Inter', 'sans-serif'], hw: '400', bw: '400;500', vibes: ['elegant', 'magazine', 'serif', 'editorial'] },
  { id: 'bodoni-inter', h: ['Bodoni Moda', 'serif'], b: ['Inter', 'sans-serif'], hw: '500;700', bw: '400;500', vibes: ['elegant', 'magazine', 'serif', 'editorial'] },
  { id: 'teko-inter', h: ['Teko', 'sans-serif'], b: ['Inter', 'sans-serif'], hw: '500;700', bw: '400;500', vibes: ['condensed', 'tech', 'poster'] },
  { id: 'darker-inter', h: ['Darker Grotesque', 'sans-serif'], b: ['Inter', 'sans-serif'], hw: '600;800', bw: '400;500', vibes: ['display', 'condensed', 'statement', 'modern'] },
  { id: 'anybody-inter', h: ['Anybody', 'sans-serif'], b: ['Inter', 'sans-serif'], hw: '600;800', bw: '400;500', vibes: ['display', 'condensed', 'experimental'] },
  { id: 'bagel-quicksand', h: ['Bagel Fat One', 'sans-serif'], b: ['Quicksand', 'sans-serif'], hw: '400', bw: '400;600', vibes: ['playful', 'display', 'friendly'] },
  { id: 'pixelify-spacemono', h: ['Pixelify Sans', 'sans-serif'], b: ['Space Mono', 'monospace'], hw: '400;700', bw: '400', vibes: ['retro', 'playful', 'tech', 'experimental'] },
  { id: 'ultra-work', h: ['Ultra', 'serif'], b: ['Work Sans', 'sans-serif'], hw: '400', bw: '400;600', vibes: ['bold', 'slab', 'statement', 'poster'] },
  { id: 'zilla-inter', h: ['Zilla Slab', 'serif'], b: ['Inter', 'sans-serif'], hw: '500;700', bw: '400;500', vibes: ['slab', 'tech', 'editorial'] },
  { id: 'hepta-inter', h: ['Hepta Slab', 'serif'], b: ['Inter', 'sans-serif'], hw: '600;800', bw: '400;500', vibes: ['slab', 'editorial', 'bold'] },
  { id: 'schibsted', h: ['Schibsted Grotesk', 'sans-serif'], b: ['Schibsted Grotesk', 'sans-serif'], hw: '600;800', bw: '400;600', vibes: ['modern', 'grotesque', 'minimal'] },
  { id: 'gabarito-inter', h: ['Gabarito', 'sans-serif'], b: ['Inter', 'sans-serif'], hw: '600;800', bw: '400;500', vibes: ['friendly', 'geometric', 'modern'] },
  { id: 'librecaslon-inter', h: ['Libre Caslon Display', 'serif'], b: ['Inter', 'sans-serif'], hw: '400', bw: '400;500', vibes: ['editorial', 'elegant', 'magazine', 'serif'] },
  { id: 'martianmono-inter', h: ['Martian Mono', 'monospace'], b: ['Inter', 'sans-serif'], hw: '500;700', bw: '400;500', vibes: ['mono', 'tech', 'experimental'] },
  { id: 'khand-inter', h: ['Khand', 'sans-serif'], b: ['Inter', 'sans-serif'], hw: '500;700', bw: '400;500', vibes: ['condensed', 'poster', 'modern'] },
];

// Build the Google Fonts css2 URL for a generated typography object.
export function googleFontsHref(typography) {
  const families = [typography.heading, typography.body].map(
    (f) => `family=${f.family.replace(/ /g, '+')}:wght@${f.weights}`,
  );
  return `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap`;
}
