const express = require('express');
const router = new express.Router();
const mysqlConnection = require("../helper/dbconfig");
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');


const stoarge = multer.diskStorage({
    destination: './owner/image/',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }


})

const upload = multer({
    storage: stoarge
})



router.get('/owner', (req, res) => {
    res.type('json')
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
    ) {
        return res.send(JSON.stringify({ status: "Error", data: "Please provide token" }));
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'the-super-strong-secrect', (err, decoded) => {
        if(err){
            return res.send(JSON.stringify({ status: "Error", data: "Invalid token provided" }));
        }
    });
    console.log(decoded.id);
    mysqlConnection.query('SELECT * FROM marketingexecutive WHERE id =?', decoded.id, (error, output, field) => {

        if (!error) {
            mysqlConnection.query('Select * from owner', (err, rows, fields) => {

                if (!err)
                    if (rows && rows.length) {
                        res.send(JSON.stringify({ rowsCount: rows.length, data: rows }));
                    } else {
                        res.send(JSON.stringify({ data: "No Rows Found" }));
                    }
                else
                    res.send(JSON.stringify({ data: "error" }));

            });
        }

        else {
            res.send(JSON.stringify({
                status: "Error", data: "Invalid Token provided"
            }));
        }

    });

});


// Get an Employees
router.get('/owner/:id', (req, res) => {
    mysqlConnection.query('Select * from owner where id = ?', [req.params.id], (err, rows, fields) => {
        res.type('json')

        if (!err)
            if (rows && rows.length) {
                res.send(JSON.stringify({ rowsCount: rows.length, data: rows }));
            } else {
                res.send(JSON.stringify({ data: "Invalid owner Id, Please try again" }));
            }
        else
            res.send(JSON.stringify({ data: "error" }));

    });
});

// Delete an Employees
router.delete('/owner/:id', (req, res) => {
    mysqlConnection.query('delete from owner where bid = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Owner Deleted Succesfully');
        else
            res.send('Something went wrong! Please try again..');

    });
});

// Insert an basic_details
router.post('/owner', upload.single('image'), (req, res) => {
    const data = { name: req.body.name, image: req.file.filename, phone: req.body.phone, email: req.body.email, linkedinprofile: req.body.linkedinprofile, facebookprofie: req.body.facebookprofie, instagramprofile: req.body.instagramprofile, twitterprofile: req.body.twitterprofile, bid: req.body.bid };
    console.log(data);
    mysqlConnection.query('insert into owner set?', [data], (err, rows, fields) => {
        res.type('json')

        if (!err)
            res.send(JSON.stringify({ res: 'success' }));
        else
            res.send(JSON.stringify({ res: 'error' }));

    });
});


// Insert an basic_details




module.exports = router;