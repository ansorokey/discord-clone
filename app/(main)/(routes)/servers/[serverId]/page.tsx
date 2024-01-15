import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ServerIdPageProps {
    params: {
        serverId: string
    }
}

async function ServerIdPage({
    params
}: ServerIdPageProps) {

    const profile = await currentProfile();

    if(!profile) {
        return redirectToSignIn();
    }

    // find all the user's servers
    // include the general of each, ordered by creation date
    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id, // make sure they're a member of the profile
                }
            }
        },
        include: {
            channels: {
                where: {
                    name: 'general' // redirect to the general channel
                },
                orderBy: {
                    createdAt: 'asc'
                }
            }
        },
    })

    // we now have an array of general channels,
    // select the first
    const initialChannel = server?.channels[0];

    // this shoudl never happen,
    // but just in case
    if(initialChannel?.name !== 'general') {
        return null;
    }

    // redirect them to that channel
    return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`);
}

export default ServerIdPage;
