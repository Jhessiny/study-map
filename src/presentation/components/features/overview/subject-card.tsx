import {
  Book,
  Clock,
  FileText,
  HelpCircle,
  Paperclip,
  Users
} from 'lucide-react'

import { Badge } from '@/presentation/components/ui/badge'
import { Card, CardContent } from '@/presentation/components/ui/card'
import type { Subject } from '@/presentation/pages/overview/mock-data'

export function SubjectCard({ subject }: { subject: Subject }) {
  return (
    <Card>
      <CardContent className='flex items-center gap-4 py-4'>
        <div className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-teal-100'>
          <Book className='size-5 text-teal-600' />
        </div>

        <div className='flex min-w-0 flex-1 flex-col gap-1'>
          <div className='flex items-center gap-2'>
            <span className='text-sm font-semibold'>{subject.name}</span>
            <Badge variant='secondary'>{subject.category}</Badge>
          </div>

          <div className='text-muted-foreground flex items-center gap-3 text-xs'>
            <span className='flex items-center gap-1'>
              <FileText className='size-3' />
              {subject.notesCount} notes
            </span>
            <span className='flex items-center gap-1'>
              <HelpCircle className='size-3' />
              {subject.questionsCount} questions
            </span>
            <span className='flex items-center gap-1'>
              <Paperclip className='size-3' />
              {subject.attachmentsCount} attachments
            </span>
          </div>
        </div>

        <div className='text-muted-foreground flex flex-col items-end gap-1 text-xs'>
          <span className='flex items-center gap-1'>
            <Clock className='size-3' />
            {subject.lastActivity}
          </span>
          <span className='flex items-center gap-1'>
            <Users className='size-3' />
            {subject.contributorsCount} contributors
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
