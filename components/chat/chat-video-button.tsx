"use client";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Video, VideoOff } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";

export function ChatVideoButton() {
    const searchParms = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const isVideo = searchParms?.get("video");

    function onClick() {
        const url = qs.stringifyUrl({
            url: pathname || "",
            query: {
                video: isVideo ? undefined : true
            }
        }, { skipNull: true })


        router.push(url);
    }

    const Icon = isVideo ? VideoOff : Video; // the capital allows us to render it like a component
    const tooltipLabel = isVideo ? "End video call" : "Start video"

    return (
        <ActionTooltip
            side="bottom"
            label={tooltipLabel}
        >
            <button
                onClick={onClick}
                className="hover:opacity-75 transition mr-4"
            >
                <Icon
                    className="h-6 w-6 text-zinc-500 dark:text-zinc-400"
                />
            </button>

        </ActionTooltip>
    );
}
