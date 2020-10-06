const router = require("express").Router()
const discordOAuth = require("../util/discordOAuth")
const { discordOAuthData, panelData, cookieData } = require("../constants")
const { dataContains, sendBadRequest, sendOk } = require("../globals").util;
const { sign } = require("../util/jwt");

router.get("/", (_, res) => {
    res.redirect(302, discordOAuthData.loginUrl);
})

router.get("/callback", async (req, res) => {
    const { code } = req.query;
    if(!code) return sendBadRequest(res, { error: "Invalid code." })

    discordOAuth.resolveCode(code).then(async data => {
        const discordData = await discordOAuth.resolveUserData(data.access_token, data.token_type);
        if(!discordData || !dataContains(discordData, "id", "username", "discriminator")) return sendBadRequest(res, { error: "Invalid User" });
        
        const { access_token, token_type } = data;
        const token = sign({ access_token, token_type, discordData });
        res.cookie('token', token, { ...cookieData, expires: new Date(Date.now() + 1.728e8) })
        res.redirect(302, panelData.panelUrl)
    }).catch(error => sendBadRequest(res, { error }));
})

// Temporary until we get the panel working
router.get("/panel", (req, res) => {
    sendOk(res, { cookies: req.cookies });
})

module.exports = {

    router,
    path: "/auth"

};