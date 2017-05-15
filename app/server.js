const express = require('express')
const cors = require('cors')
const path = require('path')

let app = express()

app.use(cors({
    origin: ['localhost:3006']
}))

app.use(express.static(path.resolve(__dirname, '..', 'public')))

const server = app.listen(process.env.PORT || 3006, () => {
    console.log(`Express is listening to ${server.address().port}`)
});
