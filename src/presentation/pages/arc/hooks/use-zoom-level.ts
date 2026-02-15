import { useCallback, useRef, useState } from 'react'

import type { Viewport } from '@xyflow/react'

import { LAYOUTS } from '../helpers/layout'

const LEVEL_THRESHOLDS = [0, 0, 8, 8]

function getVisibleLevelRange(zoom: number): [number, number] {
  let maxLevel = 0

  for (let level = 0; level <= 3; level++) {
    const apparentSize = LAYOUTS[level].size * zoom
    if (apparentSize >= LEVEL_THRESHOLDS[level]) {
      maxLevel = level
    }
  }

  const minLevel = Math.max(0, maxLevel - 2)

  return [minLevel, maxLevel]
}

export function useZoomLevel() {
  const [visibleRange, setVisibleRange] = useState<[number, number]>([0, 1])
  const lastRangeRef = useRef<[number, number]>([0, 1])

  const onViewportChange = useCallback((viewport: Viewport) => {
    const newRange = getVisibleLevelRange(viewport.zoom)

    if (
      newRange[0] !== lastRangeRef.current[0] ||
      newRange[1] !== lastRangeRef.current[1]
    ) {
      lastRangeRef.current = newRange
      setVisibleRange(newRange)
    }
  }, [])

  return { visibleRange, onViewportChange }
}
