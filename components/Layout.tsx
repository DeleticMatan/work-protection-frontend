import * as React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import Navigation from '../components/Navigation'

const Main = styled.div`
  margin: calc(50px + 64px) 50px 50px 50px;

  @media (max-width: 768px) {
    margin: calc(25px + 64px) 25px 50px 25px;
  }

  @media (max-width: 600px) {
    margin: calc(10px + 56px) 10px 50px 10px;
  }
`

type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'Page'
}) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />
    </Head>

    <header>
      <Navigation />
    </header>
    <Main>{children}</Main>
  </>
)

export default Layout
