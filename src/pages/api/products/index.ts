import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function products(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = Number(req.query.page) || 0

  if (req.method !== 'GET') {
    return res.status(405).json({
      message: 'only GET method is supported',
    })
  }

  try {
    const products = await prisma.product.findMany({
      skip: page * 5,
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
    })
    return res.status(200).json({ products, hasMore: page < 9 })
  } catch (e) {
    console.log(e)
  }
}
