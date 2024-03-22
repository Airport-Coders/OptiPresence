import { forwardRef } from 'react'
import clsx from 'clsx'
import { Logo } from './Logo'
import Image from 'next/image'

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 6h14M5 18h14M5 12h14"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function UserIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M15 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.696 19h10.608c1.175 0 2.08-.935 1.532-1.897C18.028 15.69 16.187 14 12 14s-6.028 1.689-6.836 3.103C4.616 18.065 5.521 19 6.696 19Z"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AppScreen({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={clsx('flex flex-col', className)} {...props}>
      <div className="flex justify-between px-4 pt-4">
        <MenuIcon className="h-6 w-6 flex-none" />
        <Logo />
        <UserIcon className="h-6 w-6 flex-none" />
      </div>
      {children}
    </div>
  )
}

AppScreen.Header = forwardRef<
  React.ElementRef<'div'>,
  { children: React.ReactNode }
>(function AppScreenHeader({ children }, ref) {
  return (
    <div ref={ref} className="mt-6 px-4 text-white">
      {children}
    </div>
  )
})

AppScreen.Title = forwardRef<
  React.ElementRef<'div'>,
  { children: React.ReactNode }
>(function AppScreenTitle({ children }, ref) {
  return (
    <div ref={ref} className="text-2xl text-white">
      {children}
    </div>
  )
})

AppScreen.Subtitle = forwardRef<
  React.ElementRef<'div'>,
  { children: React.ReactNode }
>(function AppScreenSubtitle({ children }, ref) {
  return (
    <div ref={ref} className="text-sm text-gray-500">
      {children}
    </div>
  )
})

AppScreen.Body = forwardRef<
  React.ElementRef<'div'>,
  { className?: string; children: React.ReactNode }
>(function AppScreenBody({ children, className }, ref) {
  return (
    <div
      ref={ref}
      className={clsx(
        'mt-6 flex-auto rounded-t-2xl bg-purple-900 p-4',
        className,
      )}
    >
      <div className="flex flex-col items-center">
        <Image
          src="/static/img/selfie.jpg"
          alt="Selfie"
          className="mb-4 h-32 w-32 rounded-full"
          width={500}
          height={500}
        />
        <small className="mb-4 text-white">
          📍 Institute of Technology and Leadership
        </small>
        <button className="rounded-md bg-blue-500 px-4 py-2 text-white">
          Check in
        </button>
      </div>
      {children}
    </div>
  )
})
