const router = require('express').Router();
const Users = require('./user-model.js'); 
const restricted = require('../auth/restricted-middleware.js'); 

router.get('/', restricted, (req, res) => { 
    Users.find()
    .then(users => { 
        res.json({users})
    })
    .catch(err => { 
        res.status(500).json({errorMessage: 'cannot get user data'})
    })
})
function whichDept(dept){
    return function(req, res, next){
        if(req.user && req.user.departments && req.user.departments.toLowerCase() === dept){
            next();
        // }else if(req.user && req.user.dept && req.user.dept.toLowerCase() === 'sales'){
        //     router.get('/', restricted, (req, res) => { 
        //         Users.findSales()
        //         .then(users => { 
        //             res.json({users})
        //         })
        //         .catch(err => { 
        //             res.status(500).json({errorMessage: 'cannot get user data'})
        //         })
        //     })
            
        // }else if(req.user && req.user.dept && req.user.dept.toLowerCase() === 'general'){
        //     router.get('/', restricted, (req, res) => { 
        //         Users.findGen()
        //         .then(users => { 
        //             res.json({users})
        //         })
        //         .catch(err => { 
        //             res.status(500).json({errorMessage: 'cannot get user data'})
        //         })
        //     })
        }else{
            res.status(403).json({message: 'wrong department'})
        }
    }
}


module.exports = router;