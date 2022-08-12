// import { prisma } from '../../../lib/prisma'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { NextApiRequest, NextApiResponse } from 'next'
import Error from 'next/error'

export default async function products(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({
      message: 'only POST method is supported',
    })
  }

  try {
    const { name, description, price, image, brand, category, stock } = req.body
    if (
      !name ||
      !description ||
      !price ||
      !image ||
      !brand ||
      !category ||
      !stock
    ) {
      res.status(400).json({
        message:
          'name, description, price, image, brand, category, stock are required',
      })
    }

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
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}
