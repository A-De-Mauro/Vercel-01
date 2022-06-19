import { Message } from '../../lib/chatHistory'

import { CurrentUserMessage, OtherUserMessage } from './Message'

interface Props {
  messages: Message[]
  viewingUserId: string
}

export const MessagesList = ({ messages, viewingUserId }: Props) => {
  let language = 'en'
  if (typeof window !== 'undefined') {
    language = localStorage.getItem('language') || 'en'
  }

  const getMessageContent = (message: Message) => {
    const finalMessage =
      language === message.originalLanguage
        ? message.originalContent
        : message.content
    return finalMessage || '(no message)'
  }

  return (
    <div className="grid grid-cols-11 gap-3 py-8">
      {messages?.map((message) => {
        if (viewingUserId === message.authorId) {
          return (
            <CurrentUserMessage
              key={message.id}
              text={getMessageContent(message)}
            />
          )
        } else {
          return (
            <OtherUserMessage
              key={message.id}
              text={getMessageContent(message)}
            />
          )
        }
      })}
    </div>
  )
}

export default MessagesList
