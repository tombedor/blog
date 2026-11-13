const MOBILE_COLUMN_WIDTH = 358;
const MIN_DESKTOP_WIDTH = 420;
const MAX_DESKTOP_WIDTH = 560;
const MAX_WIDE_SCREENSHOT_WIDTH = 720;
const MAX_DESKTOP_HEIGHT = 640;
const SCREENSHOT_MIN_WIDTH = 560;
const TARGET_DESKTOP_TEXT_PX = 20;
const EXPORT_PADDING = 10;

function sceneBounds(elements) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  const addPoint = (x, y) => {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  };

  for (const element of elements) {
    const x = element.x ?? 0;
    const y = element.y ?? 0;
    if (element.points?.length) {
      for (const [pointX, pointY] of element.points) {
        addPoint(x + pointX, y + pointY);
      }
    } else {
      addPoint(x, y);
      addPoint(x + (element.width ?? 0), y + (element.height ?? 0));
    }
  }

  return minX === Infinity
    ? {width: 0, height: 0}
    : {width: maxX - minX, height: maxY - minY};
}

export function recommendedDiagramWidth(scene) {
  const elements = (scene.elements ?? []).filter((element) => !element.isDeleted);
  const {width, height} = sceneBounds(elements);
  if (width === 0) return null;

  const fontSizes = elements
    .filter((element) => element.type === 'text' && element.fontSize)
    .map((element) => element.fontSize)
    .sort((a, b) => a - b);
  const representativeFont = fontSizes[Math.floor(fontSizes.length * 0.2)];
  const textBasedWidth = representativeFont
    ? (TARGET_DESKTOP_TEXT_PX * (width + 2 * EXPORT_PADDING)) / representativeFont
    : MIN_DESKTOP_WIDTH;
  const isScreenshot = elements.some((element) => element.type === 'image');
  const isWideScreenshot = isScreenshot && height > 0 && width / height >= 1.5;
  const screenshotFloor = isScreenshot
    ? isWideScreenshot ? MAX_WIDE_SCREENSHOT_WIDTH : SCREENSHOT_MIN_WIDTH
    : MIN_DESKTOP_WIDTH;
  const maxDesktopWidth = isWideScreenshot
    ? MAX_WIDE_SCREENSHOT_WIDTH
    : MAX_DESKTOP_WIDTH;
  const preferred = Math.max(screenshotFloor, textBasedWidth, MOBILE_COLUMN_WIDTH);
  const heightBasedWidth = height > 0
    ? (MAX_DESKTOP_HEIGHT * width) / height
    : maxDesktopWidth;
  const clamped = Math.max(
    MIN_DESKTOP_WIDTH,
    Math.min(maxDesktopWidth, heightBasedWidth, preferred),
  );
  return Math.round(clamped / 20) * 20;
}
