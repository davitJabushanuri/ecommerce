import { prisma } from '../../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function products(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req

  if (req.method === 'POST') {
    try {
      const products = await prisma.question.create({
        data: {
          message: body.message,
          userName: body.userName,
          userId: body.userId,
          productId: body.productId,
        },
      })
      return res.status(200).json({ message: 'Question created successfully' })
    } catch (e: any) {
      console.log(e)
      return res.status(500).json({ message: e.message })
    }
  }
}
