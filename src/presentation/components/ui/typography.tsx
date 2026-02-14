import type React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'font-heading text-4xl font-bold leading-tight tracking-tight',
      h2: 'font-heading text-3xl font-bold leading-tight tracking-tight',
      h3: 'font-heading text-2xl font-semibold leading-snug',
      h4: 'font-heading text-xl font-semibold leading-snug',
      p: 'text-base leading-normal',
      lead: 'text-lg leading-normal text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm leading-normal',
      muted: 'text-sm text-muted-foreground',
      caption: 'text-sm text-muted-foreground',
      label:
        'text-xs font-medium uppercase tracking-wider text-muted-foreground'
    }
  },
  defaultVariants: {
    variant: 'p'
  }
})

type VariantTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'

const variantTagMap: Record<
  NonNullable<VariantProps<typeof typographyVariants>['variant']>,
  VariantTag
> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  lead: 'p',
  large: 'p',
  small: 'p',
  muted: 'p',
  caption: 'span',
  label: 'span'
}

function Typography({
  className,
  variant = 'p',
  asChild = false,
  ...props
}: React.ComponentProps<'p'> &
  VariantProps<typeof typographyVariants> & {
    asChild?: boolean
  }) {
  const Tag = asChild ? Slot.Root : variantTagMap[variant!]

  return (
    <Tag
      data-slot='typography'
      className={cn(typographyVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Typography, typographyVariants }
