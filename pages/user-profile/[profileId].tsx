import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'

import { Avatar } from '../../components/Avatar'
import { getParams } from '../../components/utils'
import { getAllProfileIds, getUserChatHistory } from '../../lib/userProfile'

interface Props {
  chatHistoryList: any[]
  profileId: string
}

export const UserChatHistory = ({ chatHistoryList, profileId }: Props) => {
  const router = useRouter()

  if (!chatHistoryList) {
    return <div>Chat history not found</div>
  }

  return (
    <div className="relative flex flex-col m-5">
      <div className="absolute right-1 top-3 w-10 h-10 mix-blend-hue">
        <Avatar />
      </div>
      <h1 className="text-xl">Your chat history (profile {profileId})</h1>
      <div className="flex flex-col mt-5 border-slate-500 border-4">
        {chatHistoryList.map(
          ({
            id,
            openedAtDate,
            isSolved,
            closedAtDate,
            supportProfileId,
            clientProfileId,
          }) => (
            <div
              key={`${id}`}
              className="flex flex-1 justify-evenly gap-3 border-slate-500 border-4"
            >
              <div className="flex-1 p-3 border-slate-500 border-dashed border-r-4">
                {openedAtDate}
              </div>
              <div className="flex-1 flex items-baseline gap-5 p-3 border-slate-500 border-dashed border-r-4">
                Solved:{' '}
                {isSolved ? (
                  <span className="flex h-3 w-3">
                    <span className="inline-flex rounded-full h-3 w-3 bg-green-600"></span>
                  </span>
                ) : (
                  <span className="flex h-3 w-3">
                    <span className="animate-pulse inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                  </span>
                )}
              </div>
              <div className="flex-1 p-3 border-slate-500 border-dashed border-r-4">
                {closedAtDate}
              </div>
              <div className="flex-1 p-3 border-slate-500 border-dashed border-r-4">
                Chat with:{' '}
                {supportProfileId === profileId
                  ? `${clientProfileId} (client)`
                  : `${supportProfileId} (support)`}
              </div>
              <div className="flex-1 p-1 border-slate-500 border-dashed border-r-0">
                <button
                  key={`${id}`}
                  className="p-2 text-white bg-slate-800 hover:bg-slate-500"
                  onClick={() =>
                    router.push({
                      pathname: '/chat-history/[chatHistoryId]',
                      query: { chatHistoryId: id, profileId: profileId },
                    })
                  }
                >
                  {`See chat history ${id}`}
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
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
      profileId: params.profileId,
    },
  }
}

export default UserChatHistory
