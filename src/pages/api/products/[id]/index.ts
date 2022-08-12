import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

export default async function products(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: any = req.query.id

  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    })

    if (!product) {
      res.status(404).json({
        message: 'Product not found',
      })
    }

    res.status(200).json(product)
  } catch (e) {
    console.log(e)
  }
}
