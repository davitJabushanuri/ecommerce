// import { prisma } from '../../../lib/prisma'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { NextApiRequest, NextApiResponse } from 'next'

export default async function products(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { name, description, price, image, brand, category, stock } = req.body
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        image,
        brand,
        category,
        stock,
      },
    })
    res.status(201).json(product)
  } catch (e) {
    console.log(e)
  }
}
