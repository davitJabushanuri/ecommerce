import { useSession } from 'next-auth/react'
import useUsers from './useUsers'

const useUser = () => {
  const { data: session } = useSession()
  const users = useUsers()
  const user =
    users.isSuccess &&
    users?.data.find((user: any) => user.email === session?.user?.email)
  return user
}

export default useUser
