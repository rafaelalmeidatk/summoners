import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../static/css/style.css'

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

          <script src="https://www.reactriot.com/entries/220-batatas-da-terra/vote.js" type="text/javascript"></script> 
        </body>
      </html>
    )
  }
}
