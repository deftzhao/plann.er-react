import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'rounded-lg px-5 font-medium flex items-center justify-center gap-2',

  variants: {
    variant: {
      primary: 'bg-lime-300 text-lime-950 hover:bg-lime-400 transition-colors',
      secondary:
        'bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-colors',
    },

    size: {
      default: 'py-2',
      full: 'w-full h-11',
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

export const Button = ({ variant, size, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...rest}
    />
  )
}
