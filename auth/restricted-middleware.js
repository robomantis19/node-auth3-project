const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

const { jwtSecret } = require('../config/secrets.js'); 
const Users = require('../users/user-model.js');

module.exports = (req, res, next) => { 
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, jwtSecret, (error, decodedToken) => { 
            if(error){
                res.status(401).json({you: 'You shall not pass!'})
            }else{
                console.log('decodedToken', decodedToken)
                req.user = decodedToken.user;
                next();
            }
        });
    }else{
        res.status(401).json({you: 'shall not pass'});
    }
}

