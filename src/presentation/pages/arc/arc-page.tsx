import { ArcFlow } from './components/arc-flow'

export function ArcPage() {
  return (
    <div className='flex flex-1 flex-col'>
      <div className='border-b bg-white px-6 py-4'>
        <h1 className='text-lg font-semibold'>Arc View</h1>
        <p className='text-sm text-muted-foreground'>
          Explore subjects with zoom-based navigation
        </p>
      </div>

      <div className='h-[calc(100vh-8rem)]'>
        <ArcFlow />
      </div>
    </div>
  )
}
