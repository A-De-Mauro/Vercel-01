import Head from 'next/head'
import Link from 'next/link'

import { Avatar } from './Avatar'

export const Header = (currentWeather: any) => {
  return (
    <div className="grid col-span-7">
      <Head>
        <title>Chat with us!</title>
      </Head>
      <h1>The chat</h1>
      <div>
        <Avatar />
        Your temperature: <>{currentWeather.temperature}</>
      </div>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </div>
  )
}

export default Header
