const express = require("express"),
    bodyParser = require("body-parser"),
    data = require('./data/cans.json'),
    app = express(),
    PORT = 8081;

app.use(bodyParser.json());


app.get('/api/allProduct', (req, res) => {
    res.send(data)
});
app.get('/api/product/:id', (req, res) => {
    let currentData = data.filter((e) => {
        return e.id == req.params.id
    })
    res.send(currentData[0])
});
app.get('/api/found/:input', (req, res) => {
    let foundData = data.filter(e => {
        return e.size == req.params.input
    })
    
    res.send(foundData)
})


app.listen(PORT, () => (console.log(`Listening on port ${PORT}`)));