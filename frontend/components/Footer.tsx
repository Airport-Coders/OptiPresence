import { Container } from './../components/Container'
import { Logomark } from './../components/Logo'
import { NavLinks } from './../components/NavLinks'

function QrCodeBorder(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" {...props}>
      <path
        d="M1 17V9a8 8 0 0 1 8-8h8M95 17V9a8 8 0 0 0-8-8h-8M1 79v8a8 8 0 0 0 8 8h8M95 79v8a8 8 0 0 1-8 8h-8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <Container>
        <div className="flex flex-col items-center justify-between gap-y-12 pb-6 pt-16 lg:flex-row lg:items-center lg:py-16">
          <div className="flex items-center text-gray-900">
            <Logomark />
            <div className="ml-4">
              <p className="text-base font-semibold">OptiPresence</p>
              <p className="mt-1 text-sm">
                Decentralized Check-In and Attendance Verification System 🛡️
              </p>
            </div>
          </div>
          <nav className="mt-11 flex gap-12">
            <NavLinks />
          </nav>
        </div>
        <div className="flex flex-col items-center border-t border-gray-200 pb-12 pt-8 md:flex-row-reverse md:justify-center md:pt-6">
          <p className="mt-6 text-sm text-gray-500 md:mt-0">
            &copy; Copyright {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
