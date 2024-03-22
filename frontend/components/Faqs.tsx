import { Container } from './../components/Container'

const faqs = [
  [
    {
      question: 'How does OptiPresence ensure attendance authenticity?',
      answer:
        'OptiPresence employs secure biometric authentication and real-time location validation. This ensures that only the registered individual can check in at the correct location, effectively eliminating buddy punching and unauthorized access.',
    },
    {
      question:
        'How does blockchain technology enhance the security of OptiPresence?',
      answer:
        'By utilizing the Optimism blockchain network, OptiPresence provides an immutable, transparent, and secure ledger for check-in data. This prevents tampering and ensures the integrity and accuracy of attendance records.',
    },
    {
      question: 'Can OptiPresence integrate with existing systems?',
      answer:
        'Yes, OptiPresence is designed to be integration-friendly. It can seamlessly connect with HR (payroll) systems, student information systems, and more, facilitating real-time updates and reducing administrative overhead.',
    },
  ],
  [
    {
      question:
        'Is OptiPresence customizable for different organizational needs?',
      answer:
        'Absolutely. OptiPresence allows institutions to set specific check-in parameters, adapting to various contractual or educational requirements, and supporting diverse working arrangements and academic schedules.',
    },
    {
      question: 'How can OptiPresence simplify the auditing process?',
      answer:
        'OptiPresence generates comprehensive and irrefutable reports suitable for both internal and external audits. This enhances regulatory compliance and simplifies the auditing process by leveraging the immutable nature of blockchain records.',
    },
    {
      question: 'What additional verification needs can OptiPresence fulfill?',
      answer:
        'Beyond just check-ins, OptiPresence can be adapted for verifying academic achievements, professional credentials, event participation, and health records, offering a versatile platform for various verification requirements.',
    },
  ],
  [
    {
      question: 'Who can benefit from using OptiPresence?',
      answer:
        'OptiPresence is suitable for academic institutions, corporate environments, healthcare facilities, events and conferences, and government and public services. It streamlines attendance tracking and enhances accountability and transparency.',
    },
    {
      question: 'How does OptiPresence protect privacy and data security?',
      answer:
        'Using permissioned blockchain technology, OptiPresence ensures that sensitive data is securely stored and shared only with authorized parties. It adheres to strict data protection regulations and offers robust security features.',
    },
    {
      question: 'OptiPresence is simple to use?',
      answer:
        'Yes, OptiPresence is designed to be user-friendly and intuitive. It requires minimal training and can be easily adopted by employees, students, and other users. The platform is accessible via web and mobile applications.',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="border-t border-gray-200 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            Frequently asked questions
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            If you have anything else you want to ask,{' '}
            <a
              href="mailto:info@example.com"
              className="text-gray-900 underline"
            >
              reach out to us
            </a>
            .
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-gray-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
