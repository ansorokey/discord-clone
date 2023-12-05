## Day 2

To get a light and dark mode set up, we'll install a package called `next-themes`
`npm i next-themes`

Check out the [shadcn documentation](https://ui.shadcn.com/docs/dark-mode/next) and create a theme provider
Wrap that provider around the children of the root layout
Add the suppressHydrationWarning attribute to the html component of the layout

Side note: I keep running 'nvm install 18' to change the node version to 18+
I need to find a way to change it globally.

Now that we have a dark and light mode, let's add a toggle button.

When we import the code for that toggle button, we can see we're missing the dropdown menu component. Do a quick install of that and add it as a component
`npx shadcn-ui@latest add dropdown-menu`
And that will add itself and necesary code to the ui dir of the components

And now we have a working light and dark theme!
