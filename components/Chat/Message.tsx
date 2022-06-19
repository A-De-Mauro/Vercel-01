import { useEffect, useState } from 'react'

export const CurrentUserMessage = ({ text }: { text: string }) => {
  return (
    <div className="text-end col-span-11 col-start-3 border-dashed border-y-4 border-l-4 border-slate-400 bg-slate-200 p-3 mb-2">
      {text}
    </div>
  )
}

export const OtherUserMessage = ({
  text,
  language,
}: {
  text: string
  language: string
}) => {
  const [translatedMessage, setTranslatedMessage] = useState(text)

  useEffect(() => {
    // When the language is not English, we should translate the text of the other party
    if (language !== 'en') {
      try {
        const body = {
          message: text,
          languageFrom: 'en',
          languageTo: language,
        }

        fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
          .then((res) => res.json())
          .then((data) => {
            setTranslatedMessage(data.translatedText)
          })
      } catch (error) {
        console.error(error)
      }
    }
  }, [text, language])

  return (
    <div className="col-span-11 col-end-9 border-dashed border-y-4 border-r-4 border-slate-200 bg-slate-100 p-3">
      {translatedMessage}
    </div>
  )
}
