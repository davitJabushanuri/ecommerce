import { prisma } from '../../../lib/prisma'

// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

import { NextApiRequest, NextApiResponse } from 'next'

export default async function products(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).json({
      message: 'only GET method is supported',
    })
  }

  try {
    const products = await prisma.product.findMany()
    res.status(200).json(products)
  } catch (e) {
    console.log(e)
  }
}
