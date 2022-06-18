import translate from 'translate'

translate.engine = 'libre'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { text } = req.body
    const translatedText = await translate(text, 'es')

    res.json(translatedText)
  }
}
