import translate from 'translate'

import prisma from '../../../lib/utils/prisma'

translate.engine = 'libre'

// POST /api/message
// Required fields in body: message
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message, authorId, historyId, time, language } = req.body

    let translatedMessage = undefined

    if (language !== 'en') {
      const translateResponse = await fetch(
        'https://translate.argosopentech.com/translate',
        {
          method: 'POST',
          body: JSON.stringify({
            q: message,
            source: language,
            // We always translate in English
            target: 'en',
          }),
          headers: { 'Content-Type': 'application/json' },
        }
      )
      translatedMessage = await translateResponse.json()
    }

    const isTranslated = !!translatedMessage?.translatedText

    const result = await prisma.message.create({
      data: {
        content: translatedMessage?.translatedText || message,
        authorId: authorId,
        historyId: historyId,
        sentAtTime: time,
        // Only saves original when is necessary
        originalContent: isTranslated ? message : null,
        originalLanguage: isTranslated ? language : null,
      },
    })
    // Might need the id
    res.json(result)
  }
}
