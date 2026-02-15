import type { Role } from '@/domain/entities/role'

export type MemberStatus = 'online' | 'studying' | 'offline'

export type Member = {
  id: string
  displayName: string
  email: string
  avatarUrl: string | null
  role: Role
  status: MemberStatus
  subjects: string[]
}

export type Subject = {
  id: string
  name: string
  category: string
  notesCount: number
  questionsCount: number
  attachmentsCount: number
  lastActivity: string
  contributorsCount: number
}

export const members: Member[] = [
  {
    id: '1',
    displayName: 'Amara Chen',
    email: 'amara.chen@university.edu',
    avatarUrl: null,
    role: 'student',
    status: 'online',
    subjects: ['Calculus II', 'Physics']
  },
  {
    id: '2',
    displayName: 'Jordan Rivera',
    email: 'jordan.r@university.edu',
    avatarUrl: null,
    role: 'monitor',
    status: 'studying',
    subjects: ['Organic Chemistry', 'Biology']
  },
  {
    id: '3',
    displayName: 'Sofia Petrov',
    email: 'sofia.petrov@university.edu',
    avatarUrl: null,
    role: 'teacher',
    status: 'online',
    subjects: ['Linear Algebra', 'Calculus II']
  },
  {
    id: '4',
    displayName: 'Marcus Johnson',
    email: 'marcus.j@university.edu',
    avatarUrl: null,
    role: 'student',
    status: 'offline',
    subjects: ['Data Structures', 'Algorithms']
  },
  {
    id: '5',
    displayName: 'Elena Vasquez',
    email: 'elena.v@university.edu',
    avatarUrl: null,
    role: 'admin',
    status: 'online',
    subjects: ['Physics', 'Linear Algebra']
  },
  {
    id: '6',
    displayName: 'David Kim',
    email: 'david.kim@university.edu',
    avatarUrl: null,
    role: 'student',
    status: 'studying',
    subjects: ['Organic Chemistry']
  },
  {
    id: '7',
    displayName: 'Priya Sharma',
    email: 'priya.s@university.edu',
    avatarUrl: null,
    role: 'student',
    status: 'offline',
    subjects: ['Calculus II', 'Data Structures']
  },
  {
    id: '8',
    displayName: 'Lucas Andersson',
    email: 'lucas.a@university.edu',
    avatarUrl: null,
    role: 'monitor',
    status: 'online',
    subjects: ['Algorithms', 'Physics']
  }
]

export const subjects: Subject[] = [
  {
    id: '1',
    name: 'Calculus II',
    category: 'Mathematics',
    notesCount: 24,
    questionsCount: 18,
    attachmentsCount: 12,
    lastActivity: '2 hours ago',
    contributorsCount: 5
  },
  {
    id: '2',
    name: 'Organic Chemistry',
    category: 'Chemistry',
    notesCount: 31,
    questionsCount: 22,
    attachmentsCount: 8,
    lastActivity: '1 hour ago',
    contributorsCount: 4
  },
  {
    id: '3',
    name: 'Linear Algebra',
    category: 'Mathematics',
    notesCount: 18,
    questionsCount: 14,
    attachmentsCount: 6,
    lastActivity: '3 hours ago',
    contributorsCount: 3
  },
  {
    id: '4',
    name: 'Data Structures',
    category: 'Computer Science',
    notesCount: 42,
    questionsCount: 35,
    attachmentsCount: 15,
    lastActivity: '30 minutes ago',
    contributorsCount: 6
  },
  {
    id: '5',
    name: 'Physics',
    category: 'Science',
    notesCount: 27,
    questionsCount: 19,
    attachmentsCount: 10,
    lastActivity: '4 hours ago',
    contributorsCount: 4
  },
  {
    id: '6',
    name: 'Algorithms',
    category: 'Computer Science',
    notesCount: 36,
    questionsCount: 28,
    attachmentsCount: 11,
    lastActivity: '1 hour ago',
    contributorsCount: 5
  }
]
