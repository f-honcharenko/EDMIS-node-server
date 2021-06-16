//REQUIRES
const express = require('express');
const cors = require('cors');
const config = require('config');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const mongoose = require('mongoose');
//REQUIRES

const app = express();
const host = config.get("express.ip");
const port = config.get("express.port");

mongoose.connect(config.mongo.link, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    poolSize: 4
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/api', routes);

app.use(function (req, res, next) {
    return res.status(404).send("Not Found :(");
});

app.listen(port, host, () => {
    console.log(`Server listens http://${host}:${port}`)
});