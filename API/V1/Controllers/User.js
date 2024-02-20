
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports={
    GetAllUsers:(req,res)=>{
        User.find().then((data)=>{
            return res.status(200).json (data);
        });
    },

    GetUserByID:(req,res)=>{
        let userid = req.params.id;
        User.findOne({userid}).then((data)=>{
            return res.status(200).json (data);
        });
    },

    AddUser:(req,res)=>{
        let body = req.body;
        User.insertMany(body).then((data)=>{
            return res.status(200).json (data);
        })
    },

    UpdateUserByID:(req,res)=>{
        let userid = req.params.id;
        let body = req.body;
        User.updateMany({userid}, body).then((data)=>{
            return res.status(200).json (data);
        });
    },

    DeleteUserByID:(req,res)=>{
        let userid = req.params.id;
        User.deleteOne({userid}).then((data)=>{
            return res.status(200).json(data);
        });
    },

    Register:(req,res)=>{
        const {FullName,Email,Pass}=req.body;
        User.find({Email}).then((results)=>{
            if(results.length>0)
            return res.status(200).json ({msg:'User Allready Registred'});

            bcrypt.hash(Pass,10).then((hashPass)=>{
                User.insertMany({FullName,Email,Pass:hashPass}).then((result)=>{
                    return res.status(200).json({result});
                });
            });
        });
    },

    Login:(req,res)=>{
        const {Email,Pass}=req.body;
        User.find({Email}).then((results)=>{
            if(results==0)
            return res.status(200).json({msg:'Wrong User Or Pass!!!'});

            const hashPass=results[0].Pass;

            bcrypt.compare(Pass,hashPass).then((status)=>{
                if(!status)
                return res.status(200).json({msg:'Wrong User Or Pass!!!'});
            const myUser = results[0];
            const token = jwt.sign({Email,Pass,FullName:myUser.FullName},process.env.PRIVATE_KEY,{expiresIn:'2h'});

            req.session.user=token;

            return res.status(200).json({msg:"Login Seccesfull,WELCOME",token});
            });
        });
    }
};