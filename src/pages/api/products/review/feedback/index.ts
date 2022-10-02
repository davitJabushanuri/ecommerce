import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../../lib/prisma'

export default async function products(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req

  if (req.method === 'POST') {
    try {
      const review = await prisma.helpful.create({
        data: {
          userEmail: body.userEmail,
          reviewId: body.reviewId,
        },
      })
      return res.status(200).json('You found this review helpful')
    } catch (e: any) {
      return res.status(500).json(e.message.split(':').pop().trim())
    }
  }
}
