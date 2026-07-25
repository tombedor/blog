import {useColorMode} from '@docusaurus/theme-common';

// Recharts renders plain SVG/DOM with inline styles, so it doesn't pick up
// the site's CSS custom properties automatically. This gives chart
// components a matching light/dark palette to use instead of hardcoding
// light-mode-only colors.
export default function useChartColors() {
  const {colorMode} = useColorMode();
  const dark = colorMode === 'dark';

  return {
    dark,
    text: dark ? '#e9ecef' : '#212529',
    muted: dark ? '#adb5bd' : '#495057',
    axisLabel: dark ? '#adb5bd' : '#868e96',
    grid: dark ? '#3a3f44' : '#e9ecef',
    cursor: dark ? '#495057' : '#ced4da',
    // Tooltips stay a light card in both themes (simplest way to guarantee
    // contrast for a small transient popup); tooltipText is set explicitly
    // rather than left to inherit, since the surrounding page text color
    // flips with the theme and would otherwise land light-on-white.
    tooltipBg: '#fff',
    tooltipBorder: '#dee2e6',
    tooltipText: '#212529',
  };
}
