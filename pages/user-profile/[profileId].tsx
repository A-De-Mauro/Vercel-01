import { GetStaticPaths } from 'next'
import Link from 'next/link'

import { getParams } from '../../components/utils'
import { getAllProfileIds, getUserChatHistory } from '../../lib/user'

interface Props {
  chatHistoryList: any[]
}

export const UserChatHistory = ({ chatHistoryList }: Props) => {
  if (!chatHistoryList) {
    return <div>Chat history not found</div>
  }

  return (
    <>
      <h1>Your Chat history</h1>
      {chatHistoryList.map(({ id, openedAtDate, isSolved, closedAtDate }) => (
        <div key={`${id}`}>
          {openedAtDate}
          Solved: {isSolved}
          {closedAtDate}
          <Link href={`/chat-history/${id}`}>
            <a>{`Chat history ${id}`}</a>
          </Link>
        </div>
      ))}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const profiles = await getAllProfileIds()
  const paths = getParams(profiles, 'profileId', 'id')

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({
  params,
}: {
  params: { profileId: string }
}) {
  const chatHistoryList = await getUserChatHistory(params.profileId)

  return {
    props: {
      chatHistoryList,
    },
  }
}

export default UserChatHistory
