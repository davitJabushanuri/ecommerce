import fetchUsers from '@components/helpers/fetchUsers'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const useUsers = () => {
  const queryClient = useQueryClient()

  return useQuery(['users'], () => fetchUsers(), {})
}

export default useUsers
