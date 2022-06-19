import Link from 'next/link'

import Header from '../../components/Header'
import { getAllProfileIds } from '../../lib/user'
import { getWeather } from '../../lib/weather'

interface Props {
  profilesIds: { id: string }[]
  currentWeather: any
}

export const Users = ({ profilesIds, currentWeather }: Props) => {
  return (
    <>
      <Header currentWeather={currentWeather} />
      {profilesIds.map(({ id }) => (
        <Link key={`${id}`} href={`/user-profile/${id}`}>
          <a>{`User ${id}`}</a>
        </Link>
      ))}
    </>
  )
}

export async function getStaticProps() {
  const currentWeather = await getWeather()
  const profilesIds = await getAllProfileIds()
  return {
    props: {
      profilesIds,
      currentWeather,
    },
  }
}

export default Users
