import type { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { Hero } from '../components/Hero'
import { PrimaryFeatures } from '../components/PrimaryFeatures'
import { SecondaryFeatures } from '../components/SecondaryFeatures'
import { CallToAction } from '../components/CallToAction'
import { UseCases } from '../components/UseCases'
import { Faqs } from '../components/Faqs'

const Home: NextPage = () => {
  return (
    <Layout>
      <Hero />
      <PrimaryFeatures />
      <SecondaryFeatures />
      <CallToAction />
      <UseCases />
      <Faqs />
    </Layout>
  )
}

export default Home
