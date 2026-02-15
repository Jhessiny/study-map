import { Handle, Position } from '@xyflow/react'

import type { SubjectNodeData } from '@/presentation/components/features/subject/tree-layout'

type SubjectNodeProps = {
  data: SubjectNodeData
}

export function SubjectNode({ data }: SubjectNodeProps) {
  const fontSize = data.nodeWidth * 0.05

  return (
    <div className='h-full w-full overflow-hidden rounded border bg-white shadow'>
      <Handle type='target' position={Position.Top} />

      <div
        className='flex h-full w-full flex-col items-center justify-center px-[4%]'
        style={{ gap: fontSize * 0.3 }}
      >
        <span
          className='max-w-full truncate font-medium'
          style={{ fontSize, lineHeight: 1.2 }}
        >
          {data.name}
        </span>

        {data.metadata.childrenCount > 0 && (
          <span
            className='rounded-full bg-gray-200 px-[3%] text-gray-600'
            style={{ fontSize: fontSize * 0.6, lineHeight: 1.4 }}
          >
            {data.metadata.childrenCount} children
          </span>
        )}
      </div>

      <Handle type='source' position={Position.Bottom} />
    </div>
  )
}
