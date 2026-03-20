const express = require('express')
const cors = require('cors')
const fs = require('fs')

const app = express()

app.use(cors())
app.use(express.json())

const raceRoutes = require('./routes/race')
app.use('/',raceRoutes)

app.listen(3000, () => {
    console.log('Server is running at 3000')
})