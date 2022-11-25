const { json } = require('body-parser');
const express = require('express');
const bodyparser = require('body-parser');
const http = require('http');
const cors =  require('cors');
const v4 = require('uuid');
var app = express();
app.use(cors());
app.use('/catimage', express.static('catimage'));
app.use('/banner', express.static('banner'));
app.use('/productimage1', express.static('productimage1'));
app.use('/pdimage', express.static('pdimage'));
app.use('/spons', express.static('spons'));
app.use('/brimage', express.static('brimage'));
const AdminPanel = require('./src/AdminPanel');
// console.log('bjbj');
const Nilamiuser = require('./src/nilamiUserAuth');
const userlogin = require('./src/userlogin');
const nilami_product = require('./src/NilamiProduct');
const fcm = require('./src/fcm');
// app.use(express.static(__dirname + '/public'));

app.use(bodyparser.json());
app.use(AdminPanel);
app.use(nilami_product);
app.use(Nilamiuser);
app.use(userlogin); 
app.use(fcm);
// const port = 5000;
app.listen(process.env.PORT || 5000, () => {
          console.log(`running `);
});

  
