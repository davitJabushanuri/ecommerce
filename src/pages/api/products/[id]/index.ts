import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

export default async function products(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id }: any = req.query
  const { body } = req

  if (req.method === 'GET') {
    try {
      const product = await prisma.product.findUnique({
        where: {
          id,
        },

        include: {
          reviews: {
            include: {
              helpful: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
          questions: {
            include: {
              answers: true,
            },
          },
        },
      })

      if (!product) {
        return res.status(404).json({
          message: 'Product not found',
        })
      }

      return res.status(200).json(product)
    } catch (e) {
      console.log(e)
    }
  }

  if (req.method === 'PUT') {
    try {
      const product = await prisma.product.update({
        where: {
          id,
        },
        data: {
          isTrending: body.isTrending,
          isBestSeller: body.isBestSeller,
          isNew: body.isNew,
          isOnSale: body.isOnSale,
        },
      })

      return res.status(200).json('Product updated')
    } catch (error: any) {
      return res.status(500).json(error.message.split(':').pop().trim())
    }
  }

  if (req.method === 'DELETE') {
    try {
      const product = await prisma.product.delete({
        where: {
          id,
        },
      })

      return res.status(200).json('Product deleted')
    } catch (error: any) {
      return res.status(500).json(error.message.split(':').pop().trim())
    }
  }
}
