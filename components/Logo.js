import React from 'react'
import Link from 'next/link'

export default () => (
  <div>
    <Link href="/" prefetch>
      <a className="link">Summoners</a>
    </Link>
    <style jsx>{`
      div {
        margin-bottom: 48px;
        font-family: 'Montserrat', 'Roboto', 'Helvetica', 'Arial', sans-serif;
        font-size: 2.7em;
        font-weight: bold;
      }
      .link {
        color: #fff;
        text-decoration: none;
      }
    `}</style>
  </div>
)
