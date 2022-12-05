const express = require('express')
require('./db/connect')
const cors = require('cors')

//routes
const loginRouter = require('./routes/loginRoutes')
const adminRoutes = require('./routes/adminRoutes')
const studentRouter = require('./routes/studentRoutes')

const app = express()
app.use(express.json())

app.use(cors())

//consuming routers
app.use(loginRouter)
app.use(adminRoutes)
app.use(studentRouter)

const port = 4000

app.listen(port, () => {
   console.log(`Server is running on port ${port}`)
})