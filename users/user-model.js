const db = require('../database/db.config.js');

module.exports = { 
    add, 
    find, 
    findBy, 
    findById, 
    findSales,
    findGen, 
}

function find(){
    return db('users').select('id', 'username', 'password','departments')
    .where('departments', 'finance')
}
function findSales(){
    return db('users').select('id', 'username', 'password','departments')
    .where('departments' , 'sales')
}
function findGen(){
    return db('users').select('id', 'username', 'password','departments')
    .where('departments' , 'general')
}

function findBy(input){ 
    return db('users').where(input); 
}

async function add(name){
    const [id] = await db('users').insert(name); 
    
    return findById(id);
}

function findById(id){
    return db('users').select('id','username', 'password')
    .where({id})
    .first(); 
}