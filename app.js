//REQUIRES
const express = require('express');
const cors = require('cors');
const config = require('config');
const bodyParser = require('body-parser');
const routes = require('./routes/index')
//REQUIRES

const app = express();
const host = config.get("express.ip");
const port = config.get("express.port");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes)

app.use(function (req, res, next) {
    return res.status(404).send("Not Found");
});

app.listen(port, host, () => {
    console.log(`Server listens http://${host}:${port}`)
});