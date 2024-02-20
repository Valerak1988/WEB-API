
const Category = require('../Models/Category');

module.exports = {
    GetAllCategories:(req, res) =>{
        category.find().then((data) => {
            return res.status(200).json(data);
        });
    },
    GetCategoryByID:(req, res) =>{
        let cid = req.params.id;
        category.findOne({cid}).then((data) =>{
            return res.status(200).json(data);
        });
    },
    AddCategory:(req, res) =>{
        let body = req.body;
        category.insertMany(body).then((data) =>{
            return res.status(200).json(data);
        });
    },
    UpdateCategoryByID:(req, res) =>{
        let cid = req.params.id;
        let body = req.body;
        category.updateMany({cid},body).then((data) =>{
            return res.status(200).json(data);
        });
    },
    DeleteCategoryByID:(req, res) =>{
        let cid = req.params.id;
        category.deleteOne({cid}).then((data) =>{
            return res.status(200).json(data);
        });
    },
};