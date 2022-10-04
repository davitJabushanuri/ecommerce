import { useQuery } from '@tanstack/react-query'
import SecondaryHeader from 'components/SecondaryHeader/SecondaryHeader'
import { useSession } from 'next-auth/react'

const getUser = async (userEmail: any) => {
  const res = await fetch('/api/users')
  const data = await res.json()
  const user = data.filter((user: any) => user.email === userEmail)
  return user
}

const User = () => {
  const { data: session } = useSession()
  console.log(session)

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery(['user'], () => getUser(session?.user.email))
  console.log(user)

  return (
    <div>
      <main>
        <SecondaryHeader header="My Profile" />
      </main>
    </div>
  )
}

export default User
