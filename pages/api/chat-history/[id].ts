import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

// GET /api/chat-history
// Required fields in query params: id
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { id } = req.query

    const result = await prisma.chatHistory.findUnique({
      where: { id: id as string },
      select: {
        messages: {
          orderBy: {
            sentAtTime: 'asc',
          },
        },
      },
    })

    // Might need the id
    res.json(result)
  }
}
