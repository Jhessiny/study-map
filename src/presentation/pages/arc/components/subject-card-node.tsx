import { memo } from 'react'

import type { Node, NodeProps } from '@xyflow/react'
import { icons } from 'lucide-react'

import type { SubjectNodeData } from '../helpers/build-node'

type SubjectCardNodeType = Node<SubjectNodeData, 'subjectCard'>

export const SubjectCardNode = memo(
  ({ data }: NodeProps<SubjectCardNodeType>) => {
    const { fontSize, cornerRadius, padding } = data

    const iconSize = fontSize * 2.5
    const IconComponent = icons[data.iconName]

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
          borderRadius: cornerRadius,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
        }}
      >
        {data.image ? (
          <img
            src={data.image}
            alt={data.title}
            loading='lazy'
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: '#E2E8F4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {IconComponent && (
              <IconComponent
                size={iconSize}
                color='rgba(90, 97, 255, 0.4)'
                strokeWidth={1.5}
              />
            )}
          </div>
        )}

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(90,97,255,0.5) 19%, rgba(56,43,102,0.5) 62%)',
            pointerEvents: 'none'
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            color: '#fff',
            fontFamily: 'Mulish, sans-serif',
            fontWeight: 700,
            fontSize,
            padding: `${padding * 0.5}px ${padding}px`,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {data.title}
        </div>
      </div>
    )
  }
)

SubjectCardNode.displayName = 'SubjectCardNode'
