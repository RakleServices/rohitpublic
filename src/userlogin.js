
const express = require('express');
const router = new express.Router();
const mysqlConnection = require("../helper/dbconfig");
const jwt = require('jsonwebtoken');

// basic_details_2
router.post('/userlogin1', (req, res) => {
    var phone = req.body.bphone;
    var psw = req.body.password;
    res.type('json')

    mysqlConnection.query('SELECT * FROM branch WHERE bphone =? and password =?', [phone, psw], (err, rows, fields) => {
        if (!err)
            if (rows.length > 0) {
                const token = jwt.sign({ id: rows[0].id }, 'the-super-strong-secrect', { expiresIn: '1h' });
                console.log(rows);
                res.send(JSON.stringify({ rowsCount: rows.length, Status: "Logged In", data: rows, token: token }));
            } else {
                res.send(JSON.stringify({ res: 'user name or password is wrong' }));
            }
        else
            res.send(JSON.stringify({ res: err }));

    });
});

module.exports = router;