import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

export default async function products(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req

  if (req.method === 'POST') {
    try {
      const review = await prisma.review.create({
        data: {
          userId: body.userId,
          productId: body.productId,
          rating: Number(body.rating),
          image: body.image,
          title: body.title,
          description: body.description,
          userName: body.userName,
          userEmail: body.userEmail,
          userImage: body.userImage,
        },
      })

      return res.status(200).json('Review created')
    } catch (e: any) {
      return res.status(500).json(e.message.split(':').pop().trim())
    }
  }

  if (req.method === 'PUT') {
    try {
      const review = await prisma.review.update({
        where: {
          id: body.id,
        },
        data: {
          rating: Number(body.rating),
          image: body.image,
          title: body.title,
          description: body.description,
        },
      })

      return res.status(200).json('Review updated')
    } catch (e: any) {
      return res.status(500).json(e.message.split(':').pop().trim())
    }
  }

  if (req.method === 'DELETE') {
    try {
      const review = await prisma.review.delete({
        where: {
          id: body.id,
        },
      })

      return res.status(200).json('Review deleted')
    } catch (e: any) {
      return res.status(500).json(e.message.split(':').pop().trim())
    }
  }
}
