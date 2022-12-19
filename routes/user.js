const express = require('express')
const router = express.Router()

const {
    // getUser, 
    // addUser,
    userLogin,
    userRegister,
    getPlayer,
    getIndexValue,
    setIndexValue,
    userCardCreate,
    getUserCardDetails,
    saveWinnerName,
    saveWinnerValue,

} = require('../controller/user')
const validateToken = require('../middleware/authHandler')

// router.route('/card/details').get(getUser).post(validateToken,addUser)
router.route('/login').post(userLogin)
router.route('/index-value/:playerName').get(validateToken,getIndexValue)
router.route('/index-value').post(validateToken,setIndexValue)
router.route('/get-player').post(validateToken,getPlayer)
router.route('/register').post(userRegister)
router.route('/card').post(userCardCreate)
router.route('/card/details').get(getUserCardDetails)
router.route('/card/winner').post(saveWinnerName)
router.route('/card/winnerValue').post(saveWinnerValue)
// router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser)

module.exports = router