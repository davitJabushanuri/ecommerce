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

  // post data to database
  try {
    const product = await prisma.product.create({
      data: body,
    })
  } catch (error: any) {
    res.status(500).json({ error })
  }

  res.status(200).json({
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
