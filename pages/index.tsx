import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import PageFooter from '../components/PageFooter'
import PageHead from '../components/PageHead'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const { query } = useRouter()

  if (typeof window !== 'undefined') {
    localStorage.setItem('language', (query.language as string) || 'en')
  }

  return (
    <div className={styles.container}>
      <PageHead title={'Support'} />
      <main className={styles.main}>
        <h2 className={styles.title}>
          Welcome, your country is {query.country} and your language is set as{' '}
          {query.language}
        </h2>
        <div>
          <Link href="/users">
            <a>See the list of users</a>
          </Link>
        </div>
      </main>
      <PageFooter />
    </div>
  )
}

export default Home
