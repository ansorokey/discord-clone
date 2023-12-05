# Intro
Hello! If all goes well, you'll see a fully functional web application.
What you won't see is all the hair tearing and fires I put out to make it work. Since twitter is scary and my cats/lizards/dog won't understand my code-speak, I thought I might as well make this and share my journey with you. ( and myself, since I sometimes forget what I am doing or how I did somehing ). Here is where I will discuss the steps I took to get started, bugs I encountered, how I fixed stuff, how I broke the stuff I thought I fixed, and more!

## Day 1
Started by setting up a new NextJs app template from [ui.shadcn.com](ui.shadcn.com).

- Documentation on the top,
- NextJs from the tempate options
- Installation under the getting started section

Ran the command
`npx create-next-app@latest APP-NAME --typescript --tailwind --eslint`

Install failed due to mismatch with current version of Node. Updated Node to latest version with
`sudo apt-get update`
`sudo apt-get install nodejs`

Ran the NextJs install command again, and chose
- NO for src directory
- YES for App Router
- No for import Alias

Successful install! be careful of a nested project directory.

Next, run the shadcn cli command
`npx shadcn-ui@latest init`
It'll ask a bunch of config questions, choose the following:
- Would you like to use TypeScript (recommended)? yes
- Which style would you like to use? › Default
- Which color would you like to use as base color? › STONE
- Where is your global CSS file? › › app/globals.css
- Do you want to use CSS variables for colors? › yes
- Where is your tailwind.config.js located? › tailwind.config.js
- Configure the import alias for components: › @/components
- Configure the import alias for utils: › @/lib/utils
- Are you using React Server Components? › yes

Tried to run the app with `npm run dev` but was met with
```
npm run dev

> srcc@0.1.0 dev
> next dev

/home/ansorokey/big-projects/discord-clone/node_modules/next/dist/server/web/spec-extension/request.js:28
class NextRequest extends Request {
                          ^

ReferenceError: Request is not defined
    at Object.<anonymous> (/home/ansorokey/big-projects/discord-clone/node_modules/next/dist/server/web/spec-extension/request.js:28:27)
    at Module._compile (node:internal/modules/cjs/loader:1126:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1180:10)
    at Module.load (node:internal/modules/cjs/loader:1004:32)
    at Function.Module._load (node:internal/modules/cjs/loader:839:12)
    at Module.require (node:internal/modules/cjs/loader:1028:19)
    at Module.mod.require (/home/ansorokey/big-projects/discord-clone/node_modules/next/dist/server/require-hook.js:64:28)
    at require (node:internal/modules/cjs/helpers:102:18)
    at Object.<anonymous> (/home/ansorokey/big-projects/discord-clone/node_modules/next/dist/server/web/spec-extension/adapters/next-request.js:37:18)
    at Module._compile (node:internal/modules/cjs/loader:1126:14)
Attention: Next.js now collects completely anonymous telemetry regarding usage.
This information is used to shape Next.js' roadmap and prioritize features.
You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
https://nextjs.org/telemetry
```

This appears to be an error with my node version. i cheked with
`node --version` and got `v16.17.0`
Fixed this very easily with the command `nvm install 18` as found in [this](https://stackoverflow.com/questions/77383943/nextjs-referenceerror-request-is-not-defined-reading-old-version-of-node-s) Stackoverflow thread

The app is now up and running with the default nextjs page. To clear up some of the clutter, I added a few CSS rules to the globals.css, and removed the default functional component contents. Replaced it with a simple 'Hello World!'. NextJs appears to be similar to ReactJs with the use of html.

Added a cool tailwind css extension to see how classnames affect html, removed some default imports.

Shadcn is a copy and paste library. Like Bootstrap, all we have to do is check out the library and see all the available components, and simply import the ones we want to use into the app. Install the specific component into the app. The components.json file tells the app where to find this library, and all the default colors and settings and stuff to use on it. For example:

`npx shadcn-ui@latest add button`
This button is now installed, and in the components folder is a ui dir with a fully customized button component. Everything about the component can be modified right there. Now we import it where we want to use it
`import { Button } from "@/components/ui/button";`
And use it
`<Button>Click Me</Button>`

Installed the simple react snippets extension. ffc now gives us a quick component setup.

Now we can add routes. To do so, create a page directory in the app folder. Add a `page.tsx` file. Create the page in this file.
To reach a route, all we have to do is add the nae of that directory to the end of the url
`localhost:3000/test`

if we just want a directory for organization, we name that dir between ()
`(auth)` and then add related routes inside it. We can still access the routes in that folder by adding the route name at the end.
`(auth)/login/`
`localhost:3000/login`
This just clears up clutter in our project.
Additionally, we can add a `layout.tsx` file to the root of that directory. All routes that are children of that dir will inherit styles and layouts from this file. same sidebar, color, alignmet, etc. Again, the name of the organizational folder does not affect the page/route name

Moved the `page.tsx` main file into the `/app/(main)/(routes)/` dir
