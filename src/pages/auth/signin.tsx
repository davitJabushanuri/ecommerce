/* eslint-disable @next/next/no-img-element */
import styles from './signin.module.scss'

import { NextPage } from 'next'
import React from 'react'

import { getProviders, signIn, useSession, getSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'

const SignIn: NextPage = ({ providers }: any) => {
  return (
    <div className={styles.container}>
      <main>
        <div className={styles.loginForm}>
          <h1>Welcome back</h1>
          <p>Please enter your details</p>

          <form>
            <div className={styles.inputContainer}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
              />
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="********"
              />
            </div>
            <div className={styles.forgotPassword}>
              <p>Forgot password</p>
            </div>
            <button className={styles.signin}>Sign in</button>
          </form>

          {Object.values(providers).map((provider: any) => (
            <div key={provider.name}>
              <button
                className={styles.githubLogin}
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}

          <div className={styles.signup}>
            <p>
              <span>Don&apos;t have an account?</span>
              <Link href={`/auth/signup`}>
                <a>Sign up for free</a>
              </Link>
            </p>
          </div>
        </div>
        <div className={styles.image}>
          <img
            src="https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="login-photo"
          />
        </div>
      </main>
    </div>
  )
}

export default SignIn

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
