import Link from 'next/link'

import { AuthLayout } from '../components/AuthLayout'
import { Button } from '../components/Button'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function Login() {
  return (
    <AuthLayout
      title="Sign in to account"
      subtitle={
        <>
          Don’t have an account?{' '}
          <Link href="/register" className="text-cyan-600">
            Sign up
          </Link>{' '}
          for a free trial.
        </>
      }
    >
      <div className="flex items-center">
        <ConnectButton />
      </div>
    </AuthLayout>
  )
}
