import type { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

import PageFooter from '../components/PageFooter'
import PageHead from '../components/PageHead'
import { supportedLanguages } from '../lib/utils/languages'
import styles from '../styles/Home.module.css'

const Home: NextPage = ({ language, country }: any) => {
  const router = useRouter()
  const [currentProfileId, setCurrentProfileId] = useState('p1')

  if (typeof window !== 'undefined') {
    localStorage.setItem('language', (language as string) || 'en')
  }

  return (
    <div className={styles.container}>
      <PageHead title={'Support'} />
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome!</h1>
        <h3 className={styles.description}>
          Your country is <strong>{country || 'unsupported'}</strong> and your
          speaking language is set as{' '}
          <strong>
            {supportedLanguages.find(
              (supportedLanguage) => supportedLanguage.code === language
            )?.name || 'English'}
          </strong>
        </h3>
        <p className="italic">
          You will be able to change your speaking language within the chat
        </p>
        <div className="flex gap-2 flex-1 items-center">
          <h3>I am user: </h3>
          <select
            defaultValue={currentProfileId}
            className="appearance-none bg-slate-200 border border-slate-200 text-slate-700 mx-3 py-1 px-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
            id="grid-state"
            onChange={(e) => setCurrentProfileId(e.target.value)}
          >
            <option key="p1" value="p1">
              p1 (support)
            </option>
            <option key="p2" value="p2">
              p2
            </option>
            <option key="p3" value="p3">
              p3
            </option>
          </select>
          <button
            className="p-2 text-white bg-slate-800 hover:bg-slate-500"
            onClick={() =>
              router.push({
                pathname: '/user-profile/[profileId]',
                query: { profileId: currentProfileId },
              })
            }
          >
            Go to profile
          </button>
        </div>
      </main>
      <PageFooter />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      language: context.query.language,
      country: context.query.country,
    },
  }
}

export default Home
