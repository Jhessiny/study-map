import { Book, Mail } from 'lucide-react'

import type { Role } from '@/domain/entities/role'

import { Avatar, AvatarFallback } from '@/presentation/components/ui/avatar'
import { Badge } from '@/presentation/components/ui/badge'
import { Card, CardContent } from '@/presentation/components/ui/card'
import type {
  Member,
  MemberStatus
} from '@/presentation/pages/overview/mock-data'

const statusConfig: Record<
  MemberStatus,
  { label: string; dotClass: string; textClass: string }
> = {
  online: {
    label: 'Online',
    dotClass: 'bg-green-500',
    textClass: 'text-green-600'
  },
  studying: {
    label: 'Studying',
    dotClass: 'bg-amber-500',
    textClass: 'text-amber-600'
  },
  offline: {
    label: 'Offline',
    dotClass: 'bg-gray-400',
    textClass: 'text-gray-500'
  }
}

const roleBadgeClass: Record<Role, string> = {
  student: 'bg-teal-100 text-teal-700',
  monitor: 'bg-green-100 text-green-700',
  teacher: 'bg-blue-100 text-blue-700',
  admin: 'bg-red-100 text-red-700'
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function MemberCard({ member }: { member: Member }) {
  const status = statusConfig[member.status]

  return (
    <Card>
      <CardContent className='flex items-center gap-4 py-4'>
        <div className='relative'>
          <Avatar size='lg' className='bg-teal-100 text-teal-700'>
            <AvatarFallback className='bg-teal-100 text-teal-700 text-sm font-medium'>
              {getInitials(member.displayName)}
            </AvatarFallback>
          </Avatar>
          <span
            className={`absolute right-0 bottom-0 size-3 rounded-full ring-2 ring-white ${status.dotClass}`}
          />
        </div>

        <div className='flex min-w-0 flex-1 flex-col gap-1'>
          <div className='flex items-center gap-2'>
            <span className='text-sm font-semibold'>{member.displayName}</span>
            <Badge variant='outline' className={roleBadgeClass[member.role]}>
              {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
            </Badge>
          </div>

          <div className='text-muted-foreground flex items-center gap-1 text-xs'>
            <Mail className='size-3' />
            <span>{member.email}</span>
          </div>

          <div className='flex items-center gap-1'>
            <Book className='text-muted-foreground size-3' />
            <div className='flex flex-wrap gap-1'>
              {member.subjects.map((subject) => (
                <Badge key={subject} variant='secondary' className='text-xs'>
                  {subject}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`flex items-center gap-1.5 text-sm font-medium ${status.textClass}`}
        >
          <span className={`size-2 rounded-full ${status.dotClass}`} />
          {status.label}
        </div>
      </CardContent>
    </Card>
  )
}
