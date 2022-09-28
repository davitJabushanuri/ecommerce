import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

export default async function products(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req

  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Method not allowed',
    })
  }
  try {
    const review = await prisma.review.create({
      data: {
        userId: body.userId,
        productId: body.productId,
        rating: Number(body.rating),
        image: body.image,
        title: body.title,
        description: body.description,
      },
    })

    return res.status(200).json('Review created')
  } catch (e: any) {
    return res.status(500).json(e.message.split(':').pop().trim())
  }
}
