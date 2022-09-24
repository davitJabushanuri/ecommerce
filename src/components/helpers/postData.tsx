import { IPostProduct } from '@ts/interfaces/types'

const postData = async (data: IPostProduct) => {
  await fetch('/api/products/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export default postData
