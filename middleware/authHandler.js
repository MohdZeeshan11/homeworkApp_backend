const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async(req,res,next)=>{
    let token;

    let authHeader = req.headers.Authorization || req.headers.authorization

    // if(authHeader && authHeader.startsWith('Bearer')){
    //     token = authHeader.split(" ")[1];
    // console.log('authHeader = ',authHeader);
        if(authHeader){
        //     token = authHeader.split(" ")[1];
        token = authHeader
        jwt.verify(token,process.env.ACCESS_TOKEN_SECERT,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("user is not authorized");
            }
            // console.log("decoded",decoded)
            // req.user = decoded.user
            // next()
        })
        if(!token){
            res.status(401);
                throw new Error("user is not authorized or token missing");
        }
        next()
    }
})

module.exports = validateToken;



// export const authUser = async (req, res, next) => {
//     const { authorization: token } = req.headers;
//     const user = getUserFromAccessToken(token);
//     if(user.isApiUser){
//         throw new UnAuthenticatedUser(401, "Authentication failed. Api user not allowed.", "unauthenticated-user" );
//     }
//     if(!user){
//         throw new UnAuthenticatedUser(401, "Authentication failed. Try logging in again.", "unauthenticated-user" );
//     } else {
//         req.user = user;
//     }
//     next();
// };


// export const getUserFromAccessToken = (accessToken) => {
//     let data;
//     try {
//         const token = jwt.verify(accessToken, process.env.JWT_SIGNING_KEY);
//         data = token.data;
//     } catch (e) {
//         console.error("JWT Verification failed.")
//     }
//     return data;
// };