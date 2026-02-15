import { memo } from 'react'

import type { Node, NodeProps } from '@xyflow/react'

type TopicLabelData = {
  label: string
  fontSize: number
}

type TopicLabelNodeType = Node<TopicLabelData, 'topicLabel'>

export const TopicLabelNode = memo(
  ({ data }: NodeProps<TopicLabelNodeType>) => {
    const { label, fontSize } = data

    return (
      <div
        style={{
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontWeight: 800,
          fontSize,
          color: 'rgba(90, 97, 255, 0.15)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
        }}
      >
        {label}
      </div>
    )
  }
)

TopicLabelNode.displayName = 'TopicLabelNode'
