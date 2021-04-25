class TestController {
    async pingPOST(req, res) {
        console.log("Ping. POST.");
        return res.status(200).send({ message: 'Pong!' });
    }
    async pingGET(req, res) {
        console.log("Ping. GET.");
        return res.status(200);
    }
    async pingPUT(req, res) {
        console.log("Ping. PUT.");
        return res.status(200);
    }
    async pingDELETE(req, res) {
        console.log("Ping. DELETE.");
        return res.status(200);
    }
}

module.exports = new TestController()