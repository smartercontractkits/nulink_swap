const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const public = path.join(__dirname, 'public')
const Config = require('./config')

app.use(express.static('public'))
app.get('/', (req, res) => res.sendFile(path.join(public + '/index.html')))


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))