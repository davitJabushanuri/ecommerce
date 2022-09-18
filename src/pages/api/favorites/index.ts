import { prisma } from '../../../lib/prisma'

import { NextApiRequest, NextApiResponse } from 'next'

export default async function favorites(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const favorites = await prisma.favorite.findMany()
      res.status(200).json(favorites)
    } catch (e) {
      console.log(e)
    }
  }

  if (req.method === 'POST') {
    const { productId, userId } = req.body
    try {
      const favorite = await prisma.favorite.create({
        data: {
          productId,
          userId,
        },
      })
      res.status(200).json(favorite)
    } catch (e) {
      console.log(e)
    }
  }
}
