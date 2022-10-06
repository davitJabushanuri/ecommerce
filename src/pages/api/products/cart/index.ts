import { prisma } from '../../../../lib/prisma'

import { NextApiRequest, NextApiResponse } from 'next'

export default async function cart(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

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
