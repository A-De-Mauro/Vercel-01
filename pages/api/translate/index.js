import translate from 'translate'

translate.engine = 'libre'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Can translate from any supported language to any supported language
    const { message, languageFrom, languageTo } = req.body
    let translatedMessage = undefined

    // Only translates if one of the languages is not English
    if (languageFrom !== 'en' || languageTo !== 'en') {
      const translateResponse = await fetch(
        'https://translate.argosopentech.com/translate',
        {
          method: 'POST',
          body: JSON.stringify({
            q: message,
            source: languageFrom,
            target: languageTo,
          }),
          headers: { 'Content-Type': 'application/json' },
        }
      )
      translatedMessage = await translateResponse.json()

      res.json({ translatedText: translatedMessage?.translatedText })
    }
  }
}
