const express = require("express"),
    bodyParser = require("body-parser"),
    data = require('./data/cans.json'),
    app = express(),
    PORT = 8081;

app.use(bodyParser.json());

app.get('/api/allProduct', (req, res) => {
    res.send(data)
});
// app.put('/api/editItem/:id', controller.editItem);
// app.post('/api/addItem', controller.addItem);
// app.delete('/api/deleteItem/:id', controller.deleteItem);
// app.get('/api/search', controller.searchItem)

app.listen(PORT, () => (console.log(`Listening on port ${PORT}`)));