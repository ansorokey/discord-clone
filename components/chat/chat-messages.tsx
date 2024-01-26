"use client";

import { Member, Message, Profile } from "@prisma/client";
import { ChatWelcome } from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment, useRef, ElementRef } from "react";
import { ChatItem } from "./chat-item";
import { format } from "date-fns";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { useChatScroll } from "@/hooks/use-chat-scroll";

const DATE_FORMAT = "d MMM yyy, HH:mm";

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile
    }
}

interface ChatMessagesProps {
    name: string;
    member: Member;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: "channelId" |"conversationId";
    paramValue: string;
    type: "channel" | "conversation";
}

export function ChatMessages({
    name,
    member,
    chatId,
    apiUrl,
    socketQuery,
    socketUrl,
    paramKey,
    paramValue,
    type
}: ChatMessagesProps) {

    const queryKey = `chat:${chatId}`;
    const addKey = `chat:${chatId}:messages`;
    const updateKey = `chat:${chatId}:messages:update`;

    const chatRef = useRef<ElementRef<"div">>(null);
    const bottomRef = useRef<ElementRef<"div">>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue
    });
    useChatSocket({ queryKey, addKey, updateKey});
    useChatScroll({
        chatRef,
        bottomRef,
        loadMore: fetchNextPage,
        shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
        count: data?.pages[0]?.items?.length ?? 0,
        // the double question mark is like '||' but only when the left hand side is undefined or null specifically (not just falsey)
    })

    // in v5, use pending instead of loading
    if(status === "pending") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2
                    className="h-7 w-7 text-zinc-500 animate-spin my-4"
                />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Loading Messages...
                </p>
            </div>
        );
    }

    if(status === "error") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <ServerCrash
                    className="h-7 w-7 text-zinc-500 my-4"
                />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Something Went Wrong!
                </p>
            </div>
        );
    }

    return (
        <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
            {!hasNextPage && <div className="flex-1" />}
            {!hasNextPage && ( // the last page is technically the top of the chat
                <ChatWelcome
                    type={type}
                    name={name}
                />
            )}
            {hasNextPage && (
                <div className="flex justify-center">
                    {isFetchingNextPage ? (
                        <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4"/>
                    ):
                        <button
                            onClick={() => fetchNextPage()}
                            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs
                            my-4 dark:hover:tezt-zinc-300 transition "
                        >
                            Load previous messages
                        </button>
                    }
                </div>
            )}
            <div className="flex flex-col-reverse mt-auto">
                {data?.pages?.map((group, i) => (
                    <Fragment key={i}>
                        {group.items.map((message: MessageWithMemberWithProfile ) => (
                            <ChatItem
                                currentMember={member}
                                member={message.member}
                                key={message.id}
                                id={message.id}
                                content={message.content}
                                fileUrl={message.fileUrl}
                                deleted={message.deleted}
                                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                                isUpdated={message.updatedAt !== message.createdAt}
                                socketQuery={socketQuery}
                                socketUrl={socketUrl}
                            />
                        ))}
                    </Fragment>
                ))}
            </div>
            <div ref={bottomRef} />
        </div>
    );
}
