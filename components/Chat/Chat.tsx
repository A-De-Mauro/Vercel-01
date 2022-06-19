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
}

export const Chat = ({
  messages,
  viewingUserId,
  isValidating = false,
  historyId,
  isSolved,
}: Props) => {
  return (
    <>
      <div className="h-full  grid col-span-5 col-end-12 overflow-hidden border-4 border-black">
        <div className="h-full overflow-scroll">
          <div className="relative h-full overflow-scroll flex flex-col-reverse">
            {!isSolved && <FetchingMessage isValidating={isValidating} />}
            <MessagesList messages={messages} viewingUserId={viewingUserId} />
          </div>
        </div>
        {isSolved ? (
          <div>This chat has been solved</div>
        ) : (
          <AnswerTextarea authorId={viewingUserId} historyId={historyId} />
        )}
      </div>
    </>
  )
}

export default Chat
