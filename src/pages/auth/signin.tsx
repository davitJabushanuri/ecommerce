import { NextPage } from 'next'
import React from 'react'

import { getProviders, signIn, useSession, getSession } from 'next-auth/react'

const SignIn: NextPage = ({ providers }: any) => {
  return (
    <main>
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </main>
  )
}

export default SignIn

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
