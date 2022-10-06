import fetchUsers from '@components/helpers/fetchUsers'
import { useQuery } from '@tanstack/react-query'

const useUsers = () => {
  return useQuery(['users'], () => fetchUsers())
}

export default useUsers
