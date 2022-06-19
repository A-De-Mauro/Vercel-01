import { useState } from 'react'

import LanguageSelect from './LanguageSelect'

interface Props {
  authorId: string
  historyId: string
  isSupport: boolean
}

export const Chat = ({ authorId, historyId, isSupport }: Props) => {
  const defaultLanguage = localStorage.getItem('language') || 'en'
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage)

  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)

  const handleSetLanguage = (languageCode: string) => {
    setCurrentLanguage(languageCode)
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', languageCode)
    }
  }

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const time = new Date().toLocaleTimeString()
    // Restores the message if an error occurred
    const sentMessage = message
    if (message.length) {
      setIsSending(true)
      setMessage('')
    }
    try {
      const body = {
        message: sentMessage,
        authorId,
        historyId,
        time,
        language: currentLanguage,
      }
      await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setIsSending(false)
        }
      })
    } catch (error) {
      setMessage(sentMessage)
      setIsSending(false)
      console.error(error)
    }
  }

  return (
    <div className="relative grid col-span-full mb-10 mr-8">
      <LanguageSelect
        currentLanguage={currentLanguage}
        setCurrentLanguage={handleSetLanguage}
        isSupport={isSupport}
      />
      {isSending && <div className="animate-pulse">Sending...</div>}
      <form onSubmit={submitData} className="flex flex-1">
        <textarea
          placeholder="Write here..."
          className="w-full h-32 border-y-4 border-slate-600 p-3 resize-none focus:outline-0"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          className="p-3 w-32 bg-slate-800 hover:bg-slate-600 text-white font-bold cursor-pointer transition-colors duration-300 disabled:text-slate-500 disabled:text-slate-200 disabled:cursor-not-allowed"
          type="submit"
          value="Send"
          disabled={message.length === 0}
        />
        <button
          className="p-3 bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors duration-300"
          onClick={() => setMessage('')}
        >
          Clear
        </button>
      </form>
    </div>
  )
}

export default Chat
