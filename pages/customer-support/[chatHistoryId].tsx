import { useEffect } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import {
    getChatHistory,
    getAllHistoryIds,
    ChatHistory as ChatHistoryType,
} from "../../lib/chatHistory";
import Chat from "../../components/Chat";

import { getParams } from "../utils";
import ChatContainer from "../../components/ChatContainer";
import { usePolling } from "../__hooks__/usePolling";

interface Props {
    chatHistory: ChatHistoryType;
}

export default function ChatHistory({ chatHistory }: Props) {
    const { data, isLoading, isError, isValidating } = usePolling(
        `/api/chat-history/${chatHistory?.id}`
    );

    if (!chatHistory) return <>No history</>;
    if (isError) return <>Error</>;
    if (isLoading) return <>Loading...</>;

    const { clientProfileId, supportProfileId, id } = chatHistory;
    const { messages } = data

    return (
        <ChatContainer>
            <Chat
                messages={messages}
                viewingUserId={clientProfileId || supportProfileId || ""}
                historyId={id}
                isValidating={isValidating}
            />
        </ChatContainer>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const historyIds = await getAllHistoryIds();
    const paths = getParams(historyIds, "chatHistoryId", "id");
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const chatHistory = await getChatHistory(
        context.params?.chatHistoryId as string
    );
    return {
        props: {
            chatHistory,
        },
    };
};
