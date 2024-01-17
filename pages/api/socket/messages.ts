import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo
) {
    if(req.method !== 'post') {
        return res.status(405).json({ error: 'Method Not Allowed'})
    }

    try {
        const profile = await currentProfilePages(req);
        const { content, fileUrl } = req.body;
        const { serverId, channelId } = req.query;

        if(!profile) {
            return res.status(401).json({ error: "Unauthorized"});
        }

        if(!serverId) {
            return res.status(401).json({ error: 'Server ID Missing'})
        }

        if(!channelId) {
            return res.status(401).json({ error: 'Channel ID Missing'})
        }

        if(!content) {
            return res.status(401).json({ error: 'Content Missing'})
        }

        const server = await db.server.findFirst({
            where: {
                id: serverId as string,
                members: {
                    some: {
                        profileId: profile.id // make sure user is a member of this server so send message
                    }
                }
            },
            include: {
                members: true
            }
        });

        if(!server) {
            return res.status(404).json({ error: 'Server Not Found'})
        }

        const channel = await db.channel.findFirst({
            where: {
                id: channelId as string,
                serverId: serverId as string
            }
        });

        if(!channel) {
            return res.status(404).json({ error: 'Channel Not Found'})
        }

        // PICK UP HERE
        // find the member
        const member = sever.members.find()

    } catch (error) {
        console.log('[MESSAGES_POST', error)
        return res.status(500).json({message: 'Internal Error'})
    }
}
