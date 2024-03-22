'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { CircleBackground } from '../components/CircleBackground'
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
      'Incorporates GPS and geofencing technologies to validate the exact location of check-in, guaranteeing that individuals are present at the designated site, whether it’s a workplace, classroom, or a remote location.',
    icon: GPSIcon,
  },
  {
    name: 'Blockchain-Backed Record Keeping',
    description:
      'Employs the Optimism blockchain network to store check-in data, offering an immutable, transparent, and secure ledger that prevents tampering and ensures data integrity.',
    icon: DeviceTouchIcon,
  },
]

function GPSIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <Image src={gpsIcon} alt="GPS icon" {...props} width={32} height={32} />
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

function DeviceNotificationIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle cx={16} cy={16} r={16} fill="#fff" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 0a4 4 0 00-4 4v24a4 4 0 004 4h14a4 4 0 004-4V4a4 4 0 00-4-4H9zm0 2a2 2 0 00-2 2v24a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9z"
        fill="#fff"
      />
      <path
        d="M9 8a2 2 0 012-2h10a2 2 0 012 2v2a2 2 0 01-2 2H11a2 2 0 01-2-2V8z"
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
  let [activeIndex, setActiveIndex] = useState(0)
  let slideContainerRef = useRef<React.ElementRef<'div'>>(null)
  let slideRefs = useRef<Array<React.ElementRef<'div'>>>([])

  useEffect(() => {
    let observer = new window.IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting && entry.target instanceof HTMLDivElement) {
            setActiveIndex(slideRefs.current.indexOf(entry.target))
            break
          }
        }
      },
      {
        root: slideContainerRef.current,
        threshold: 0.6,
      },
    )

    for (let slide of slideRefs.current) {
      if (slide) {
        observer.observe(slide)
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [slideContainerRef, slideRefs])

  return (
    <>
      <div
        ref={slideContainerRef}
        className="-mb-4 flex snap-x snap-mandatory -space-x-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 [scrollbar-width:none] sm:-space-x-6 [&::-webkit-scrollbar]:hidden"
      >
        {features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            ref={(ref) => ref && (slideRefs.current[featureIndex] = ref)}
            className="w-full flex-none snap-center px-2 sm:px-4"
          >
            <div className="relative transform overflow-hidden rounded-2xl bg-gray-800 px-5 py-6">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <CircleBackground
                  color="#13B5C8"
                  className={featureIndex % 2 === 1 ? 'rotate-180' : undefined}
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gray-800/95 p-6 backdrop-blur sm:p-10">
                <feature.icon className="h-8 w-8" />
                <h3 className="mt-6 text-sm font-semibold text-white sm:text-lg">
                  {feature.name}
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-3">
        {features.map((_, featureIndex) => (
          <button
            type="button"
            key={featureIndex}
            className={clsx(
              'relative h-0.5 w-4 rounded-full',
              featureIndex === activeIndex ? 'bg-gray-300' : 'bg-gray-500',
            )}
            aria-label={`Go to slide ${featureIndex + 1}`}
            onClick={() => {
              slideRefs.current[featureIndex].scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
              })
            }}
          >
            <span className="absolute -inset-x-1.5 -inset-y-3" />
          </button>
        ))}
      </div>
    </>
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
