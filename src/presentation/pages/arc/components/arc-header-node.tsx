import { memo } from 'react'

import type { Node, NodeProps } from '@xyflow/react'

type ArcHeaderData = {
  title: string
  description: string
  ctaLabel?: string
  fontSize: number
  padding: number
}

type ArcHeaderNodeType = Node<ArcHeaderData, 'arcHeader'>

export const ArcHeaderNode = memo(({ data }: NodeProps<ArcHeaderNodeType>) => {
  const { title, description, ctaLabel, fontSize, padding } = data

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding
      }}
    >
      <div
        style={{
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontWeight: 800,
          fontSize: fontSize * 2,
          color: '#1a1a2e',
          marginBottom: padding * 0.5,
          whiteSpace: 'nowrap'
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize,
          color: '#6b7280',
          lineHeight: 1.5,
          marginBottom: ctaLabel ? padding : 0
        }}
      >
        {description}
      </div>

      {ctaLabel && (
        <button
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: fontSize * 0.9,
            fontWeight: 600,
            color: '#fff',
            background: '#5a61ff',
            border: 'none',
            borderRadius: fontSize * 0.4,
            padding: `${fontSize * 0.5}px ${fontSize * 1.2}px`,
            cursor: 'pointer'
          }}
        >
          {ctaLabel}
        </button>
      )}
    </div>
  )
})

ArcHeaderNode.displayName = 'ArcHeaderNode'
