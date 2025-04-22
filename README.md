
# Parlier-NJROTC's backend server

Welcome to the Backend Server Source Code
for now, This server is For The Ribbon System

## Setup

### Initializing Project

Since this project uses bun (JavaScript runtime), Run the command: "sudo bun install"
This will install all packages

If you are using Node or Deno (JavaScript runtime) Somehow, Copy the Code and package.json
Run the equivalent of sudo bun install (sudo npm install or whatever deno uses)
I Have No idea how it will run, If has so any errors, You try to figure them out.

Make sure to also Download the Dashboard-Frontend and Put it in Here, Don't worry It will be fine (I Think). After that Go Inside that Folder and run: "sudo bun install && sudo bun run build"

### .env file tutorial

Look at the lines with `process.env.VARIABLE_NAME` these lines are fetched from the .env file. Bun Automatically reads these files to get the process.env.VARIABLES So There is No need to import it. The reason why it's in gitignore is Because it Can Contain Secrets like Usernames and Passwords. An example .env file will be uploaded to the repo. Look at the .env for a bit more info.

### Error Handling

if an error happens when editing (Mac):

1. Go to the parent folder of this folder in FINDER
2. Right-click the folder and select "open terminal at folder"
3. Run this command: sudo chown -R "Your Username-Here" "Parent Folder"
<https://stackoverflow.com/questions/51674627/insufficient-permissions-in-vscode>

If you are on Windows, Linux, or another OS (I Don't Know, Use TempleOS If You Are Somehow A Programming God)
 P.S. If You Don't Know What It Is Google it.

## How is it strucuted?

here is the plan:

- any folders under the /src/api/ are routes with the api it self starting at /api
- normally routes would be defined inside the index.ts of each folder
  - other files such as users.ts or auth.ts hold different code like data fetching or middleware, not routes themselves

### Examples

/src/api (Folder)                        | /api (Route)
/src/api/dashboard/auth/ (Folder)        | /api/dashboard/auth/ (Route)
/src/api/public/ChainOfCommand/ (Folder) | /api/public/ChainOfCommand/ (Route)
you get the gist

### Exceptions

/ (Folder) | / (Route)
Any custom routes used for development purposes

## What in the world is the "xyz" folder

it contains examples or default code to use.
store shenanigans inside it

## Where do I start?

The index.ts is where the code will start running,
All your knowledge of NodeJS will transfer here.

.ts is Typescript aka Javascript with types

## TODO

migrate to nitro.js after this project is done.
