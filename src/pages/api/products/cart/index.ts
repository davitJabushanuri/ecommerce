import { prisma } from '../../../../lib/prisma'

import { NextApiRequest, NextApiResponse } from 'next'

export default async function cart(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req

  if (req.method === 'POST') {
    try {
      const cart = await prisma.cart.create({
        data: {
          userId: body.userId,
          productId: body.productId,
          quantity: body.quantity,
        },
      })
      res.status(200).json({ message: 'Product added to cart' })
    } catch (e) {
      console.log(e)
    }
  }

  if (req.method === 'PUT') {
    try {
      const product = await prisma.cart.update({
        where: { id: body.id },
        data: { quantity: body.quantity },
      })
      return res.status(200).json({ message: 'Product updated', product })
    } catch (e: any) {
      console.log(e)
      return res.status(500).json({ message: e.message })
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
