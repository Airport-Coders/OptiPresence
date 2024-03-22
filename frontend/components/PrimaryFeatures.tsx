'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Container } from '../components/Container'
import Image from 'next/image'
import gpsIcon from '../static/img/gps.svg'

const features = [
  {
    name: 'Secure Biometric Authentication',
    description:
      'Utilizing advanced facial recognition technology, OptiPresence ensures that only registered individuals can check in, effectively eliminating issues like "buddy punching" and unauthorized access.',
    icon: DeviceUserIcon,
  },
  {
    name: 'Real-Time Location Validation',
    description:
      'Incorporates GPS and geofencing technologies to validate the exact location of check-in, guaranteeing that individuals are present at the designated location.',
    icon: GPSIcon,
  },
  {
    name: 'Blockchain-Backed Record Keeping',
    description:
      'Employs the Optimism blockchain network to store check-in data, offering an immutable, transparent, and secure ledger that prevents tampering and ensures data integrity.',
    icon: DeviceTouchIcon,
  },
]

function GPSIcon(props: React.ComponentPropsWithoutRef<'img'>) {
  return (
    <Image src={gpsIcon} alt="GPS icon" {...props} width={64} height={64} />
  )
}

function DeviceUserIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle cx={16} cy={16} r={16} fill="#fff" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 23a3 3 0 100-6 3 3 0 000 6zm-1 2a4 4 0 00-4 4v1a2 2 0 002 2h6a2 2 0 002-2v-1a4 4 0 00-4-4h-2z"
        fill="#fff"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 4a4 4 0 014-4h14a4 4 0 014 4v24a4.002 4.002 0 01-3.01 3.877c-.535.136-.99-.325-.99-.877s.474-.98.959-1.244A2 2 0 0025 28V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9a2 2 0 00-2 2v24a2 2 0 001.041 1.756C8.525 30.02 9 30.448 9 31s-.455 1.013-.99.877A4.002 4.002 0 015 28V4z"
        fill="#fff"
      />
    </svg>
  )
}

function DeviceTouchIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  let id = useId()

  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient
          id={`${id}-gradient`}
          x1={14}
          y1={14.5}
          x2={7}
          y2={17}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#D4D4D4" stopOpacity={0} />
        </linearGradient>
      </defs>
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 4a4 4 0 014-4h14a4 4 0 014 4v13h-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9a2 2 0 00-2 2v24a2 2 0 002 2h4v2H9a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <path
        d="M7 22c0-4.694 3.5-8 8-8"
        stroke={`url(#${id}-gradient)`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 20l.217-5.513a1.431 1.431 0 00-2.85-.226L17.5 21.5l-1.51-1.51a2.107 2.107 0 00-2.98 0 .024.024 0 00-.005.024l3.083 9.25A4 4 0 0019.883 32H25a4 4 0 004-4v-5a3 3 0 00-3-3h-5z"
        fill="#fff"
      />
    </svg>
  )
}

function FeaturesDesktop() {
  return (
    <Tab.Group
      as="div"
      className="grid grid-cols-8 items-center justify-center gap-4"
    >
      <Tab.List className="relative z-10 col-span-6 space-y-6">
        {features.map((feature, index) => (
          <Tab
            key={feature.name}
            as="div"
            className="relative rounded-2xl bg-purple-500 transition-colors"
          >
            <motion.div
              layoutId={`activeBackground-${feature.name}`}
              className="absolute inset-0 bg-purple-600 transition-all"
              initial={{ borderRadius: 16 }}
              animate={{ borderRadius: 16 }}
              exit={{ borderRadius: 16 }}
            />

            <div className="relative z-10 p-8">
              <feature.icon className="h-8 w-8" />
              <h3 className="mt-6 text-lg font-semibold text-white">
                {feature.name}
              </h3>
              <p className="text-sm text-gray-300">{feature.description}</p>
            </div>
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  )
}

function FeaturesMobile() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <Tab.Group as="div" className="space-y-4">
      <Tab.List className="flex space-x-1 rounded-xl bg-purple-500 p-1">
        {features.map((feature, index) => (
          <Tab
            key={feature.name}
            className={({ selected }) =>
              clsx(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-purple-700',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow'
                  : 'text-purple-100 hover:bg-white/[0.12] hover:text-white',
              )
            }
          >
            {feature.name}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-2">
        {features.map((feature, index) => (
          <Tab.Panel
            key={feature.name}
            className={clsx(
              'rounded-xl p-3',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2',
            )}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <feature.icon className="h-6 w-6" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-white">
                  {feature.name}
                </h3>
                <p className="mt-1 text-sm text-gray-300">
                  {feature.description}
                </p>
              </div>
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

export function PrimaryFeatures() {
  return (
    <section
      id="features"
      aria-label="Features for secure and efficient check-ins"
      className="flex flex-col items-center bg-purple-900 py-20 sm:py-32 md:flex-row"
    >
      <Container className="mb-16 md:mb-0 md:mr-8 md:w-1/2">
        <div className="text-center lg:text-left">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Discover the future of presence verification with{' '}
            <span className="text-pink-300">OptiPresence</span>.
          </h2>
          <p className="mt-4 text-xl text-gray-300 sm:text-2xl">
            Why deal with outdated check-in systems when{' '}
            <span className="font-semibold text-white">OptiPresence</span>{' '}
            offers you the ultimate solution? Embrace the innovation that
            combines blockchain, facial recognition, and geolocation technology.
            With <span className="font-semibold text-white">OptiPresence</span>,
            your presence is all you need to check in, streamlining the process
            for educational institutions, corporate environments, healthcare
            facilities, and more.
          </p>
        </div>
      </Container>
      <div className="md:w-1/2">
        <div className="hidden md:block">
          <FeaturesDesktop />
        </div>
        <div className="md:hidden">
          <FeaturesMobile />
        </div>
      </div>
    </section>
  )
}
