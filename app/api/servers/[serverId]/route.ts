import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH (
    req: Request,
    { params } : { params: {serverId: string }}
) {
    try {
        const profile = await currentProfile();

        if(!profile) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const { name, imageUrl } = await req.json();

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id // so only the admin can chgange settings
            },
            data: {
                name,
                imageUrl
            }
        });
// 0196-62C4
        return NextResponse.json(server);
    } catch (error) {
        console.log("[SERVER_ID PATCH", error);
        return new NextResponse("internal Error", { status: 500 })
    }
}
