const express = require('express');
const router = new express.Router();
const mysqlConnection = require("../helper/dbconfig");
var fetch = require('node-fetch');
var serverKey = 'AAAA999o1NQ:APA91bGq9w_AaVkv9AE6eSXtfSiTBRqr61WTh_aEoxSYOEle1SKPUABByT1MYjTI0KdXIktId5Gh1w_vJbgFCS6-4DlL4fcg6Pm3iHcbirKpLxXzUXWfZ6ee4DtRFUNy-1i7lcyVL39f';
router.post('/notify', async (req, res, next) => {
    res.type('json')
    const data = req.body;
    var someVar= mysqlConnection.query('Select * from subscriber', (err, rows, fields) => {
        res.type('json')
        if (!err)
            if (rows && rows.length) {
                setValue(rows);
            } else {
                res.send(JSON.stringify({ data: "No Rows Found" }));
            }
        else
            res.send(JSON.stringify({ data: "error" }));

    })
    var listsub =[]; 
    function setValue(value) {
        someVar = value;

        listsub = someVar.map(function (e) {
            return e.web_key;
        })
        console.log(listsub);
        var message = {
            'registration_ids': listsub,
            'notification': {
                'title': data.name,   
                'body': data.msg,
            },
    
        };
        console.log(message);
        fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
            'Authorization': 'key=AAAA999o1NQ:APA91bGq9w_AaVkv9AE6eSXtfSiTBRqr61WTh_aEoxSYOEle1SKPUABByT1MYjTI0KdXIktId5Gh1w_vJbgFCS6-4DlL4fcg6Pm3iHcbirKpLxXzUXWfZ6ee4DtRFUNy-1i7lcyVL39f',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    }).then((response) => {
        response.json().then((rs =>{
            console.log(res.send(JSON.stringify({data: rs, error:false})));
        }))
    })
        
          }
     
}
)



module.exports = router;
