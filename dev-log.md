## Day 4

moving on to the channel sidebar
[https://youtu.be/ZbX4Ok9YX94?t=10950]

add role to serbver header
[https://youtu.be/ZbX4Ok9YX94?t=11990]

add red coloring text to delete server in server header
[https://youtu.be/ZbX4Ok9YX94?t=12660]

Let's add some invite functionality

We now have an invite code generator, but we do not have the route to use it. Let's do that!

Small issue with inviteCode not being a valid string according to schema
We had it set to @db.TEXT instead of @unique
Now it can be queried by the inviteCode
Since we chanmged the schema, don't forget to run
`npx prisma generate`
`npx prisma db push`
y to confirm changes

Just to be sure our changes went through, let's reset the database
`npx prisma migrate reset`
confirm y to wipe db


The invite link works, but new members are coming in with the ability to create a channel
This means they have some sort of moderator role
FIXED: accidentally left out the role === on the moderator roles enum
