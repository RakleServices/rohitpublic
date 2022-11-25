const express = require('express');
const router = new express.Router();
const mysqlConnection = require("../helper/dbconfig");
const otpGenerator = require('otp-generator');
const { json } = require('body-parser');

 


router.post('/userReg',  (req, res) => {
          const data = req.body;
          console.log(data);
          const otp1 = '1234';
          var otp = data.otp;
          mysqlConnection.query('insert into user_auth set?', data, (err, rows, fields) => {
              res.type('json')
      
              if (!err){
                mysqlConnection.query("select * from user_auth where phone=? ", [data.phone],(err1, rows, fields) => {
                    if(!err1){

                    mysqlConnection.query('update user_auth set otp =? where phone = ?', [otp1, [data.phone]], (err2, rows, fields) => {
                        if(!err2){
                            res.send(JSON.stringify({ data: true, otp : otp1 }));
                        }
                        else{
                            res.send(JSON.stringify({ data: false, res:err }));
                        }
                        
                    })
                    }
                } )
              }
              
                
                  
              else
                res.send(JSON.stringify({ res: err }));
      
          });
      });

      router.post('/verify_otp', (req, res) =>{
        var otp = req.body.otp;
        var phone = req.body.phone;
        mysqlConnection.query("select * from user_auth where otp = ? and phone =? ", [otp, phone], (err, rows, fields) => {
            if(!err){
                if(rows.length >=1){
                    res.send(JSON.stringify({res : true, data:"success"}))
                }
                else
                res.send(JSON.stringify({res : false, data:"error"}));
            }
            else
                res.send(JSON.stringify({res : false, data:"error"}));
            
        })
      })
      router.post('/userLogin', (req, res) =>{
        
        var phone = req.body.phone;
        var password = req.body.password;
        mysqlConnection.query(`SELECT * FROM user_auth WHERE phone=? and password=? and isactive='true'`, [phone, password], (err, rows, fields) => {
            if(!err){
                console.log(phone, password);
                console.log(rows);
                if(rows.length >=1){
                    // console.log()
                    res.send(JSON.stringify({data : true, res:rows}))
                }
                else
                res.send(JSON.stringify({data:false, res:err}));
            }
            else
                res.send(JSON.stringify({data:false, res:err, erre:"erre"}));
            
        })
      })

      // Get all Catagory
router.get('/nilamiUser', (req, res) => {
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
    mysqlConnection.query('Select * from user_auth', (err, rows, fields) => {
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

    router.post('/updateNilamiuser', (req, res) =>{
        var isActive = req.body.isActive;
        var phone = req.body.phone;
        
        mysqlConnection.query(`update user_auth set isActive = ? where phone = ?`, [isActive, phone], (err, rows, fields) => {
            if(!err){
                res.send(JSON.stringify({data : true, sts:"success"}))
            }
            else
                res.send(JSON.stringify({data:false, sts:"error"}));
            
        })
      });

      router.get('/subscriptionPlan', (req, res) => {
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
        mysqlConnection.query('Select * from subcription_plan', (err, rows, fields) => {
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
      router.post('/subscriptionPlan',  (req, res) => {
        const data = req.body;
        console.log(data);
        mysqlConnection.query('select * from subcription_plan where planid = ?', [data.planid], (err, rows, fields) => {
        if(!err){
            if(rows.length>=1){
                mysqlConnection.query('update subcription_plan set ? where planid =  ?', [data,data.planid ], (err1, rows1, fields) => {
                    if(!err1){
                        res.send(JSON.stringify({ res: true }));
                    }
                    else{
                        res.send(JSON.stringify({ res: err}));
                    }
            })
            
        }
        else{
            mysqlConnection.query('insert into subcription_plan set?', data, (err, rows, fields) => {
                res.type('json')
        
                if (!err)
                    res.send(JSON.stringify({ res: 'success' }));
                else
                    res.send(JSON.stringify({ res: err}));
        
            });     
        }
    }
    });
    });

    router.delete('/subscriptionPlan/:id', (req, res) => {
        res.type('json')
        console.log(req.params.id);
        mysqlConnection.query('delete from subcription_plan where planid =?', [req.params.id], (err, rows, fields) => {
            if(!err){
                res.send("Subscription Plan  Deleted Succcessfully");
            }
            else{
                res.send("Subscription Plan not Deleted Succcessfully");
            }
        });
        });
        router.post('/contact_us',  (req, res) => {
            const data = req.body;
            console.log(data);
            mysqlConnection.query('insert into contact_us set?', data, (err, rows, fields) => {
                res.type('json')
        
                if (!err)
                    res.send(JSON.stringify({ data: true }));
                else
                    res.send(JSON.stringify({ data :false }));
        
            });
        });

        router.get('/contact_us', (req, res) => {
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
            mysqlConnection.query('Select * from contact_us', (err, rows, fields) => {
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
    

      

module.exports = router;