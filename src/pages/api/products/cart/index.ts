import { prisma } from '../../../../lib/prisma'

import { NextApiRequest, NextApiResponse } from 'next'

export default async function cart(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req

  if (req.method === 'POST') {
    try {
      const cart = await prisma.cart.create({
        data: {
          userEmail: body.userEmail,
          productId: body.productId,
          quantity: body.quantity,
        },
      })
      res.status(200).json({ message: 'Product added to cart' })
    } catch (e) {
      console.log(e)
    }
  }

  if (req.method === 'DELETE') {
    try {
      const cart = await prisma.cart.delete({
        where: {
          id: body.id,
        },
      })
      res.status(200).json({ message: 'product removed from cart' })
    } catch (error) {
      console.log(error)
    }
  }
}
