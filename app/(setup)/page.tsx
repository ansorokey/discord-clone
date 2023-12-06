import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from 'next/navigation';

async function SetupPage() {
    const profile = await initialProfile();

    // finds the first server that has the profile id in the members of that server
    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if (server) {
        return redirect(`/servers/${server.id}`);
    }

    return ( <div>Create A server</div> );
}

export default SetupPage;
