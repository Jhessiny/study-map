import type { LucideIcon } from 'lucide-react'

import { Card, CardContent } from '@/presentation/components/ui/card'

type StatCardProps = {
  icon: LucideIcon
  iconBgClass: string
  iconClass: string
  value: number
  label: string
}

export function StatCard({
  icon: Icon,
  iconBgClass,
  iconClass,
  value,
  label
}: StatCardProps) {
  return (
    <Card>
      <CardContent className='flex items-center gap-3 py-4'>
        <div
          className={`flex size-10 items-center justify-center rounded-full ${iconBgClass}`}
        >
          <Icon className={`size-5 ${iconClass}`} />
        </div>
        <div>
          <p className='text-2xl font-bold'>{value}</p>
          <p className='text-muted-foreground text-xs'>{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}
