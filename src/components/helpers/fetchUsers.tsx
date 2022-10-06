const fetchUsers = async () => {
  const res = await fetch('/api/users')
  const users = await res.json()
  return users
}

export default fetchUsers
