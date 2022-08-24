import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function products(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = Number(req.query.page) || 1

  if (req.method !== 'GET') {
    res.status(405).json({
      message: 'only GET method is supported',
    })
  }

  try {
    const products = await await prisma.product.findMany({
      skip: page * 2,
      take: 2,
      orderBy: {
        createdAt: 'desc',
      },
    })
    res.status(200).json({ products, hasMore: page < products.length * page })
  } catch (e) {
    console.log(e)
  }
}
