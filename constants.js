module.exports = {

    discordOAuthData: {
        loginUrl: "https://discord.com/api/oauth2/authorize?client_id=750145544093171802&redirect_uri=http%3A%2F%2Flocalhost%3A8888%2Fauth%2Fcallback&response_type=code&scope=identify%20guilds",
        tokenExchangeUrl: "https://discord.com/api/oauth2/token",
        discordAPIBaseURL: "https://discord.com/api/v8",
        redirectUrl: "http://localhost:8888/auth/callback",
        clientId: "750145544093171802",
        clientSecret: "FWad33mbP1W24yZK71KDf2uk1ufE2W44",
        scopes: ["identify", "guilds"]
    },

    panelData: {
        panelUrl: "http://localhost:8888/auth/panel"
    },

    cookieData: {
        domain: "localhost",
        hostOnly: true,
        secure: false,
        session: false,
        sameSite: "lax"
    }

}