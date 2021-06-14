const express = require('express');
const router = express.Router();
const TestController = require('../controllers/testController');
// const UsersService = require('../services/users.service');

// router.use(async (req, res, next) => {
//     let data = await UsersService.getUsers()

//     if (data)
//     {
//         req.users = data
//         next()
//     } else
//         return res
//             .status(500)
//             .send({ message: 'Error while getting users' })
// })

router
    .route('/ping')
    .get(TestController.pingGET)
    .post(TestController.pingPOST)
    .put(TestController.pingPUT)
    .delete(TestController.pingDELETE);

module.exports = router;