
const router = require('express').Router();
const auth = require('../Middlewares/auth');

const{
    GetAllProducts,
    GetProductByID,
    AddProduct,
    UpdateProductByID,
    DeleteProductByID
}=require('../Controllers/Product');

router.get('/',GetAllProducts);
router.get('/:id',GetProductByID);
router.post('/',AddProduct);
router.patch('/:id',UpdateProductByID);
router.delete('/:id',DeleteProductByID);

module.exports=router;