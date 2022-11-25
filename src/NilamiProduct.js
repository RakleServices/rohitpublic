const express = require('express');
const router = new express.Router();
const mysqlConnection = require("../helper/dbconfig");

router.get('/nilamidetailsASC/:id', (req, res) => {
          res.type('json')
          // if (
          //     !req.headers.authorization ||
          //     !req.headers.authorization.startsWith('Bearer') ||
          //     !req.headers.authorization.split(' ')[1]
          // ) {
          //     return res.send(JSON.stringify({ status: "Error", data: "Please provide token" }));
          // }
          // const theToken = req.headers.authorization.split(' ')[1];
          // const decoded = jwt.verify(theToken, 'the-super-strong-secrect', (err, decoded) => {
          //     if(err){
          //         return res.send(JSON.stringify({ status: "Error", data: "Invalid token provided" }));
          //     }
          //     console.log(decoded.id);
          mysqlConnection.query('SELECT nilami_product.phone, nilami_product.amount, nilami_product.productid, nilami_product.transdate, user_auth.name from nilami_product INNER join user_auth on nilami_product.phone = user_auth.phone where nilami_product.productid=? order by amount DESC',[req.params.id],(err, rows, fields) => {
              res.type('json')
              if (!err)
                  if (rows && rows.length) {
                      res.send(JSON.stringify({ rowsCount: rows.length, data: rows, res:true }));
                  } else {
                      res.send(JSON.stringify({ data: "No Rows Found", res:false }));
                  }
              else
                  res.send(JSON.stringify({ data: "error" , res:false}));
              });
          });


          router.get('/nilamidetailsDESC/:id', (req, res) => {
                    res.type('json')
                    // if (
                    //     !req.headers.authorization ||
                    //     !req.headers.authorization.startsWith('Bearer') ||
                    //     !req.headers.authorization.split(' ')[1]
                    // ) {
                    //     return res.send(JSON.stringify({ status: "Error", data: "Please provide token" }));
                    // }
                    // const theToken = req.headers.authorization.split(' ')[1];
                    // const decoded = jwt.verify(theToken, 'the-super-strong-secrect', (err, decoded) => {
                    //     if(err){
                    //         return res.send(JSON.stringify({ status: "Error", data: "Invalid token provided" }));
                    //     }
                    //     console.log(decoded.id);
                    mysqlConnection.query('SELECT nilami_product.phone, nilami_product.amount, nilami_product.productid, nilami_product.transdate, user_auth.name from nilami_product INNER join user_auth on nilami_product.phone = user_auth.phone where nilami_product.productid=? order by amount ASC',[req.params.id],(err, rows, fields) => {
                        res.type('json')
                        if (!err)
                            if (rows && rows.length) {
                                res.send(JSON.stringify({ rowsCount: rows.length, data: rows, res:true }));
                            } else {
                                res.send(JSON.stringify({ data: "No Rows Found", res:false }));
                            }
                        else
                            res.send(JSON.stringify({ data: "error" , res:false}));
                        });
                    });
                    router.get('/nilamidetailsDESCThree/:id', (req, res) => {
                        res.type('json')
                        // if (
                        //     !req.headers.authorization ||
                        //     !req.headers.authorization.startsWith('Bearer') ||
                        //     !req.headers.authorization.split(' ')[1]
                        // ) {
                        //     return res.send(JSON.stringify({ status: "Error", data: "Please provide token" }));
                        // }
                        // const theToken = req.headers.authorization.split(' ')[1];
                        // const decoded = jwt.verify(theToken, 'the-super-strong-secrect', (err, decoded) => {
                        //     if(err){
                        //         return res.send(JSON.stringify({ status: "Error", data: "Invalid token provided" }));
                        //     }
                        //     console.log(decoded.id);
                        mysqlConnection.query('SELECT nilami_product.phone, nilami_product.amount, nilami_product.productid, nilami_product.transdate, user_auth.name from nilami_product INNER join user_auth on nilami_product.phone = user_auth.phone where nilami_product.productid=? order by amount DESC limit 0,3',[req.params.id],(err, rows, fields) => {
                            res.type('json')
                            if (!err)
                                if (rows && rows.length) {
                                    res.send(JSON.stringify({ rowsCount: rows.length, data: rows, res:true }));
                                } else {
                                    res.send(JSON.stringify({ data: "No Rows Found", res:false }));
                                }
                            else
                                res.send(JSON.stringify({ data: "error" , res:false}));
                            });
                        });
          // Insert an Branch
router.post('/nilamiDetails',  (req, res) => {
    const data = req.body;
    console.log(data);
    mysqlConnection.query('insert into nilami_product set?', data, (err, rows, fields) => {
        res.type('json')

        if (!err)
            res.send(JSON.stringify({ data: 'success', res:true }));
        else
            {
                res.send(JSON.stringify({ res: 'error', res:false }));
                console.log(err);
            }

    }); 
});



module.exports = router;