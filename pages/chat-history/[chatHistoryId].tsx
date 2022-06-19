import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import Chat from '../../components/Chat/Chat'
import { getParams } from '../../components/utils'
import {
  getChatHistory,
  getAllHistoryIds,
  ChatHistory as ChatHistoryType,
} from '../../lib/chatHistory'
import { fetcher } from '../../lib/utils/fetcher'

interface Props {
  chatHistory: ChatHistoryType
}

export const ChatHistory = ({ chatHistory }: Props) => {
  const {
    query: { profileId },
  } = useRouter()

  const { data, error } = useSWR(
    `/api/chat-history/${chatHistory?.id}`,
    fetcher,
    {
      // The polling will not set an interval if the chat has been closed
      refreshInterval: chatHistory?.isSolved ? 0 : 1000,
    }
  )

  if (!chatHistory) return <>No history</>
  if (error) return <>Error</>
  if (!data && !error) return <>Loading...</>

  const { clientProfileId, id, isSolved } = chatHistory
  const messages = data?.messages
  const isSupport = clientProfileId === profileId ? false : true

  return (
    <div className="w-screen h-screen grid grid-cols-11 gap-0">
      <h1 className="col-span-12 md:col-span-3 lg:col-span-4">
        Your {id} messages, user {profileId} {isSupport ? '(support)' : '(customer)'}
      </h1>
      <Chat
        messages={messages}
        viewingUserId={profileId as string}
        historyId={id}
        isSolved={isSolved}
        isSupport={isSupport}
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

export default ChatHistory
