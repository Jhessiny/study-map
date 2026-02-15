export type Topic = {
  id: string
  title: string
}

export type SubjectTree = {
  id: string
  title: string
  subTitle: string
  image: string | null
  icon: string
  topics: Topic[]
  subjects: SubjectTree[]
}
