import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function products(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      message: 'only GET method is supported',
    })
  }

  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return res.status(200).json({ products })
  } catch (e: any) {
    console.log(e)
    return res.status(500).json({ message: e.message })
  }
}
