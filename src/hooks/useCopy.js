import { useCallback, useState } from 'react';

// Copy text and briefly track which key was copied (for "Copied!" feedback).
export function useCopy(timeout = 1400) {
  const [copied, setCopied] = useState(null);

  const copy = useCallback(
    async (text, key = text) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        // Fallback for non-secure contexts.
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(key);
      window.setTimeout(() => setCopied((k) => (k === key ? null : k)), timeout);
    },
    [timeout],
  );

  return { copied, copy };
}
