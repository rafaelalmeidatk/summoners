import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <head>
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700"
            rel="stylesheet"
          />
        </head>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
        </Head>

        <body>
          <Main />
          <NextScript />

          <script
            src="https://www.reactriot.com/entries/220-batatas-da-terra/vote.js"
            type="text/javascript"
          />
        </body>
      </html>
    )
  }
}
