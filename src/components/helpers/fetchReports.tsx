import axios from 'axios'

const fetchReports = async () => {
  const response = await axios.get('/api/products/review/report')
  return response.data
}

export default fetchReports
