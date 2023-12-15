// Need to make a few modifications for this file for our uses
// We're using clerk to handle our auth
import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// a piece of auth middleware
const handleAuth = function(){
    const {userId} = auth();
    if(!userId) throw new Error("Unauthorized")
    return { userId }
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    serverImage: f({image: {maxFileSize: "4MB", maxFileCount: 1}})
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
    messageFile: f(["image", "pdf"])
        .middleware(() => handleAuth())
        .onUploadComplete(() => {})
    } satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
