import { Message } from '../../lib/chatHistory'

import AnswerTextarea from './AnswerTextarea'
import FetchingMessage from './FetchingMessage'
import MessagesList from './MessagesList'

interface Props {
  messages: Message[]
  viewingUserId: string
  historyId: string
  isValidating?: boolean
  isSolved: boolean
  isSupport: boolean
}

export const Chat = ({
  messages,
  viewingUserId,
  isValidating = false,
  historyId,
  isSolved,
  isSupport,
}: Props) => {
  return (
    <div className="h-full grid items-end col-span-full md:col-span-8 md:col-end-12 lg:col-span-6 lg:col-end-12 overflow-hidden border-4 border-black">
      <div className="h-full overflow-auto">
        <div className="relative h-full overflow-auto flex flex-col-reverse">
          {!isSolved && <FetchingMessage isValidating={isValidating} />}
          <MessagesList messages={messages} viewingUserId={viewingUserId} />
        </div>
      </div>
      {isSolved ? (
        <div className="p-5 text-xl bg-slate-200">
          Closed: this chat has been solved.
        </div>
      ) : (
        <AnswerTextarea
          authorId={viewingUserId}
          isSupport={isSupport}
          historyId={historyId}
        />
      )}
    </div>
  )
}

export default Chat
