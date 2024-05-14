
# Parlier-NJROTC's backend server

Welcome to the backend server source code
for now this server is for the ribbon system

## Setup

### Initializing Project

Since this project uses bun, run the command: sudo bun install
This will install all packages

If you are using node or deno some how, copy the code and package.json
Run the equivalant of sudo bun install (sudo npm install or what ever deno uses)
No idea how it will run so any errors, you try to figure them out.

Make sure to also download the Dashboard-Frontend and put it in here, don't worry it will be fine. After that go inside that folder and run: sudo bun install && sudo bun run build

### .env file tutorial

Look at the lines with `process.env.VARIABLE_NAME` these lines are fetched from the .env file. Bun Automatically reads these files to get the process.env.VARIABLES no need to import it. The reason why its in the gitignore is because it can contain secrets like usernames and passwords. An example .env file will be uploaded to the repo. Look at the .env for a bit more info.

### Error Handleing

if an error happens when editing (Mac):

1. go to the parent folder of this folder in FINDER
2. right click the folder and select "open terminal at folder"
3. run this command: sudo chown -R "Your Username-Here" "Parent Folder"
<https://stackoverflow.com/questions/51674627/insufficient-permissions-in-vscode>

If you are on windows, linux, or another os (idk templeOS if you somehow are a programming god)
google it

## Where do I start?

The index.ts, is where the code will start running,
all your knowledge of nodejs will transfer here.

.ts is typescript aka javascript with types

---
Saul you do gramar thing cuz you do u
