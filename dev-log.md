## Day 3
gi
Moving on to image uploading.
We'll be using [uploadthing.com](uploadthing.com) for this project

Create a new app, and grab our secret keys.
Check out the getting started guide in the docs. We'll need to install some packages
`npm install uploadthing @uploadthing/react`
The tutorial install include `react-dropzone`, but this is not listed with the current docs, so we'll leave it out for now and come back to it if needed in the future.

We'll be using the app router, so follow the set up for that. Create the core.ts file.

For the uploadthing component, we created a file and inserted it into the app/lib directory instead of the recommended src/path
adjusted imports as needed

Trying to test the component but running into an issue where the database cannot query my profile from the database.
I'm also having issues connecting to github, so my first assumption is an issue with my internet network despite being on phone hotspot.

```
Unhandled Runtime Error
Error:
Invalid `prisma.profile.findUnique()` invocation:


Error querying the database: Server error: `ERROR HY000 (1105): unavailable: unable to connect to branch bcat49jjiglg'

Source
lib/initial-profile.ts (11:20) @ async initialProfile

   9 | }
  10 |
> 11 | const profile = await db.profile.findUnique({
     |                ^
  12 |     where: {
  13 |         userId: user.id
  14 |     }
Call Stack
async SetupPage
app/(setup)/page.tsx (7:20)
```
Should everything work correctly, we should now be able to upload something like an image to the upload thing page and see it displayed on the project dashboard

TODO: fix github credentials
TODO: fix issue with logging in (connec tto server/database)
FIXED: woke up sleeping planetscale db
TODO: test upload
FIXED: Uploading image works correctly!

We now have an image upload and server name!
Now to make the server in the database using an API

`npx prisma studio` top open up the cool database tool

to make calls in this project, we'll be installing axios
`npm i axios`

Routes will be set up in the app/api directory
server routes in the server directory

First, we'll set up a util to check the current profile

We'll also install uuid
`npm i uuid`
and
`npm i -D @types/uuid`

Setting up the post route for the server, which will fire from the intial modal
Creates the server, admin, base channel

At this point, we should be able to test and get a 404 error afterwards, but see the server in the db
Yep!

The 404 is occuring because the initial profile is fetched or created
If the profile exists, we direct the user to the first server they're a member of, otherwise we create a server
So we need to render a page for the current server

create the file structure for serverId routes, along with the page to render (just text for now)

Lets install the [tooltip](https://ui.shadcn.com/docs/components/tooltip) component from shadcn
`npx shadcn-ui@latest add tooltip`

and the [seperator](https://ui.shadcn.com/docs/components/separator)
`npx shadcn-ui@latest add separator`

and [scroll area](https://ui.shadcn.com/docs/components/scroll-area)
`npx shadcn-ui@latest add scroll-area`

We now have a nice and pretty looking Navigatgion sidebar, complete with dynamically fetched server icons, a theme toggle button, and the user profile button for signing out.

Now we need to create a modal that allows for server creation when we click the + button on the nav bar.
We'll install a package called zustand to work with modals
`npm i zustand`
