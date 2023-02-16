const express = require('express');
const router = express.Router();
const con = require('../lib/db_connection.js');

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })

router.get('/', (req, res) => {
    try {
        con.query('SELECT * FROM users', function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
        // res.status(200);
        // res.send("Welcome to the root URL of server")
});

router.get('/:id', (req, res,)=>{
    try{
        const {id} = req.body;
         con.query(`SELECT * FROM users WHERE id = ${id} `,[id], (err, result)=>{
            if(err) throw err;
            res.send(result);
         })
    } catch(error) {
        console.log(error);
        res.status(400).send(error);
    }
});


router.post('/', function(req, res,){
    try {
        const {email, password, full_name, billing_address, default_shipping_address, country, phone} = req.body;

        con.query('INSERT INTO users(email, password, full_name, billing_address, default_shipping_address, country, phone) VALUES (?, ?, ?, ?, ?, ?, ?)', [email, password, full_name, billing_address, default_shipping_address, country, phone], function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});


module.exports = router;