# mfbot

written in typescript using discord.js and sapphire.js

## self-hosting

before you self-host the bot you will need:

-   node version 16.9.0 or above
-   yarn (or npm, pnpm)

download the code as a .zip file and extract it as a folder or enter this command to clone the repo:

```
git clone https://github.com/lumixing/mfbot
```

open a terminal to the folder and install all the packages using:

```
yarn
```

or

```
npm i
```

or

```
pnpm i
```

go to `src/` folder and create a file named `.env.local` and write inside it:

```
DISCORD_TOKEN=
OWNERS=
```

-   after the `DISCORD_TOKEN=` paste your bot token (from https://discord.com/developers/applications)
-   after the `OWNERS=` paste your user id and other developers' ids seperated by a comma who will have access to developer commands you create
    -   to copy an id of a user in discord enable developer mode (Settings > Advanced), right click a user and click `Copy ID`

after that you are ready to run the bot

first you have to build your typescript files into javascript files by using:

```
yarn run build
```

or

```
npm run build
```

or

```
pnpm run build
```

this will create a folder named `dist` which contains the compiled javascript required to run the bot

run the bot using:

```
yarn run start
```

or

```
npm run start
```

or

```
pnpm run start
```
