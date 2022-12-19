const express = require('express')
const router = express.Router()

const {
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
router.route('/login').post(userLogin)
router.route('/index-value/:playerName').get(validateToken,getIndexValue)
router.route('/index-value').post(validateToken,setIndexValue)
router.route('/get-player').post(validateToken,getPlayer)
router.route('/register').post(userRegister)
router.route('/card').post(validateToken,userCardCreate)
router.route('/card/details').get(validateToken,getUserCardDetails)
router.route('/card/winner').post(validateToken,saveWinnerName)
router.route('/card/winnerValue').post(validateToken,saveWinnerValue)


module.exports = router