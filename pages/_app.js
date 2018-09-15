import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'

import WithAuthentication from '../components/WithAuthentication'
import withReduxStore from '../lib/with-redux-store'

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <Container>
        <Head>
          <title>Summoners</title>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,700"
            rel="stylesheet"
          />
        </Head>
        
        <Provider store={reduxStore}>
          <WithAuthentication>
            <Component {...pageProps} />
          </WithAuthentication>
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
