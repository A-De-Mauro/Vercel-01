import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import ChatContainer from '../../components/ChatContainer'


const Avatar = () => (
    <Image
        src="/images/cat.png"
        height={50}
        width={50}
        alt="Avatar"
    />
);

export const Chat = () => {
    return (
        <ChatContainer>
            <div className="">
                <Head>
                    <title>Chat with us!</title>
                </Head>
                <h1>The chat</h1>
                <Avatar />
                <h2>
                    <Link href="/">
                        <a>Back to home</a>
                    </Link>
                </h2>
            </div>
            <div className="grid col-span-4 col-end-12 h-full">
                <div className="grid grid-cols-11 gap-3 border-4 border-black h-full px-3 py-8">
                    <div className="col-span-11 col-end-10 border-dashed border-4 border-slate-300 bg-slate-200 p-3">
                        Hello, how can I help you?
                    </div>
                    <div className="col-span-11 col-start-2 border-dashed border-4 border-slate-500 bg-slate-300 p-3 mb-2">
                        Hello...
                    </div>
                    <textarea className="col-span-full border-4 border-slate-500 p-3 mt-5">Write here</textarea>
                </div>
            </div>
        </ChatContainer>
    )
}

export default Chat
