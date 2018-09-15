import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { auth } from '../firebase'

export default () => (
  <div className="navbar">
    <div className="logo" />

    <Link href="/login">
      <a className="login-link">Login</a>
    </Link>

    {/* This is temporary */}
    <a href="#" className="login-link" onClick={() => auth.signOut().then(() => Router.push('/'))}>
      Sair
    </a>

    <style jsx>{`
      .navbar {
        display: flex;
        justify-content: flex-end;
        position: relative;
        width: 100%;
        height: 72px;
        background-color: rgba(255, 255, 255, 0.07);
        border-bottom: 1px solid rgba(255, 255, 255, 0.7);
      }
      .logo {
        width: 70px;
        height: 70px;
        background: red;
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);
      }
      .login-link {
        padding-right: 0.5rem;
        color: #fff !important;
        font-weight: bold;
        text-decoration: none;
      }
    `}</style>
  </div>
)
