import { useEffect, useState } from "react";

type ChatSrollProps = {
    chatRef: React.RefObject<HTMLDivElement>;
    bottomRef: React.RefObject<HTMLDivElement>;
    shouldLoadMore: boolean;
    loadMore: () => void;
    count: number;
}


export function useChatScroll({
    chatRef,
    bottomRef,
    shouldLoadMore,
    loadMore,
    count
}: ChatSrollProps) {
    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        const topDiv = chatRef?.current;

        function handleScroll() {
            const scrollTop = topDiv?.scrollTop;

            if(scrollTop === 0 && shouldLoadMore) {
                loadMore();
            }
        }

        topDiv?.addEventListener('scroll', handleScroll);

        return () => {
            topDiv?.removeEventListener('scroll', handleScroll)
        }
    }, [shouldLoadMore, loadMore, chatRef])

    useEffect(() => {
        const bottomDiv = bottomRef?.current;
        const topDiv = chatRef.current;
        function shouldAutoScroll() {
            if(!hasInitialized && bottomDiv) {
                setHasInitialized(true);
                return true;
            }

            if(!topDiv) {
                return false;
            }

            const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
            return distanceFromBottom <= 100;
        }

        if(shouldAutoScroll()) {
            setTimeout(() => {
                bottomRef.current?.scrollIntoView({
                    behavior: 'smooth'
                })
            }, 100);
        }
    }, [bottomRef, chatRef, count, hasInitialized]);
}
