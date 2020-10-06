const jwt = require("jsonwebtoken");
const util = require("./util");

const time = "2d";

module.exports = {
    
    /**
     * 
     * @param {String} payload
     * @returns {String}
     */
    sign: function(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: time
        })
    },

    /**
     * 
     * @param {String} token
     * @returns {Object}
     */
    verify: function(token) {
        try {
            let verified = jwt.verify(token, process.env.JWT_SECRET)
            if(!verified || !util.dataContains(verified, "access_token", "token_type", "discordData")) return { valid: false }
            return { valid: true, ...verified }
        } catch (_) {
            return { valid: false }
        }
    }

}