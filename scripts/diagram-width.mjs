const MOBILE_COLUMN_WIDTH = 358;
const MIN_DESKTOP_WIDTH = 420;
const MAX_DESKTOP_WIDTH = 720;
const SCREENSHOT_MIN_WIDTH = 560;
const TARGET_DESKTOP_TEXT_PX = 20;
const EXPORT_PADDING = 10;

function sceneWidth(elements) {
  let minX = Infinity;
  let maxX = -Infinity;
  const addX = (x) => {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
  };

  for (const element of elements) {
    const x = element.x ?? 0;
    if (element.points?.length) {
      for (const [pointX] of element.points) addX(x + pointX);
    } else {
      addX(x);
      addX(x + (element.width ?? 0));
    }
  }

  return minX === Infinity ? 0 : maxX - minX;
}

export function recommendedDiagramWidth(scene) {
  const elements = (scene.elements ?? []).filter((element) => !element.isDeleted);
  const width = sceneWidth(elements);
  if (width === 0) return null;

  const fontSizes = elements
    .filter((element) => element.type === 'text' && element.fontSize)
    .map((element) => element.fontSize)
    .sort((a, b) => a - b);
  const representativeFont = fontSizes[Math.floor(fontSizes.length * 0.2)];
  const textBasedWidth = representativeFont
    ? (TARGET_DESKTOP_TEXT_PX * (width + 2 * EXPORT_PADDING)) / representativeFont
    : MIN_DESKTOP_WIDTH;
  const screenshotFloor = elements.some((element) => element.type === 'image')
    ? SCREENSHOT_MIN_WIDTH
    : MIN_DESKTOP_WIDTH;
  const preferred = Math.max(screenshotFloor, textBasedWidth, MOBILE_COLUMN_WIDTH);
  const clamped = Math.min(MAX_DESKTOP_WIDTH, Math.max(MIN_DESKTOP_WIDTH, preferred));
  return Math.round(clamped / 20) * 20;
}
