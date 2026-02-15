import type { Node } from '@xyflow/react'
import type { icons } from 'lucide-react'

import type { SubjectTree, Topic } from '../types'

import { LAYOUTS } from './layout'

function toPascalCase(str: string): string {
  return str
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}

export type IconName = keyof typeof icons

export type SubjectNodeData = {
  title: string
  image: string | null
  iconName: IconName
  level: number
  subjectId: string
  size: number
  fontSize: number
  cornerRadius: number
  padding: number
}

export type ArticleNodeData = {
  title: string
  subTitle: string
  topics: Topic[]
  subjectId: string
  level: number
  width: number
  height: number
  fontSize: number
  cornerRadius: number
  padding: number
}

export function buildSubjectNode(
  subject: SubjectTree,
  level: number,
  x: number,
  y: number
): Node {
  const layout = LAYOUTS[level]

  return {
    id: subject.id,
    type: 'subjectCard',
    position: { x, y },
    data: {
      title: subject.title,
      image: subject.image,
      iconName: toPascalCase(subject.icon) as IconName,
      level,
      subjectId: subject.id,
      size: layout.size,
      fontSize: layout.fontSize,
      cornerRadius: layout.cornerRadius,
      padding: layout.padding
    },
    style: { width: layout.size, height: layout.size },
    draggable: false,
    connectable: false
  }
}

export function buildArticleNode(
  subject: SubjectTree,
  level: number,
  x: number,
  y: number
): Node {
  const layout = LAYOUTS[level]
  const topics = subject.topics.map((t) => ({
    id: t.id,
    title: t.title
  }))

  const articleHeight =
    topics.length > 0
      ? layout.padding * (topics.length * 1.5 + 3)
      : layout.padding * 5.5

  const nextLayout = LAYOUTS[level + 1]
  const articleY = nextLayout
    ? layout.size + nextLayout.size * 2.5
    : layout.size + layout.padding * 2.5

  return {
    id: `${subject.id}-article`,
    type: 'subjectArticle',
    position: { x, y: y + articleY },
    data: {
      title: subject.title,
      subTitle: subject.subTitle,
      topics,
      subjectId: subject.id,
      level,
      width: layout.size,
      height: articleHeight,
      fontSize: layout.fontSize / 2,
      cornerRadius: layout.cornerRadius / 3,
      padding: layout.padding
    },
    style: { width: layout.size },
    draggable: false,
    connectable: false
  }
}
