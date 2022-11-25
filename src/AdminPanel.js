const express = require('express');
const router = new express.Router();
const mysqlConnection = require("../helper/dbconfig");
const jwt = require('jsonwebtoken');


const multer = require('multer');
const path = require('path');



// Branch Details

// Get all branch
router.get('/branch', (req, res) => {
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
    mysqlConnection.query('Select * from branch', (err, rows, fields) => {
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
// });


// Get an Branch
router.get('/branch/:id', (req, res) => {
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
        console.log(decoded.id);
        mysqlConnection.query('Select * from branch where bid = ?', [req.params.id], (err, rows, fields) => {
            res.type('json')
    
            if (!err)
                if (rows && rows.length) {
                    res.send(JSON.stringify({ rowsCount: rows.length, data: rows }));
                } else {
                    res.send(JSON.stringify({ data: "Invalid Branch Id, Please try again" }));
                }
            else
                res.send(JSON.stringify({ data: "error" }));
    
        });
    });
    
    
    
});

// Delete an Branch
router.delete('/branch/:id', (req, res) => {
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
        console.log(decoded.id);
    mysqlConnection.query('delete from branch where bid = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send({res:'Branch Deleted Succesfully'});
        else
            res.send('Something went wrong! Please try again..');

    });
});
});

const bbstorage = multer.diskStorage({
    destination: './brimage/',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }


})

const bbupload = multer({
    storage: bbstorage
})

