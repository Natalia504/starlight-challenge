const express = require("express"),
    bodyParser = require("body-parser"),
    data = require('./data/cans.json'),
    app = express(),
    PORT = 8081;

app.use(bodyParser.json());


app.get('/api/allProducts', (req, res) => {
    res.send(data)
});

app.get('/api/found/:input', (req, res) => {
    let foundData = data.filter(e => {
        return e.size == req.params.input
    })
    res.send(foundData)
})

app.get('/api/item/:id', (req, res) => {
    let itemId = data.filter(e => {
        return e.id == req.params.id;
    })
    res.send(itemId)
})


app.listen(PORT, () => (console.log(`Listening on port ${PORT}`)));