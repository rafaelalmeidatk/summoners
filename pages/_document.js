import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return <html>
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.8.2/antd.min.css" />
                <link rel="stylesheet" href="/_next/static/style.css" />
                <link rel="stylesheet" href="./static/css/font-use.css" />
                <link href="https://fonts.googleapis.com/css?family=Rubik:300,400,500,700" rel="stylesheet"></link>
            </head>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
            </Head>

            <body>
                <Main />
                <NextScript />
            </body>
        </html>
    }
}