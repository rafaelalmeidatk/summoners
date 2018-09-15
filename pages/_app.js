import App, { Container } from 'next/app'
import React from 'react'
import Head from 'next/head'
import withAuthentication from '../components/withAuthentication'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Head>
          <title>Summoners</title>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,700"
            rel="stylesheet"
          />
        </Head>
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default withAuthentication(MyApp)
