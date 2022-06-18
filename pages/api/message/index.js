import translate from 'translate'

import prisma from '../../../lib/prisma'

translate.engine = 'libre'

// POST /api/message
// Required fields in body: message
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message, authorId, historyId, time } = req.body

    const translateResponse = await fetch(
      'https://translate.argosopentech.com/translate',
      {
        method: 'POST',
        body: JSON.stringify({
          q: message,
          source: 'it',
          target: 'en',
        }),
        headers: { 'Content-Type': 'application/json' },
      }
    )

    const translatedMessage = await translateResponse.json()

    const result = await prisma.message.create({
      data: {
        content: translatedMessage.translatedText,
        authorId: authorId,
        historyId: historyId,
        sentAtTime: time,
      },
    })
    // Might need the id
    res.json(result)
  }
}
