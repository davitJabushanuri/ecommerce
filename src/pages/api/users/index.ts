import { prisma } from '../../../lib/prisma'

import { NextApiRequest, NextApiResponse } from 'next'

export default async function users(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({
      message: 'only GET method is supported',
    })
  }

  try {
    const users = await prisma.user.findMany({
      include: {
        favorites: {
          include: {
            product: true,
          },
        },
        cartItems: true,
      },
    })
    res.status(200).json(users)
  } catch (e) {
    console.log(e)
  }
}
