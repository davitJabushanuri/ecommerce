import { prisma } from '../../../../lib/prisma'

import { NextApiRequest, NextApiResponse } from 'next'

export default async function orders(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req

  if (req.method === 'POST') {
    try {
      const order = await prisma.order.create({
        data: {
          userId: body.userId,
          cartId: body.cartId,
        },
      })
      return res.status(200).json(order)
    } catch (e) {
      console.log(e)
    }
  }
}
