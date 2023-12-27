import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
    params: {
        inviteCode: string,
    }
}

async function InviteCodePage({
    params
}: InviteCodePageProps) {

    // find current profile
    const profile = await currentProfile();

    // no profile? Sign in
    if(!profile) {
        return redirectToSignIn();
    }

    // no invite code? go home
    if(!params.inviteCode) {
        return redirect("/");
    }

    // Are they already a member of the server they're trying to join via link?
    const exisitingServer = await db.server.findFirst({
        where: {
            inviteCode: params.inviteCode,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    // if so, send them to that server
    if(exisitingServer) {
        return redirect(`/servers/${exisitingServer.id}`)
    }

    // find the server
    // add this user as a new member
    const server = await db.server.update({
        where: {
            inviteCode: params.inviteCode
        },
        data: {
            members: {
                create: [
                    {
                        profileId: profile.id,
                    }
                ]
            }
        }

    })

    // if a valid link, redirect to server
    if(server) {
        return redirect(`/servers/${server.id}`)
    }

    // this page exists only to redirect
    // no need to return a page
    return null;
}

export default InviteCodePage;
