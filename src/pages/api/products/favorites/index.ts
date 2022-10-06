import { prisma } from '../../../../lib/prisma'

import { NextApiRequest, NextApiResponse } from 'next'

export default async function favorites(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req

  if (req.method === 'GET') {
    try {
      const favorites = await prisma.favorite.findMany({
        include: {
          product: true,
        },
      })
      res.status(200).json(favorites)
    } catch (e) {
      console.log(e)
    }
  }

  if (req.method === 'POST') {
    try {
      const favorite = await prisma.favorite.create({
        data: {
          userId: body.userId,
          productId: body.productId,
        },
      })
      res.status(200).json({ message: 'Product added to favorites' })
    } catch (e) {
      console.log(e)
    }
  }

  if (req.method === 'DELETE') {
    try {
      const favorite = await prisma.favorite.deleteMany({
        where: {
          productId: body.productId,
        },
      })
      res.status(200).json({ message: 'Product removed from favorites' })
    } catch (e) {
      console.log(e)
    }
  }
}
