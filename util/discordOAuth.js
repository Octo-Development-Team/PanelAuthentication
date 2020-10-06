const fetch = require("node-fetch");
const qs = require("qs");
const { discordOAuthData } = require("../constants");
const { dataContains } = require("../util/util")

/**
 * @typedef {Object} codeData
 * @property {String} access_token
 * @property {String} token_type
 * @property {Number} expires_in
 * @property {String} refresh_token
 * @property {String} scope
 */

 /**
 * @typedef {Object} partialUser
 * @property {String} id
 * @property {String} username
 * @property {String} avatar
 * @property {String} discriminator
 * @property {String} public_flags
 * @property {String} flags
 * @property {String} locale
 * @property {boolean} mfa_enabled
 * @property {number} premium_type
 */

module.exports = {

    /* OAuth Process */
    /**
     * @returns {Promise<codeData>}
     * @param {string} code Code returned by discord oauth
     */
    resolveCode: function(code) {
        return new Promise((resolve, reject) => {
            fetch(discordOAuthData.tokenExchangeUrl, {
                method: "POST",
                body: qs.stringify({
                    "client_id": discordOAuthData.clientId,
                    "client_secret": discordOAuthData.clientSecret,
                    "grant_type": "authorization_code",
                    "code": code,
                    "redirect_uri": discordOAuthData.redirectUrl,
                    "scope:": discordOAuthData.scopes.join(" ")
                }),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => res.json()).then(res => {
                if(!dataContains(res, "access_token", "token_type", "expires_in", "refresh_token", "scope")) reject("Malformed OAuth Response")

                resolve(res);
            })
        })
    },

    /* User Data */
    /**
     * @param {String} token
     * @param {String} token_type
     * @returns {Promise<partialUser>}
     */
    resolveUserData: function(token, token_type) {
        return new Promise(resolve => {
            fetch(`${discordOAuthData.discordAPIBaseURL}/users/@me`, {
                method: "GET",
                headers: {
                    "Authorization": `${token_type} ${token}`
                }
            }).then(res => res.json()).then(res => {
                resolve(res);
            })
        })
    }

}