import App, { Container } from 'next/app';
import React from 'react';
import withAuthentication from '../components/withAuthentication';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default withAuthentication(MyApp);