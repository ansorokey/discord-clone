import { currentProfile } from "@/lib/current-profile"
import { NextResponse } from "next/server"
import { Message } from "@prisma/client";
import { db } from "@/lib/db";

// a constant, the number of messages loaded at a time
const MESSAGE_BATCH = 10;

export async function GET(
    req: Request
) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);

        // the cursor is used to load batches of messages at a time
        // it's just pagination for infinite loading
        const cursor = searchParams.get("cursor");
        const channelId = searchParams.get("channelId");

        if(!profile) {
            return new NextResponse("Unauthorized", { status: 401})
        }

        if(!channelId) {
            return new NextResponse("Channel ID Missing", { status: 400})
        }

        let messages: Message[] = []

        if(cursor) {
            messages = await db.message.findMany({
                take: MESSAGE_BATCH,
                skip: 1, // skip so we don't repeat the message the cursor is on
                cursor: {
                    id: cursor,
                },
                where: {
                    channelId
                },
                include: {
                    member: {
                        include: {
                            profile: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        } else {
            messages = await db.message.findMany({
                take: MESSAGE_BATCH,
                where: {
                    channelId
                },
                include: {
                    member: {
                        include: {
                            profile: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
        }

        let nextCursor = null;

        // if we have a full set of messages, start the next cursor loading point
        // at the last message
        if(messages.length === MESSAGE_BATCH) {
            nextCursor = messages[MESSAGE_BATCH - 1].id;
        }

        return NextResponse.json({
            items: messages,
            nextCursor
        })

    } catch (error) {
        console.log("[MESSAGES_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
