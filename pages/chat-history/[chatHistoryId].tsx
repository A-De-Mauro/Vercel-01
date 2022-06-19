import { GetStaticProps, GetStaticPaths } from 'next'

import { usePolling } from '../../components/__hooks__/usePolling'
import Chat from '../../components/Chat/Chat'
import { getParams } from '../../components/utils'
import {
  getChatHistory,
  getAllHistoryIds,
  ChatHistory as ChatHistoryType,
} from '../../lib/chatHistory'

interface Props {
  chatHistory: ChatHistoryType
}

export default function ChatHistory({ chatHistory }: Props) {
  const { data, isLoading, isError, isValidating } = usePolling(
    `/api/chat-history/${chatHistory?.id}`,
    // The polling will not set an interval if the chat has been closed
    chatHistory?.isSolved
  )

  if (!chatHistory) return <>No history</>
  if (isError) return <>Error</>
  if (isLoading) return <>Loading...</>

  const { clientProfileId, supportProfileId, id, isSolved } = chatHistory
  const { messages } = data

  return (
    <div className="w-screen h-screen grid grid-cols-11 gap-0">
      <Chat
        messages={messages}
        viewingUserId={clientProfileId || supportProfileId || ''}
        historyId={id}
        isValidating={isValidating}
        isSolved={isSolved}
      />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const historyIds = await getAllHistoryIds()
  const paths = getParams(historyIds, 'chatHistoryId', 'id')
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const chatHistory = await getChatHistory(
    context.params?.chatHistoryId as string
  )
  return {
    props: {
      chatHistory,
    },
  }
}