// Insert an Branch
router.post('/branch',bbupload.single('bimage'),  (req, res) => {
    const data = { bname: req.body.bname, blocation:req.body.blocation, bphone:req.body.bphone, bemail:req.body.bemail, bwhatsapp:req.body.bwhatsapp, transdate:req.body.transdate, password:req.body.password,bimage:req.file.filename,role:req.body.role };
    console.log(data);
    mysqlConnection.query('select * from branch where bid = ?', [data.bid], (err, rows, fields) => {
        if(!err){
            if(rows.length>=1){
                mysqlConnection.query('update branch set ? where bid =  ?', [data,data.bid ], (err1, rows1, fields) => {
                    if(!err1){
                        res.send("Branch  Updated Succcessfully");
                    }
                    else{
                        res.send("Branch not Updated Succcessfully");
                    }
            })
            
        }
        else{
            mysqlConnection.query('insert into branch set?', [data], (err, rows, fields) => {
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

// Branch Finish


// Catagory Start
// Get all Catagory
router.get('/catagory', (req, res) => {
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
    mysqlConnection.query('Select * from catagory', (err, rows, fields) => {
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
// });


router.get('/tagByCat/:id', (req, res) => {
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
    mysqlConnection.query('SELECT product.pid,product.prodimage, product.pname, product.pdesc, product.pprice, product.transdate, product.status, catagory.catname, branch.bphone FROM product INNER JOIN catagory ON product.catid = catagory.catid INNER JOIN branch on catagory.bid = branch.bid where catagory.catid =?',[req.params.id], (err, rows, fields) => {
        res.type('json')
        if (!err)
            if (rows && rows.length) {
                console.log(rows[0].pid);
                res.send(JSON.stringify({ rowsCount: rows.length, data: rows, res:true }));
            } else {
                res.send(JSON.stringify({ data: "No Rows Found", res:false }));
            }
        else
            res.send(JSON.stringify({ data: "error" , res:false}));
        });
    });
// });



// Get an Catagory
router.get('/catagory/:id', (req, res) => {
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
        console.log(decoded.id);
    mysqlConnection.query('Select * from catagory where catid = ?', [req.params.id], (err, rows, fields) => {
        res.type('json')

        if (!err)
            if (rows && rows.length) {
                res.send(JSON.stringify({ rowsCount: rows.length, data: rows }));
            } else {
                res.send(JSON.stringify({ data: "Invalid catagory Id, Please try again" }));
            }
        else
            res.send(JSON.stringify({ data: "error" }));
        });
    });
});

// Delete an catagory
router.delete('/catagory/:id', (req, res) => {
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
        console.log(decoded.id);
    mysqlConnection.query('delete from catagory where catid = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(JSON.stringify({data:'Catagory Deleted Succesfully'}));
        else
            res.send(JSON.stringify({data:'Catagory not Deleted Succesfully'}));
    });
    });
});

// Insert an catagory

const stoarge = multer.diskStorage({
    destination: './catimage/',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }


})

const upload = multer({
    storage: stoarge
})


router.post('/catagory',upload.single('catimage'),  (req, res) => {
    const data = { catid:req.body.catid,catname: req.body.catname, catimage: req.file.filename, bid:req.body.bid };
    console.log(data);
    mysqlConnection.query('select * from catagory where catid = ?', [data.catid], (err, rows, fields) => {
        if(!err){
            if(rows.length>=1){
                mysqlConnection.query('update catagory set ? where catid =  ?', [data,data.catid ], (err1, rows1, fields) => {
                    if(!err1){
                        res.send("Catagory  Updated Succcessfully");
                    }
                    else{
                        res.send("Catagory not Updated Succcessfully");
                    }
            })
            
        }
        else{
            mysqlConnection.query('insert into catagory set?', [data], (err, rows, fields) => {
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

// Catagory Finish


// Banner Start
router.get('/banner', (req, res) => {
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
    mysqlConnection.query('Select * from banner', (err, rows, fields) => {
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
// });

router.delete('/banner/:id', (req, res) => {
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
        console.log(decoded.id);
    mysqlConnection.query('delete from banner where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send({data : true, res:'Banner Deleted Succesfully'});
        else
            res.send({data:false, res:'Something went wrong! Please try again..'});
    });
    });
});
const bstorage = multer.diskStorage({
    destination: './banner/',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }


})

const bupload = multer({
    storage: bstorage
})


router.post('/banner',bupload.single('banimage'),  (req, res) => {
    const data = { banimage: req.file.filename};
    console.log(data);
    mysqlConnection.query('insert into banner set?', [data], (err, rows, fields) => {
        res.type('json')

        if (!err)
            res.send(JSON.stringify({ res: 'success', data:true }));
        else
            res.send(JSON.stringify({ res: 'error', data:false }));

    });
});


// Banner End


// Sponsored Start
router.get('/sponsored', (req, res) => {
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
    mysqlConnection.query('Select * from sponsored', (err, rows, fields) => {
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
// });

router.delete('/sponsored/:id', (req, res) => {
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
        console.log(decoded.id);
    mysqlConnection.query('delete from sponsored where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send({data : true, res:'Banner Deleted Succesfully'});
        else
            res.send({data:false, res:'Something went wrong! Please try again..'});
    });
    });
});
const sstorage = multer.diskStorage({
    destination: './spons/',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }


})

const supload = multer({
    storage: sstorage
})


router.post('/sponsored',supload.single('spnimage'),  (req, res) => {
    const data = { spnimage: req.file.filename};
    console.log(data);
    mysqlConnection.query('insert into sponsored set?', [data], (err, rows, fields) => {
        res.type('json')

        if (!err)
            res.send(JSON.stringify({ res: 'success', data:true }));
        else
            res.send(JSON.stringify({ res: err, data:false }));

    });
});
router.get('/productByCat/:id', (req, res) => {
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
    mysqlConnection.query('SELECT product.pid,product.prodimage, product.pname, product.pdesc, product.pprice, product.transdate, product.status, catagory.catname, branch.bphone FROM product INNER JOIN catagory ON product.catid = catagory.catid INNER JOIN branch on catagory.bid = branch.bid where catagory.catid =?',[req.params.id], (err, rows, fields) => {
        res.type('json')
        if (!err)
            if (rows && rows.length) {
                console.log(rows[0].pid);
                res.send(JSON.stringify({ rowsCount: rows.length, data: rows, res:true }));
            } else {
                res.send(JSON.stringify({ data: "No Rows Found", res:false }));
            }
        else
            res.send(JSON.stringify({ data: "error" , res:false}));
        });
    });
// });

// Product Start
// Get all product
router.get('/product', (req, res) => {
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
    mysqlConnection.query('SELECT product.pid, product.pname, product.pdesc,product.prodimage, product.pprice, product.transdate, product.status, catagory.catname, branch.bphone FROM product INNER JOIN catagory ON product.catid = catagory.catid INNER JOIN branch on catagory.bid = branch.bid', (err, rows, fields) => {
        res.type('json')
        if (!err)
            if (rows && rows.length) {
                
                    res.send(JSON.stringify({ rowsCount: rows.length, data: rows }));
                } else {
                    res.send(JSON.stringify({ data: "No Rows Found" }));
                            
                       
                    
                
                // res.send(JSON.stringify({ rowsCount: rows.length, data: rows }));
            } 
        else
            res.send(JSON.stringify({ data: "error" }));
        });
    });
// });
router.get('/productbyvendor/:id', (req, res) => {
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
    mysqlConnection.query('SELECT product.pid, product.pname, product.pdesc,product.prodimage, product.pprice, product.transdate, product.status, catagory.catname, branch.bphone FROM product INNER JOIN catagory ON product.catid = catagory.catid INNER JOIN branch on catagory.bid = branch.bid where product.bid = ?', [req.params.id], (err, rows, fields) => {
        res.type('json')
        if (!err)
            if (rows && rows.length) {
                
                    res.send(JSON.stringify({ rowsCount: rows.length, data: rows }));
                } else {
                    res.send(JSON.stringify({ data: "No Rows Found" }));
                            
                       
                    
                
                // res.send(JSON.stringify({ rowsCount: rows.length, data: rows }));
            } 
        else
            res.send(JSON.stringify({ data: "error" }));
        });
    });
// });


// Get an product
router.get('/product/:id', (req, res) => {
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
    mysqlConnection.query('SELECT product.pid,product.prodimage, product.pname, product.pdesc, product.pprice, product.transdate, product.status, catagory.catname, branch.bphone FROM product INNER JOIN catagory ON product.catid = catagory.catid INNER JOIN branch on catagory.bid = branch.bid where product.pid=?', [req.params.id], (err, rows, fields) => {
        res.type('json')

        if (!err)
            if (rows && rows.length) {
                res.send(JSON.stringify({ rowsCount: rows.length, data: rows }));
            } else {
                res.send(JSON.stringify({ data: "Invalid Product Id, Please try again" }));
            }
        else
            res.send(JSON.stringify({ data: "error" }));
        });
    });
// });

// Delete an product
router.delete('/product/:id', (req, res) => {
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
        console.log(decoded.id);
    mysqlConnection.query('delete from product where pid = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Product Deleted Succesfully');
        else
            res.send('Something went wrong! Please try again..');
    });
    });
});


const pdstoarge = multer.diskStorage({
    destination: './pdimage/',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }


})

const pdupload = multer({
    storage: pdstoarge
})
// Insert an product
router.post('/product',pdupload.single('prodimage'),  (req, res) => {
    const data = { pid: req.body.pid, pname: req.body.pname, pprice:req.body.pprice, status:req.body.status, catid:req.body.catid,pdesc:req.body.pdesc,transdate:req.body.transdate,nilamidate:req.body.nilamidate,prodimage:req.file.filename,bid:req.body.bid  };
    console.log(data);
    mysqlConnection.query('select * from product where pid = ?', [data.pid], (err, rows, fields) => {
    if(!err){
        if(rows.length>=1){
            mysqlConnection.query('update product set ? where pid =  ?', [data,data.pid ], (err1, rows1, fields) => {
                if(!err1){
                    res.send("Product  Updated Succcessfully");
                }
                else{
                    res.send("Product not Updated Succcessfully");
                }
        })
        
    }
    else{
        mysqlConnection.query('insert into product set?', [data], (err, rows, fields) => {
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


// Product Module Complete

// product Image module 

// Get all product  image
router.get('/pImage/:pid', (req, res) => {
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
    mysqlConnection.query('Select * from product_image where pid = ?', [req.params.pid], (err, rows, fields) => {
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
// });
router.get('/pImage', (req, res) => {
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
    mysqlConnection.query('Select * from product_image',  (err, rows, fields) => {
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
// });




// Get an Product Image
router.get('/productImage/:id', (req, res) => {
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
        console.log(decoded.id);
    mysqlConnection.query('Select * from product_image where piid = ?', [req.params.id], (err, rows, fields) => {
        res.type('json')

        if (!err)
            if (rows && rows.length) {
                res.send(JSON.stringify({ rowsCount: rows.length, data: rows }));
            } else {
                res.send(JSON.stringify({ data: "Invalid Product Image Id, Please try again" }));
            }
        else
            res.send(JSON.stringify({ data: "error" }));
        });
    });
});

// Delete an Product Image
router.delete('/productImage/:id', (req, res) => {
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
        console.log(decoded.id);
    mysqlConnection.query('delete from product_image where piid = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Product Image Deleted Succesfully');
        else
            res.send('Something went wrong! Please try again..');
    });
    });
});

// Insert an product Image
// bjbj

const pimageStorege = multer.diskStorage({
    destination: './productimage1/',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }


})

const uploadpimage = multer({
    storage: pimageStorege
})


router.post('/productImage',uploadpimage.single('pimage'),  (req, res) => {
    const data = { pimage: req.file.filename, pid:req.body.pid };
    console.log(data);
    mysqlConnection.query('insert into product_image set?', [data], (err, rows, fields) => {
        res.type('json')

        if (!err)
            res.send(JSON.stringify({ res: 'success' }));
        else
            res.send(JSON.stringify({ res: 'error' }));

    });
});

// Product Image Module Complete

// Product Tag Module Start

// Get all product
router.get('/productTag/:id', (req, res) => {
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
    mysqlConnection.query('Select * from product_tag where pid =?',[req.params.id],  (err, rows, fields) => {
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
// });  


// Get an product


// Delete an product
router.delete('/productTag/:id', (req, res) => {
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
        console.log(decoded.id);
    mysqlConnection.query('delete from product_tag where tid = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Product Tag Deleted Succesfully');
        else
            res.send('Something went wrong! Please try again..');
    });
    });
});

// Insert an product
router.post('/productTag',  (req, res) => {
    const data = req.body;
    console.log(data);
    mysqlConnection.query('insert into product_tag set?', data, (err, rows, fields) => {
        res.type('json')

        if (!err)
            res.send(JSON.stringify({ res: 'success' }));
        else
            res.send(JSON.stringify({ res: 'error' }));

    });
});

// Product Tag Module Complete


// Nilami products 

router.get('/nilamiProducts', (req, res) => {
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
    mysqlConnection.query('select * from product where catid=33 and nilamidate > now()', (err, rows, fields) => {
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


    router.get('/nilamiProducts/:id/:phone', (req, res) => {
        const phone = req.params.phone;
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
        mysqlConnection.query('select * from user_auth where phone=?',[phone], (err, rows, fields) => {
            res.type('json')
            if (!err)
                if (rows.length>0) {
                    var counter = rows[0].counter;
                    var isenable=  rows[0].counter<rows[0].nobid;
                    if(!isenable)
                        {
                            res.send(JSON.stringify({data:"Plan expired", sts: false}))
                        }
                    
                    else
                        {
                            mysqlConnection.query("Select * from bidding_product where pid = ?", [req.params.id], (serr, srows, fields) => {
                            if(!serr){
                                if(srows.length<1){
                                    mysqlConnection.query('insert into bidding_product SET pid = ?, phone=?',[req.params.id,phone], (ierr, rows, fields) => {
                                        if(!ierr){
                                            mysqlConnection.query('update user_auth set counter =? where phone =?',[counter+1,phone], (uerr, rows, fields) => {
                                                if(!ierr){
                                                    
                                                    mysqlConnection.query('select * from product where catid=33 and pid=?',[req.params.id], (perr, prows, fields) => {
                                                        res.type('json')
                                                        if (!perr)
                                                            if (prows && prows.length) {
                                                                res.send(JSON.stringify({ rowsCount: prows.length, data: prows }));
                                                            } else {
                                                                res.send(JSON.stringify({ data: "No Rows Found" }));
                                                            }
                                                        else
                                                            res.send(JSON.stringify({ data: "error" }));
                                                        });
                                                    
                                                }
                                                else{
                                                    res.send(JSON.stringify({data:"Not Updated", sts:false}))
                                                }
                                            });
                                        }
                                        else{
                                            res.send(JSON.stringify({data:"Not Inserted", sts:true}))
                                        }
                                    });
                                }
                                else{
                                    mysqlConnection.query('select * from product where catid=33 and pid=?',[req.params.id], (perr, prows, fields) => {
                                        res.type('json')
                                        if (!perr)
                                            if (prows && prows.length) {
                                                res.send(JSON.stringify({ rowsCount: prows.length, data: prows }));
                                            } else {
                                                res.send(JSON.stringify({ data: "No Rows Found" }));
                                            }
                                        else
                                            res.send(JSON.stringify({ data: "error" }));
                                        });
                                    // res.send(JSON.stringify({data:"Already Inserted", sts:true}))
                                }
                            }
                            })
                            // res.send(JSON.stringify({ rowsCount: rows.length, data: rows }))
                        }
                        
                    
                } 
            else
                res.send(JSON.stringify({ data: "login failed" , sts:false}));
            });
        });


router.post('/pushnoti',  (req, res) => {
    const data = req.body;
    console.log(data);
    mysqlConnection.query('insert into notification set?', data, (err, rows, fields) => {
        res.type('json')

        if (!err)
            res.send(JSON.stringify({ res: 'success' }));
        else
            res.send(JSON.stringify({ res: 'error' }));

    });
});

router.get('/pushnoti', (req, res) => {
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
    mysqlConnection.query('Select * from notification',(err, rows, fields) => {
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
    router.post('/subscriber',  (req, res) => {
    const data = req.body;
    console.log(data);
    mysqlConnection.query('insert into subscriber  set?', data, (err, rows, fields) => {
        res.type('json')

        if (!err)
            res.send(JSON.stringify({ res: 'success' }));
        else
            res.send(JSON.stringify({ res: 'error' }));

    });
});

router.get('/subscriber', (req, res) => {
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
    mysqlConnection.query('Select * from subscriber ',(err, rows, fields) => {
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