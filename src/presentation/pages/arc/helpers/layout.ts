// Root card size in px. Each child level is ~1/10th of its parent
// (parentSize minus padding on both sides, divided by 10).
const BASE_SIZE = 17760 * 2
const FONT_RATIO = 2800 / 35520
const CORNER_RATIO = 1600 / 35520
const PADDING_RATIO = 1600 / 35520
const MAX_LEVEL = 4

export type LevelLayout = {
  size: number
  fontSize: number
  cornerRadius: number
  padding: number
  gap: number
}

function computeLayout(level: number, parentSize?: number): LevelLayout {
  const size =
    level === 0
      ? BASE_SIZE
      : (parentSize! - parentSize! * PADDING_RATIO * 2) / 10

  return {
    size,
    fontSize: size * FONT_RATIO,
    cornerRadius: size * CORNER_RATIO,
    padding: size * PADDING_RATIO,
    gap: size * PADDING_RATIO * 3
  }
}

export const LAYOUTS: LevelLayout[] = []
for (let i = 0; i <= MAX_LEVEL; i++) {
  LAYOUTS.push(computeLayout(i, LAYOUTS[i - 1]?.size))
}
