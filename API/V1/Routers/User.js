
const router = require('express').Router();

const {
    GetAllUsers,
    GetUserByID,
    AddUser,
    UpdateUserByID,
    DeleteUserByID,
    Register,
    Login
}= require('../Controllers/User');

router.get('/',GetAllUsers);
router.get('/:id',GetUserByID);
router.post('/',AddUser);
router.patch('/:id',UpdateUserByID);
router.delete('/:id',DeleteUserByID);
router.post('/register',Register);
router.post('/login',Login);

module.exports = router;