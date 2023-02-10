import { prisma } from '../../../../lib/prisma'
import { productValidation } from 'components/Schemas/productValidation'

import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export default async function products(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req

  if (method !== 'POST') {
    return res.status(405).json({
      message: 'only POST method is supported',
    })
  }

  const { errors } = await validation(productValidation, body)

  if (errors) {
    return res.status(400).json({
      errors,
    })
  }

  try {
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: Number(body.price),
        image: body.image,
        brand: body.brand,
        category: body.category,
        stock: Number(body.stock),
        shipping: Number(body.shipping),
        condition: body.condition,
      },
    })
  } catch (error: any) {
    return res.status(500).json(error.message.split(':').pop().trim())
  }

  return res.status(200).json({
    message: 'product created successfully',
  })
}

export const validation = async (schema: any, data: any) => {
  try {
    await schema.validate(data)
    return { isValid: true, errors: null }
  } catch (error: any) {
    const { errors } = error
    return { isValid: false, errors }
  }
}
