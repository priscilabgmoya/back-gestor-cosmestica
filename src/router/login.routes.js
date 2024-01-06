const {Router} = require ('express');
const {login}  = require("../controller/login.controller")
const router = Router(); 

router.post('/api/V1/login',login);

module.exports = router; 