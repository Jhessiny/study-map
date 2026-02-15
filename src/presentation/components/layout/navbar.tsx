import { Link } from 'react-router-dom'

import { Button } from '@/presentation/components/ui/button'

export function Navbar() {
  return (
    <nav className='flex items-center justify-between border-b bg-white px-6 py-3'>
      <div className='flex items-center gap-1 text-xl font-bold'>
        <span className='text-primary'>Study</span>
        <span className='text-secondary'>Map</span>
      </div>

      <div className='flex items-center gap-3'>
        <Button variant='outline' asChild>
          <Link to='/content-tree'>Content Tree</Link>
        </Button>
        <Button variant='default' asChild>
          <Link to='/overview'>View Users</Link>
        </Button>
      </div>
    </nav>
  )
}
