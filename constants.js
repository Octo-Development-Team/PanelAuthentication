module.exports = {

    discordOAuthData: {
        loginUrl: "https://discord.com/api/oauth2/authorize?client_id=750145544093171802&redirect_uri=http%3A%2F%2Flocalhost%3A8888%2Fauth%2Fcallback&response_type=code&scope=identify%20guilds",
        tokenExchangeUrl: "https://discord.com/api/oauth2/token",
        discordAPIBaseURL: "https://discord.com/api/v8",
        scopes: ["identify", "guilds"]
    }

}
