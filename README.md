# Octo Authentication Service

This handles authanticating the user to the panel

## Running
1. Pull code
2. Configure the app
3. `npm install`
4. `node .`

## Configuration

1. Edit the `config.json` file

    |Key|Description|
    |---|---|
    |panelUrl| The url where your panel frontend will be served |
    |discord.redirectUrl| The redirect URL set in the Development portal |
    |discord.clientId| Your bot's client is |
    |discord.clientSecret| Your bot's client secret |
    |cookie| General login cookie settings |


2. Rename `.env.example` to `.env`
3. Change the JWT_KEY to something secure