import { db } from "@/lib/db";

export async function getOrCreateConversation(
    memberOneId: string,
    memberTwoId: string
) {
    // find a conversation that goes either way
    let conversation = await findConversation(memberOneId, memberTwoId)
    || await findConversation(memberTwoId, memberOneId);

    // if neither one exists, make a new one
    if(!conversation) {
        conversation = await createNewConversation(memberOneId, memberTwoId)
    }

    return conversation;
}

async function findConversation(
    memberOneId: string,
    memberTwoId: string
) {

    try {
        return await db.conversation.findFirst({
            where: {
                AND: [
                    {memberOneId: memberOneId},
                    {memberTwoId: memberTwoId}
                ]
            },
            include: {
                memberOne: {
                    include: {
                        profile: true
                    }
                },
                memberTwo: {
                    include: {
                        profile: true
                    }
                }
            }
        });
    } catch {
        return null;
    }
}

async function createNewConversation(
    memberOneId: string,
    memberTwoId: string
) {
    try {
        return await db.conversation.create({
            data: {
                memberOneId,
                memberTwoId,
            },
            include: {
                memberOne: {
                    include: {
                        profile: true
                    }
                },
                memberTwo: {
                    include: {
                        profile: true
                    }
                }
            }
        })
    } catch {
        return null;
    }
}
