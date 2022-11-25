const express = require('express');
const router = new express.Router();
const mysqlConnection = require("../helper/dbconfig");

const multer = require('multer');
const path = require('path');


const stoarge = multer.diskStorage({
    destination: './marketingExecutive/image/',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }


})

const upload = multer({
    storage: stoarge
})



router.get('/marketingExecutive', (req, res) => {
    mysqlConnection.query('Select * from marketingexecutive', (err, rows, fields) => {
        res.type('json')
        if (!err)
            if (rows && rows.length) {
                res.send(JSON.stringify({ rowsCount: rows.length, data: rows }));
            } else {
                res.send(JSON.stringify({ data: "No Rows Found" }));
            }
        else
            res.send(JSON.stringify({ data: "error" }));

    });
});


// Get an Employees
router.get('/marketingExecutive/:id', (req, res) => {
    mysqlConnection.query('Select * from marketingexecutive where id = ?', [req.params.id], (err, rows, fields) => {
        res.type('json')

        if (!err)
            if (rows && rows.length) {
                res.send(JSON.stringify({ rowsCount: rows.length, data: rows }));
            } else {
                res.send(JSON.stringify({ data: "Invalid User Id, Please try again" }));
            }
        else
            res.send(JSON.stringify({ data: "error" }));

    });
});

// Delete an Employees
router.delete('/marketingexecutive/:id', (req, res) => {
    mysqlConnection.query('delete from marketingexecutive where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Marketing Executive Deleted Succesfully');
        else
            res.send('Something went wrong! Please try again..');

    });
});

// Insert an basic_details
router.post('/marketingexecutive', upload.single('photo'), (req, res) => {
    console.log("inside function");
    const data = { name: req.body.name, phone: req.body.phone, email: req.body.email, photo: req.file.filename, aadharNo: req.body.aadharNo, panno: req.body.panno, bankName: req.body.bankName, accountNo: req.body.accountNo, ifscCode: req.body.ifscCode, address: req.body.address, transdate: req.body.transdate, password: req.body.password };
    console.log(data);
    mysqlConnection.query('insert into marketingexecutive set ?', [data], (err, rows, fields) => {
        res.type('json')

        if (!err)
            res.send(JSON.stringify({ res: 'success' }));
        else
            res.send(JSON.stringify({ res: 'error' }));

    });
});



module.exports = router;