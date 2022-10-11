import { prisma } from '../../../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function products(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req

  if (req.method === 'POST') {
    try {
      const products = await prisma.answer.create({
        data: {
          message: body.message,
          questionId: body.questionId,
          userName: body.userName,
          userId: body.userId,
        },
      })
      return res.status(200).json({ message: 'Answer created successfully' })
    } catch (e: any) {
      console.log(e)
      return res.status(500).json({ message: e.message })
    }
  }
}
