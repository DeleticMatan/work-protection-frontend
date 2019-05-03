import React from 'react'
import PropTypes from 'prop-types'
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'
import styled, { ServerStyleSheet } from 'styled-components'
import { Typography } from '@material-ui/core'
import { deepOrange } from '@material-ui/core/colors'

const Html = styled.html`
  &::-webkit-scrollbar {
    width: 1em;
  }
  &::-webkit-scrollbar-track {
    background: #1f2529;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #666;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #e64a19;
  }
`

const Body = styled.body`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

const Footer = styled.footer`
  background-color: ${deepOrange[700]};
  color: #fff;
  text-align: center;
  padding: 15px 0;
  font-family: 'Montserrat', sans-serif;
`

type Props = {
  pageContext: any
}

class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: any) {
    let pageContext: any
    const page = ctx.renderPage((Component: any) => {
      const WrappedComponent = (props: any) => {
        pageContext = props.pageContext
        return <Component {...props} />
      }

      WrappedComponent.propTypes = {
        pageContext: PropTypes.object.isRequired
      }

      return WrappedComponent
    })

    let css
    if (pageContext) {
      css = pageContext.sheetsRegistry.toString()
    }
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        ...page,
        pageContext,
        styles: (
          <React.Fragment>
            <style
              id="jss-server-side"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: css }}
            />
            {initialProps.styles}
            {sheet.getStyleElement()}
            {flush() || null}
          </React.Fragment>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    const { pageContext } = this.props

    return (
      <Html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          {/* PWA primary color */}
          <meta
            name="theme-color"
            content={
              pageContext ? pageContext.theme.palette.primary.main : null
            }
          />
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:400,500"
            rel="stylesheet"
          />
          <style>
            {`
            #__next { flex: 1 }
          `}
          </style>
        </Head>
        <Body>
          <Main />
          <Footer>
            <Typography variant="caption">
              © 2019 ZNR - Sva prava zadržana
            </Typography>
          </Footer>
          <NextScript />
        </Body>
      </Html>
    )
  }
}

export default MyDocument
