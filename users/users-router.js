const router = require('express').Router();
const Users = require('./user-model.js'); 
const restricted = require('../auth/restricted-middleware.js'); 

router.get('/', restricted, whichDept('finance'), (req, res) => { 
    console.log('dept', req.user[0].departments)
    Users.find(`${req.user[0].departments}`)
    .then(users => { 
        res.json({users})
    })
    .catch(err => { 
        res.status(500).json({errorMessage: 'cannot get user data'})
    })
})
function whichDept(dept){
    return function(req, res, next){
        console.log('req.user:', req.user[0].departments);
        if(req.user && req.user[0].departments && req.user[0].departments.toLowerCase() === dept){
            next();
        }else if(req.user && req.user[0].departments && req.user[0].departments.toLowerCase() === 'sales'){
            router.get('/', restricted, (req, res) => { 
                Users.findSales()
                .then(users => { 
                    res.json({users})
                })
                .catch(err => { 
                    res.status(500).json({errorMessage: 'cannot get user data'})
                })
            })
            
            next();
           
            
        }else if(req.user && req.user[0].departments && req.user[0].departments.toLowerCase() === 'general'){
            router.get('/', restricted, (req, res) => { 
                Users.findGen()
                .then(users => { 
                    res.json({users})
                })
                .catch(err => { 
                    res.status(500).json({errorMessage: 'cannot get user data'})
                })
            })
            next();
           
        }else{
            res.status(403).json({message: 'wrong department'})
        }
    }
}


module.exports = router;