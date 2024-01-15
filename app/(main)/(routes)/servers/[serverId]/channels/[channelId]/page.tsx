// we know we'll have these params because we can only

import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { serverHooks } from "next/dist/server/app-render/entry-base";
import { redirect } from "next/navigation";
import { ChatHeader } from "@/components/chat/chat-header";

// reach this page by having both id's
interface ChannelIdPageProps {
    params: {
        serverId: string,
        channelId: string
    }
}

async function ChannelIdPage({
    params
}: ChannelIdPageProps) {
    const profile = await currentProfile();

    if(!profile) {
        return redirectToSignIn();
    }

    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId
        }
    });

    // find the member that is a part of this server AND has the profile id
    const member = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id
        }
    });

    if(!channel || !member) {
        return redirect('/');
    }

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
                name={channel.name}
                serverId={channel.serverId}
                type='channel'
            />
        </div>
     );
}

export default ChannelIdPage;
