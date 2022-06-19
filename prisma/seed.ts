import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Creates messages from 3 different chatHistories, one support user

async function main() {
  // Insert data safely
  const alice = await prisma.profile.upsert({
    where: { id: 'p1' },
    update: {},
    create: {
      id: 'p1',
      email: 'alice@',
      isSupport: true,
      user: {
        create: {
          id: 'u1',
          name: 'Alice',
        },
      },
    },
  })

  const andras = await prisma.profile.upsert({
    where: { id: 'p2' },
    update: {},
    create: {
      id: 'p2',
      email: 'andras@',
      user: {
        create: {
          id: 'u2',
          name: 'Andras',
        },
      },
    },
  })

  const lucas = await prisma.profile.upsert({
    where: { id: 'p3' },
    update: {},
    create: {
      id: 'p3',
      email: 'lucas@',
      user: {
        create: {
          id: 'u3',
          name: 'Lucas',
        },
      },
    },
  })

  const chat01 = await prisma.chatHistory.upsert({
    where: { id: 'ch1' },
    update: {},
    create: {
      id: 'ch1',
      openedAtDate: 'date-01',
      closedAtDate: 'date-02',
      clientProfileId: 'p2',
      supportProfileId: 'p1',
      isSolved: true,
      messages: { create: [] },
    },
  })

  const chat02 = await prisma.chatHistory.upsert({
    where: { id: 'ch2' },
    update: {},
    create: {
      id: 'ch2',
      openedAtDate: 'date-02',
      closedAtDate: 'date-03',
      clientProfileId: 'p2',
      supportProfileId: 'p1',
      isSolved: false,
      messages: { create: [] },
    },
  })

  const chat03 = await prisma.chatHistory.upsert({
    where: { id: 'ch3' },
    update: {},
    create: {
      id: 'ch3',
      openedAtDate: 'date-03',
      closedAtDate: 'date-03',
      clientProfileId: 'p3',
      supportProfileId: 'p1',
      isSolved: true,
      messages: { create: [] },
    },
  })

  const historyUpdate01 = await prisma.chatHistory.upsert({
    where: { id: 'ch1' },
    create: {},
    update: {
      messages: {
        create: [
          {
            content: 'Hello! How can I help you?',
            sentAtTime: '00:00:00',
            authorId: 'p1',
          },
          {
            content: 'I have an issue',
            sentAtTime: '00:00:01',
            authorId: 'p2',
          },
          { content: 'Yes, tell me', sentAtTime: '00:00:02', authorId: 'p1' },
          { content: 'Well', sentAtTime: '00:00:03', authorId: 'p2' },
          {
            content: "This thing doesn't work",
            sentAtTime: '00:00:04',
            authorId: 'p2',
          },
          {
            content: 'Does it work now?',
            sentAtTime: '00:00:05',
            authorId: 'p1',
          },
          {
            content: 'Oh yes, thank you!!',
            sentAtTime: '00:00:06',
            authorId: 'p2',
          },
        ],
      },
    },
  })

  const historyUpdate02 = await prisma.chatHistory.upsert({
    where: { id: 'ch2' },
    create: {},
    update: {
      messages: {
        create: [
          {
            content: 'Hello! How can I help you?',
            sentAtTime: '00:00:00',
            authorId: 'p1',
          },
        ],
      },
    },
  })

  const historyUpdate03 = await prisma.chatHistory.upsert({
    where: { id: 'ch3' },
    create: {},
    update: {
      messages: {
        create: [
          {
            content: 'Hello! How can I help you?',
            sentAtTime: '00:00:00',
            authorId: 'p1',
          },
          {
            content: 'I have something not working here',
            sentAtTime: '00:00:01',
            authorId: 'p3',
          },
          {
            content: 'Can you explain better, please?',
            sentAtTime: '00:00:02',
            authorId: 'p1',
          },
          { content: 'Yes...', sentAtTime: '00:00:03', authorId: 'p3' },
          {
            content: "The login doesn't work",
            sentAtTime: '00:00:04',
            authorId: 'p3',
          },
          {
            content: 'Okay, let me see. Does it work now?',
            sentAtTime: '00:00:05',
            authorId: 'p1',
          },
          {
            content: 'Oh yes, thank you!!',
            sentAtTime: '00:00:06',
            authorId: 'p3',
          },
        ],
      },
    },
  })

  console.info({
    alice,
    andras,
    lucas,
    chat01,
    chat02,
    chat03,
    historyUpdate01,
    historyUpdate02,
    historyUpdate03,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
