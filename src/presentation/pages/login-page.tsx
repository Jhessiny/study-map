import { useState } from 'react'

import { Eye, EyeOff, Lock, Mail } from 'lucide-react'

import { Button } from '@/presentation/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/presentation/components/ui/card'
import { Input } from '@/presentation/components/ui/input'
import { Typography } from '@/presentation/components/ui/typography'

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className='flex flex-1 flex-col items-center px-4 pt-16'>
      <div className='mb-8 text-center'>
        <Typography variant='h1'>Student Collaboration Platform</Typography>
        <Typography variant='lead' className='mt-2'>
          Sign in to start collaborating with your study group
        </Typography>
      </div>

      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Sign in to your StudyMap account</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
            }}
            className='flex flex-col gap-4'
          >
            <div className='flex flex-col gap-2'>
              <label htmlFor='email' className='text-sm font-medium'>
                Email
              </label>
              <div className='relative'>
                <Mail className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
                <Input
                  id='email'
                  type='email'
                  placeholder='you@example.com'
                  className='pl-9'
                />
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <div className='flex items-center justify-between'>
                <label htmlFor='password' className='text-sm font-medium'>
                  Password
                </label>
                <a href='#' className='text-primary text-sm hover:underline'>
                  Forgot password?
                </a>
              </div>
              <div className='relative'>
                <Lock className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  className='pr-9 pl-9'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword((prev) => !prev)}
                  className='text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2'
                >
                  {showPassword ? (
                    <EyeOff className='size-4' />
                  ) : (
                    <Eye className='size-4' />
                  )}
                </button>
              </div>
            </div>

            <Button type='submit' className='w-full'>
              Sign In
            </Button>
          </form>
        </CardContent>

        <CardFooter className='justify-center'>
          <Typography variant='small'>
            Don&apos;t have an account?{' '}
            <a href='#' className='text-primary font-medium hover:underline'>
              Sign up
            </a>
          </Typography>
        </CardFooter>
      </Card>
    </main>
  )
}
