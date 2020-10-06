require('dotenv').config()

const Express = require("express");
const BodyParser = require("body-parser");
const CookieParser = require("cookie-parser");
const { logger, util } = require("./globals")

const app = Express();

app.use(BodyParser.json())
app.use(CookieParser())

util.scanFolderJs("./routes", (route) => {
    if(!route.router || !route.path) return
    app.use(route.path, route.router)
    logger.log(`Loaded route handler for ${route.path}`)
}).then(() => {
    // Do this after loading all routes, 404 handler
    app.use((_, res) => res.status(200).json({ status: "Working" }))
})

const listener = app.listen(process.env.PORT || 8888, () => logger.log(`Listening on ${listener.address().port}`))