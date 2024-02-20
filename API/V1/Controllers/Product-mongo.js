
const Product = require('../Models/Product');

module.exports = {
    GetAllProducts:(req,res)=>{
        Product.find().then((data)=>{
            return res.status(200).json(data);
        });
    },

    GetProductByID:(req,res)=>{
        let pid = req.params.id;
        Product.findOne({pid}).then((data)=>{
            return res.status(200).json (data);
        });
    },

    AddProduct:(req,res)=>{
        let body = req.body;
        Product.insertMany(body).then((data)=>{
            return res.status(200).json (data);
        });
    },

    UpdateProductByID:(req,res)=>{
        let pid = req.params.id;
        let body = req.body;
        Product.updateMany({pid},body).then((data)=>{
            return res.status(200).json (data);
        });
    },

    DeleteProductByID:(req,res)=>{
        let pid = req.params.id;
        Product.deleteOne({pid}).then((data)=>{
            return res.status(200).json (data);
        });
    }
};