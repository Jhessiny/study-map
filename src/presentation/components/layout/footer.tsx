export function Footer() {
  return (
    <footer className='border-t bg-white px-6 py-4'>
      <div className='mx-auto flex max-w-4xl items-center justify-between text-sm text-muted-foreground'>
        <span>&copy; {new Date().getFullYear()} StudyMap</span>
        <span>Student Collaboration Platform</span>
      </div>
    </footer>
  )
}
