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
        const {id} = req.params;
         con.query('SELECT * FROM users WHERE id = ? ', [id], (err, result)=>{
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

router.put('/:id', (req, res)=> {
    try{
        const {id} = req.params;
        const {email, password, full_name, billing_address, default_shipping_address, country, phone} = req.body;

        con.query('UPDATE users SET email = ?, password = ?, full_name = ?, billing_address = ?, default_shipping_address = ?, country = ?, phone = ? WHERE id = ?', [email, password, full_name, billing_address, default_shipping_address, country, phone ,id], (err, result)=>{
            if(err) throw err;
            res.send(result);
        })
    } catch(error) {
        console.log(error);
        res.status(400).send(error)
    }
});

router.delete('/:id', (req, res)=> {
    try {
        const{id} = req.params;
        con.query('DELETE FROM users WHERE id = ?', [id], (err, results)=> {
            if(err) throw err;
            res.send(results);
        })
    } catch (error){
        console.log(error);
        res.status(400).send(error);
    }
})


module.exports = router;