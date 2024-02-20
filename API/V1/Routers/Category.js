
const router = require('express').Router();
const authSession = require('../Middlewares/authSession');

const {
    GetAllCategories,
    GetCategoryByID,
    AddCategory,
    UpdateCategoryByID,
    DeleteCategoryByID } = require('../Controllers/Category');

router.get("/", GetAllCategories);
router.get("/:id", GetCategoryByID); 
router.post("/",authSession, AddCategory); 
router.patch("/:id",authSession, UpdateCategoryByID);
router.delete("/:id",authSession,DeleteCategoryByID);

module.exports = router;