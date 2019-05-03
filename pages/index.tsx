import * as React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'

const IndexPage: React.FunctionComponent = () => {
  return (
    <Layout title="Home">
      <Hero />
    </Layout>
  )
}

export default IndexPage
