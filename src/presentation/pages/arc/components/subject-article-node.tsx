import { memo } from 'react'

import type { Node, NodeProps } from '@xyflow/react'

import type { ArticleNodeData } from '../helpers/build-node'

type SubjectArticleNodeType = Node<ArticleNodeData, 'subjectArticle'>

export const SubjectArticleNode = memo(
  ({ data }: NodeProps<SubjectArticleNodeType>) => {
    const { fontSize, cornerRadius, padding } = data

    return (
      <div
        style={{
          width: '100%',
          height: data.height,
          background: '#fff',
          borderRadius: cornerRadius,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          padding,
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontWeight: 700,
            fontSize: fontSize * 1.2,
            color: '#1a1a2e',
            marginBottom: padding * 0.3
          }}
        >
          {data.title}
        </div>

        {data.subTitle && (
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize,
              color: '#6b7280',
              marginBottom: padding * 0.5
            }}
          >
            {data.subTitle}
          </div>
        )}

        {data.topics.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: padding * 0.3
            }}
          >
            {data.topics.map((topic) => (
              <div
                key={topic.id}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize,
                  color: '#374151',
                  borderLeft: `${Math.max(2, padding * 0.05)}px solid #5a61ff`,
                  paddingLeft: padding * 0.3
                }}
              >
                {topic.title}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)

SubjectArticleNode.displayName = 'SubjectArticleNode'
