import { getAllProfileIds } from '../../lib/user';
import Link from 'next/link';
import { getWeather } from '../../lib/weather';
import Header from '../../components/Header';


interface Props {
    profilesIds: { id: string }[]
    currentWeather: any
}

export const Users = ({ profilesIds, currentWeather }: Props) => {
    <Header currentWeather={currentWeather} />

    return (<>{
        profilesIds.map(({id}) => (
            <Link key={`${id}`} href={`/user-profile/${id}`}>
                <a>{`User ${id}`}</a>
            </Link>)
        )}</>)
}

export async function getStaticProps() {
    const currentWeather = await getWeather();
    const profilesIds = await getAllProfileIds();
    return {
        props: {
            profilesIds,
            currentWeather,
        },
    };
}

export default Users
