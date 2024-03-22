'use client'

import Link from 'next/link'
import { Popover } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'

import { useAccount } from 'wagmi'
import { Container } from './../components/Container'
import { Logo } from './../components/Logo'
import { NavLinks } from './../components/NavLinks'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useReadContract } from 'wagmi'
import { useContracts } from '../providers/contracts'

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 6h14M5 18h14M5 12h14"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronUpIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M17 14l-5-5-5 5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MobileNavLink(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof Popover.Button<typeof Link>>,
    'as' | 'className'
  >,
) {
  return (
    <Popover.Button
      as={Link}
      className="block text-base leading-7 tracking-tight text-gray-700"
      {...props}
    />
  )
}

export function Header() {
  const { address } = useAccount()
  const { data: contractsData } = useContracts()
  const UserRegistry = contractsData?.UserRegistry

  const { data: userInfoData, isLoading: isReadContractPending } =
    useReadContract({
      address: UserRegistry?.address,
      abi: UserRegistry?.abi,
      functionName: 'getUserInfo',
      args: [address as string],
    })

  return (
    <header>
      <nav>
        <Container className="relative z-50 flex justify-between py-8">
          <div className="relative z-10 flex items-center gap-16">
            <Link href="/" aria-label="Home">
              <Logo />
            </Link>
            <div className="hidden lg:flex lg:gap-10">
              <NavLinks />
            </div>
          </div>
          <div className="flex items-center gap-6">
            {isReadContractPending && address ? (
              <div className="flex items-center">
                <Link
                  className="rounded-lg bg-purple-700 px-6 py-1 text-lg font-bold text-white hover:bg-purple-800"
                  href="/register"
                >
                  Register
                </Link>
              </div>
            ) : (userInfoData as any)?.name ? (
              <div className="flex flex-col md:flex-row">
                <span className="text-lg font-semibold text-gray-900 md:text-sm">
                  Welcome back,{' '}
                  <span className="text-xl font-bold text-purple-700 md:text-lg">
                    {(userInfoData as any).name}
                  </span>
                </span>
              </div>
            ) : (
              address && (
                <div className="flex items-center">
                  <Link
                    className="rounded-lg bg-purple-700 px-6 py-1 text-lg font-bold text-white hover:bg-purple-800"
                    href="/register"
                  >
                    Register
                  </Link>
                </div>
              )
            )}
            <ConnectButton />
            <Popover className="lg:hidden">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`z-10 -m-2 inline-flex items-center rounded-lg p-2 outline-none ${
                      open
                        ? 'stroke-gray-600 hover:bg-gray-200/50'
                        : 'stroke-gray-900 hover:bg-gray-200/50 active:stroke-gray-900'
                    }`}
                    aria-label="Toggle site navigation"
                  >
                    {open ? (
                      <ChevronUpIcon className="h-6 w-6" />
                    ) : (
                      <MenuIcon className="h-6 w-6" />
                    )}
                  </Popover.Button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <Popover.Overlay
                        static
                        as={motion.div}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-gray-300/60 backdrop-blur"
                      >
                        <Popover.Panel
                          static
                          as={motion.div}
                          initial={{ opacity: 0, y: -32 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            y: -32,
                            transition: { duration: 0.2 },
                          }}
                          className="shadow-2 xl absolute inset-x-0 top-0 z-40 origin-top rounded-b-2xl bg-gray-50 px-6 pb-6
						  pt-32 shadow-gray-900/20"
                        >
                          <div className="space-y-4">
                            <MobileNavLink href="/#features">
                              Features
                            </MobileNavLink>
                            <MobileNavLink href="/#use-cases">
                              Use Cases
                            </MobileNavLink>
                            <MobileNavLink href="/#faqs">FAQs</MobileNavLink>
                          </div>
                        </Popover.Panel>
                      </Popover.Overlay>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>
          </div>
        </Container>
      </nav>
    </header>
  )
}
