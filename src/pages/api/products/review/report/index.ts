import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../../lib/prisma'

export default async function products(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req

  if (req.method === 'POST') {
    try {
      const review = await prisma.report.create({
        data: {
          reviewId: body.reviewId,
          message: body.message,
          description: body.description,
        },
      })
      return res.status(200).json('You reported this review')
    } catch (e: any) {
      return res.status(500).json(e.message.split(':').pop().trim())
    }
  }
}
