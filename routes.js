const express = require('express');
const router = express.Router();
const car_controller = require('./controller/car');
const user_controller = require("./controller/user")
//import
/* GET home page. */
function middleware(req, res, next) {
    // document.cookie = "username=John Doe";
    // authentication middleware
    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
    // Verify login and password are set and correct
    //todo: here get user based on login, and if everything matches good to go
    user_controller.get_user(login).exec(function (err, user) {
        if (login && password && login === user.email && password === user.password) {
            // Access granted...
            return next()
        }
        // Access denied...
        //res.set('WWW-Authenticate', 'Basic realm="401"')
        //res.status(401).send('Authentication required.') // custom message
        return next()
    })
}
router.get('/', middleware, function (req, res, next) {
    res.json({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO ANGULAR' });
});

// routing

router.post('/car', middleware, car_controller.car_get_all);                // get all
router.get('/car/:id', middleware, car_controller.car_details);             // get by id
router.post('/car/add', middleware, car_controller.car_create);             // add
router.put('/car/:id', middleware, car_controller.car_update);              // update by id
router.post('/car/delete/:id', middleware, car_controller.car_delete);     // delete by id 

module.exports = router;