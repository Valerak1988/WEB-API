
require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require ('mongoose');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const authSession = require('./API/V1/Middlewares/authSession');
const MongoStore = require('connect-mongo');

const mysql = require('mysql');


var connection = mysql.createConnection({
    host:'127.0.0.1',//שם השרת
    user : 'root',//שם משתמש
    password : 'Vv123',//סיסמה
    database : 'ecom'//שם בסיס נתונים
});

connection.connect(()=>{
    console.log('connected to Mysql');
});

global.db = connection;//יצירת משתנה גלובאלי בשם דיבי שמחזיק את הקונקשיין


const productRouter = require('./API/V1/Routers/Product');
const userRouter  = require('./API/V1/Routers/User');
// const categoryRouter = require('./API/V1/Routers/Category');

const arr = ['192.168.0.1', '::1' , '192.168.0.2', '192.168.0.3']
app.use((req,res,next)=>{
    console.log(req.ip);
    let i;
    for (i = 0; i <arr.length; i++)
    if (req.ip== arr[i])
    break;

    if(i==arr.length)
    return res.status(403).json({msg:"You are Unauthorized"});
    else
    next();
});

const ConnStr = process.env.MONGO_CONN;

mongoose.connect(ConnStr +'HW7').then((status)=>{
    if (status)
        console.log('Connected to MongoDB');
    else
        console.log('Not connected');
});

const productModel= require('./API/V1/Models/Product');
productModel.find().then((data)=>{
    console.log(data);
});

const userModel= require('./API/V1/Models/User');
userModel.find().then((data)=>{
    console.log(data);
});

// const categoryModel= require('./API/V1/Models/Category');
// userModel.find().then((data)=>{
//     console.log(data);
// });


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());

const twentyMin = 1000 * 60 * 20;

app.use(session({
    secret:'asdsadsdd',
resave:false,
saveUninitialized:true,
cookie:{maxAge:twentyMin},
store:MongoStore.create({
    mongoUrl:ConnStr + 'HW7',
    collectionName:'sessionTable'
})
}));


app.use('/product',productRouter);
app.use('/user',userRouter);
// app.use('/category',categoryRouter);


app.all("*", (req,res)=>{
    return res.status(404).json({msg:"Not found"});
});
module.exports = app;