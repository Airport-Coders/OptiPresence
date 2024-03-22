'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { useInView } from 'framer-motion'

import { Container } from './../components/Container'

interface UseCase {
  title: string
  body: string
}

const useCases: Array<UseCase> = [
  {
    title: 'Enhanced Academic Integrity',
    body: 'OptiPresence revolutionizes academic attendance, ensuring only registered students can mark their presence using secure biometric authentication. This has significantly reduced cases of proxy attendance and improved participation in my lectures.',
  },
  {
    title: 'Streamlined Workplace Attendance',
    body: 'Implementing OptiPresence in our office has transformed timekeeping. The integration with our HR systems has streamlined payroll processes, and real-time location validation ensures accurate recording of work hours.',
  },
  {
    title: 'Secure Patient Verification',
    body: 'In our healthcare facility, OptiPresence provides a secure way to confirm patient appointments and treatments. This has improved patient management and ensured adherence to medical schedules, enhancing overall care quality.',
  },
  {
    title: 'Efficient Event Management',
    body: 'Using OptiPresence at our events has led to faster check-ins and enhanced security. The facial recognition and blockchain technology ensure that only registered attendees can access the venue, providing a seamless experience for everyone.',
  },
  {
    title: 'Transparent Government Services',
    body: 'OptiPresence has enabled us to monitor public service attendance more efficiently. Its blockchain-based system offers transparency and accountability, improving trust in our services and ensuring compliance with regulations.',
  },
  {
    title: 'Innovative Remote Working Solutions',
    body: 'OptiPresence has been pivotal for our remote work policies. By validating employee locations and ensuring authentication through facial recognition, we maintain high productivity levels and accurate time tracking, regardless of where our employees are working from.',
  },
  {
    title: 'Revolutionizing Conference Participation',
    body: 'The introduction of OptiPresence at our annual conference allowed for a new level of interaction and security. Attendees could seamlessly check in through facial recognition, making the event not only more secure but also more engaging.',
  },
  {
    title: 'Guaranteed Academic Record Integrity',
    body: 'With OptiPresence, we have a dependable system for validating student participation and achievements. This has greatly assisted in maintaining the integrity of our academic records and streamlining the accreditation process.',
  },
]

function UseCase({
  title,
  body,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'figure'>, keyof UseCase> & UseCase) {
  let animationDelay = useMemo(() => {
    let possibleAnimationDelays = ['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s']
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ]
  }, [])

  return (
    <figure
      className={clsx(
        'animate-fade-in rounded-3xl bg-white p-6 opacity-0 shadow-md shadow-gray-900/5',
        className,
      )}
      style={{ animationDelay }}
      {...props}
    >
      <blockquote className="text-gray-900">
        <p className="mt-4 text-lg font-semibold leading-6 before:content-['“'] after:content-['”']">
          {title}
        </p>
        <p className="mt-3 text-base leading-7">{body}</p>
      </blockquote>
    </figure>
  )
}

function splitArray<T>(array: Array<T>, numParts: number) {
  let result: Array<Array<T>> = []
  for (let i = 0; i < array.length; i++) {
    let index = i % numParts
    if (!result[index]) {
      result[index] = []
    }
    result[index].push(array[i])
  }
  return result
}

function UseCaseColumn({
  useCases,
  className,
  useCaseClassName,
  msPerPixel = 0,
}: {
  useCases: Array<UseCase>
  className?: string
  useCaseClassName?: (useCaseIndex: number) => string
  msPerPixel?: number
}) {
  let columnRef = useRef<React.ElementRef<'div'>>(null)
  let [columnHeight, setColumnHeight] = useState(0)
  let duration = `${columnHeight * msPerPixel}ms`

  useEffect(() => {
    if (!columnRef.current) {
      return
    }

    let resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0)
    })

    resizeObserver.observe(columnRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div
      ref={columnRef}
      className={clsx('animate-marquee space-y-8 py-4', className)}
      style={{ '--marquee-duration': duration } as React.CSSProperties}
    >
      {useCases.concat(useCases).map((useCase, useCaseIndex) => (
        <UseCase
          key={useCaseIndex}
          aria-hidden={useCaseIndex >= useCases.length}
          className={(useCaseClassName as any)?.(
            useCaseIndex % useCases.length,
          )}
          {...useCase}
        />
      ))}
    </div>
  )
}

function UseCasesGrid() {
  let containerRef = useRef<React.ElementRef<'div'>>(null)
  let isInView = useInView(containerRef, { once: true, amount: 0.4 })
  let columns = splitArray(useCases, 3)
  let column1 = columns[0]
  let column2 = columns[1]
  let column3 = splitArray(columns[2], 2)

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView && (
        <>
          <UseCaseColumn
            useCases={[...column1, ...column3.flat(), ...column2]}
            useCaseClassName={(useCaseIndex) =>
              clsx(
                useCaseIndex >= column1.length + column3[0].length &&
                  'md:hidden',
                useCaseIndex >= column1.length && 'lg:hidden',
              )
            }
            msPerPixel={10}
          />
          <UseCaseColumn
            useCases={[...column2, ...column3[1]]}
            className="hidden md:block"
            useCaseClassName={(useCaseIndex) =>
              useCaseIndex >= column2.length ? 'lg:hidden' : ''
            }
            msPerPixel={15}
          />
          <UseCaseColumn
            useCases={column3.flat()}
            className="hidden lg:block"
            msPerPixel={10}
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50" />
    </div>
  )
}

export function UseCases() {
  return (
    <section
      id="use-cases"
      aria-labelledby="use-cases-title"
      className="pb-16 pt-20 sm:pb-24 sm:pt-32"
    >
      <Container>
        <h2
          id="use-cases-title"
          className="text-3xl font-medium tracking-tight text-gray-900 sm:text-center"
        >
          Use Cases
        </h2>
        <p className="mt-2 text-lg text-gray-600 sm:text-center">
          Discover how <b>OptiPresence</b> can transform various industries and
          applications.
        </p>
        <UseCasesGrid />
      </Container>
    </section>
  )
}
