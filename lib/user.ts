import prisma from './prisma'

export async function getAllProfileIds() {
  const profiles = await prisma.profile.findMany()
  return profiles.map(({ id }) => ({ id }))
}

export async function getAllSupportUsersId() {
  const usersId = await prisma.profile.findMany({
    select: {
      id: true,
    },
    where: { isSupport: true },
  })
  return usersId.map((id) => ({ params: { profileId: id } }))
}

export async function getAllRegisteredUserId() {
  const usersId = await prisma.profile.findMany({
    select: {
      id: true,
    },
    where: { isSupport: false },
  })
  return usersId.map((id) => ({ params: { profileId: id } }))
}

export async function getUserChatHistory(userProfileId?: string) {
  const userChatHistory = await prisma.chatHistory.findMany({
    select: {
      id: true,
      openedAtDate: true,
      closedAtDate: true,
      isSolved: true,
    },
    where: {
      OR: [
        { supportProfileId: userProfileId },
        { clientProfileId: userProfileId },
      ],
    },
  })
  return userChatHistory
}
