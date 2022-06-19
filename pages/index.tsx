import type { NextPage, GetServerSideProps } from 'next'
import Link from 'next/link'

import PageFooter from '../components/PageFooter'
import PageHead from '../components/PageHead'
import { supportedLanguages } from '../lib/utils/languages'
import styles from '../styles/Home.module.css'

const Home: NextPage = ({ language, country }: any) => {
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
        <div className="flex gap-5 mt-36">
          <Link href="/users">
            <a>See the list of users</a>
          </Link>
          <button className="px-3 bg-slate-900 text-white hover:bg-slate-500 cursor-pointer transition-colors duration-300">
            Login
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
