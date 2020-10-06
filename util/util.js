const fs = require("fs").promises;
const path = require("path");

module.exports = {

    /**
     * 
     * @param {String} rootPath 
     * @param {Function} cb 
     */
    scanFolderJs: async function(rootPath, cb) {
        await fs.readdir(rootPath).then(async files => {
            for(let file of files) {
                const stat = await fs.stat(`${rootPath}/${file}`)
                if(stat.isDirectory()) {
                    return this.scanFolderJs(`${rootPath}/${file}`, cb);
                } else if(file.endsWith(".js")) {
                    cb(require(path.resolve(`${rootPath}/${file}`)));
                }
            }
        }).catch(err => {
            console.error(err)
        })
    },

    /**
     * 
     * @returns {boolean}
     * @param {Object} data
     * @param {String} props
     */
    dataContains: function(data, ...props) {
        for(prop of props) if(!data.hasOwnProperty(prop)) return false
        
        return true;
    },

    /**
     * 
     * @param {Express.Response} res 
     * @param {Object} data
     */
    sendBadRequest: function(res, data) {
        console.log(data);
        res.status(400).json({
            status: 400,
            ...data
        })
    },

    /**
     * 
     * @param {Express.Response} res 
     * @param {Object} data
     */
    sendUnauthorized: function(res, data) {
        res.status(401).json({
            status: 401,
            ...data
        })
    },

    /**
     * 
     * @param {Express.Response} res
     * @param {Object} data
     */
    sendOk: function(res, data) {
        res.status(200).json({
            status: 200,
            ...data
        })
    }

}