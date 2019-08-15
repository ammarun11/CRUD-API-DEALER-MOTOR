const express = require('express')
const app = express()
require("./db") //database connection

/**
 * import routes files
 */

const motor_routes = require("./routes/motors")
const user_routes = require("./routes/users")


// for parsing application /x-www-form-urlencodded
app.use(express.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    return res.send('Welcome to the eginning of nothingsss')
})


/**
 * Set routes imported
 */
app.use("/motor", motor_routes)
app.use("/user",user_routes)

app.listen(3302, () => {
    console.log(`Example app listening on port 3302`)
})