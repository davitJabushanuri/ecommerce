import { NextApiRequest, NextApiResponse } from 'next'

export default function products(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: 'Hello World' })
}
