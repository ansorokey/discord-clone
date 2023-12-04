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
