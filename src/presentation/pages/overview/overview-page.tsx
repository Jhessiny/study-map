import { useMemo, useState } from 'react'

import {
  Book,
  FileText,
  HelpCircle,
  Paperclip,
  Search,
  Users
} from 'lucide-react'

import { MemberCard } from '@/presentation/components/features/overview/member-card'
import { StatCard } from '@/presentation/components/features/overview/stat-card'
import { SubjectCard } from '@/presentation/components/features/overview/subject-card'
import { Input } from '@/presentation/components/ui/input'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/presentation/components/ui/tabs'
import { Typography } from '@/presentation/components/ui/typography'

import { members, subjects } from './mock-data'

export function OverviewPage() {
  const [membersSearch, setMembersSearch] = useState('')
  const [subjectsSearch, setSubjectsSearch] = useState('')

  const filteredMembers = useMemo(() => {
    const query = membersSearch.toLowerCase()
    if (!query) return members
    return members.filter(
      (m) =>
        m.displayName.toLowerCase().includes(query) ||
        m.email.toLowerCase().includes(query) ||
        m.subjects.some((s) => s.toLowerCase().includes(query))
    )
  }, [membersSearch])

  const filteredSubjects = useMemo(() => {
    const query = subjectsSearch.toLowerCase()
    if (!query) return subjects
    return subjects.filter((s) => s.name.toLowerCase().includes(query))
  }, [subjectsSearch])

  const memberStats = useMemo(() => {
    const online = members.filter((m) => m.status === 'online').length
    const studying = members.filter((m) => m.status === 'studying').length
    return { total: members.length, online, studying }
  }, [])

  const subjectStats = useMemo(() => {
    const totalNotes = subjects.reduce((sum, s) => sum + s.notesCount, 0)
    const totalQuestions = subjects.reduce(
      (sum, s) => sum + s.questionsCount,
      0
    )
    const totalAttachments = subjects.reduce(
      (sum, s) => sum + s.attachmentsCount,
      0
    )
    return {
      count: subjects.length,
      notes: totalNotes,
      questions: totalQuestions,
      attachments: totalAttachments
    }
  }, [])

  return (
    <main className='mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 pt-8'>
      <div className='mb-6'>
        <Typography variant='h1'>Overview</Typography>
        <Typography variant='muted' className='mt-1'>
          Browse members and subjects in your study group
        </Typography>
      </div>

      <Tabs defaultValue='members'>
        <TabsList>
          <TabsTrigger value='members'>
            <Users className='size-4' />
            Members
          </TabsTrigger>
          <TabsTrigger value='subjects'>
            <Book className='size-4' />
            Subjects
          </TabsTrigger>
        </TabsList>

        <TabsContent value='members' className='mt-6'>
          <div className='mb-4'>
            <Typography variant='h2'>Study Group Members</Typography>
            <Typography variant='muted' className='mt-1'>
              {memberStats.total} members total &middot; {memberStats.online}{' '}
              online &middot; {memberStats.studying} studying
            </Typography>
          </div>

          <div className='relative mb-4'>
            <Search className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
            <Input
              placeholder='Search by name, email, or subject...'
              className='pl-9'
              value={membersSearch}
              onChange={(e) => setMembersSearch(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-3'>
            {filteredMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value='subjects' className='mt-6'>
          <div className='mb-4'>
            <Typography variant='h2'>Subjects</Typography>
            <Typography variant='muted' className='mt-1'>
              {subjectStats.count} subjects &middot; {subjectStats.notes} notes
              &middot; {subjectStats.questions} questions &middot;{' '}
              {subjectStats.attachments} attachments
            </Typography>
          </div>

          <div className='relative mb-4'>
            <Search className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
            <Input
              placeholder='Search subjects...'
              className='pl-9'
              value={subjectsSearch}
              onChange={(e) => setSubjectsSearch(e.target.value)}
            />
          </div>

          <div className='mb-6 grid grid-cols-4 gap-4'>
            <StatCard
              icon={Book}
              iconBgClass='bg-teal-100'
              iconClass='text-teal-600'
              value={subjectStats.count}
              label='Subjects'
            />
            <StatCard
              icon={FileText}
              iconBgClass='bg-purple-100'
              iconClass='text-purple-600'
              value={subjectStats.notes}
              label='Total Notes'
            />
            <StatCard
              icon={HelpCircle}
              iconBgClass='bg-amber-100'
              iconClass='text-amber-600'
              value={subjectStats.questions}
              label='Questions'
            />
            <StatCard
              icon={Paperclip}
              iconBgClass='bg-pink-100'
              iconClass='text-pink-600'
              value={subjectStats.attachments}
              label='Attachments'
            />
          </div>

          <div className='flex flex-col gap-3'>
            {filteredSubjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
