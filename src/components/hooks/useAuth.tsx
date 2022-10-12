import { useSession } from 'next-auth/react'

const useAuth = () => {
  const { data: session } = useSession()

  return session ? true : false
}

export default useAuth
