import { useState } from "react";
import { CustomerSupportMessage } from "./CustomerSupportMessage";
import { ClientMessage } from "./ClientMessage";
import { Message } from "../lib/chatHistory";

interface Props {
    messages: Message[];
    viewingUserId: string;
    historyId: string;
    isValidating?: boolean;
}

export const Chat = ({ messages, viewingUserId, historyId, isValidating = false }: Props) => {
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const time = new Date().toLocaleTimeString();
        // Restores the message if an error occured
        const oldMessage = message;
        setIsSending(true);
        try {
            setMessage("");
            const body = { message, authorId: viewingUserId, historyId, time };
            await fetch("/api/message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }).then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    setIsSending(false);
                }
            });
        } catch (error) {
            setMessage(oldMessage);
            setIsSending(false);
            console.error(error);
        }
    };

    return (
        <>
            <div className="h-full  grid col-span-5 col-end-12 overflow-hidden border-4 border-black">
                <div className="h-full overflow-scroll">
                    <div className="relative h-full overflow-scroll flex flex-col-reverse">
                        {isValidating && <div className="absolute bottom-0 right-0 text-slate-400">Fetching messages...</div>}
                        <div className="grid grid-cols-11 gap-3 py-8">
                            {messages?.map((message) => {
                                if (viewingUserId === message.authorId) {
                                    return <ClientMessage key={message.id} text={message.content} />;
                                } else {
                                    return (
                                        <CustomerSupportMessage
                                            key={message.id}
                                            text={message.content}
                                        />
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>
                <div className="relative grid col-span-full">
                    {isSending && <div className="absolute left-0">Sending...</div>}
                    <form onSubmit={submitData}>
                        <textarea
                            placeholder="Write here..."
                            className="w-full border-4 border-slate-500 p-3"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <input type="submit" value="Create" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default Chat;
