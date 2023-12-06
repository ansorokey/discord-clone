## Day 2

To get a light and dark mode set up, we'll install a package called `next-themes`
`npm i next-themes`

Check out the [shadcn documentation](https://ui.shadcn.com/docs/dark-mode/next) and create a theme provider
Wrap that provider around the children of the root layout
Add the suppressHydrationWarning attribute to the html component of the layout

Side note: I keep running 'nvm install 18' to change the node version to 18+
I need to find a way to change it globally.
And so I did!
Changed the default node version using
`nvm alias default v21.4.0`
Now any new shell will start with this version

Now that we have a dark and light mode, let's add a toggle button.

When we import the code for that toggle button, we can see we're missing the dropdown menu component. Do a quick install of that and add it as a component
`npx shadcn-ui@latest add dropdown-menu`
And that will add itself and necesary code to the ui dir of the components

And now we have a working light and dark theme!

Now let's set up the database.
Let's grab some packages. this project wil use prisma.

What is prisma?
- [Prisma](https://www.prisma.io/) is an ORM for Node.js and Typescript.

`npm i -D prisma`
`npx prisma init`
This will add itself to the project, and fill out the env. We need to replace the default database location with our own. We will use [planetscale](https://app.planetscale.com/)

Defined a bunch of models in the prisma schema. Whenever the schema is modified, we need to run:
`npx prisma generate` to add schema to node modules
`npx prisma db push` creates the schemas in planetscale/whatever database

now lets install the prisma client
`npm i @prisma/client`

After doing some setup that will find a user's server or invite them to open a server, we can run `npx prisma studio` to view the current database. Really cool!
