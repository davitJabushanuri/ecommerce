import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function products(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = Number(req.query.page) || 0

  if (req.method !== 'GET') {
    res.status(405).json({
      message: 'only GET method is supported',
    })
  }

  try {
    const products = await prisma.product.findMany({
      skip: page * 10,
      take: 10,
      where: {
        isOnSale: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    res.status(200).json({ products, hasMore: page < products.length * page })
  } catch (e) {
    console.log(e)
  }
}
