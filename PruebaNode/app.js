const express = require('express');
const { infoTransformer } = require('./src/controller');

const app = express()
const port = 5000

app.get('/', async(req, res) => {
    res.json(await infoTransformer());
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})