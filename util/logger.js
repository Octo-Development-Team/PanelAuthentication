const chalk = require('chalk')

module.exports = {

    /** ######### LOGGER ######### */

    /**
     * @param {string} message
     * @returns {void}
     */
    log: function(message) {
        process.stdout.write(`${chalk.blue(`[${this.getFormattedDate()}]`)} ${chalk.green(`[LOG]`)} ${chalk.white(message)}\n`)
    },

    /**
     * @param {string} message
     * @returns {void}
     */
    error: function(message) {
        process.stdout.write(message.split('\n').map(errorLine => 
                `${chalk.blue(`[${this.getFormattedDate()}]`)} ${chalk.red(`[ERR] ${errorLine}`)}`
            ).join('\n')
        )
    },

    /**
     * @param {Date?} date
     * @returns {string}
     */
    getFormattedDate: function(date = new Date()) {
        return date.toISOString()
            .replace(/T/, ' ')
            .replace(/\..+/, '')
    },

}