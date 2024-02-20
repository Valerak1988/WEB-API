
const { error } = require('console');
const mysql = require('mysql');

module.exports = {

    GetAllProducts:(req,res)=>{
        const conn = global.db; //שליפת קונקשן מתוך הזכרון הגלובאלי
        conn.query('SELECT * FROM t_product',(error,results,fields)=>{
            //במידה והיתה שגיאה
            if(error)
                return res.status(500).json(error);
            // החזרת הנתונים שהתקבלו מהשרת
            else
                return res.status(200).json(results);
        });
    },

    GetProductByID:(req,res)=>{
        let pid = req.params.id;
        const conn = global.db; // שמירת התחברות 
        conn.query('SELECT * FROM t_product WHERE pid = ?', pid,(error, results) => {
            if (error)
            return res.status(500).json(error);
            else
            return res.status(200).json(results);
        });
    },

    AddProduct:(req, res) =>{
        let {pname, price, picname, pdescription} = req.body;
        const conn = global.db; // שמירת התחברות 
        conn.query(`INSERT INTO t_product ( pname, price, picname, pdescription) VALUES (?, ?, ?, ?)`, [pname, price, picname, pdescription],(error, results) => {
            if (error)
            return res.status(500).json(error);
            else
            return res.status(200).json(results);
        });
    },

    UpdateProductByID:(req, res) =>{
        let pid = req.params.id;
        let {pname, price, picname, pdescription} = req.body;
        const conn = global.db; // שמירת התחברות 
        conn.query(`UPDATE t_products SET pname = ?, price = ?, picname = ?, pdescription = ? WHERE pid = ?`, [pname, price, picname, pdescription, pid], (error, results) => {
            if (error)
            return res.status(500).json(error);
            else
            return res.status(200).json(results);
        });
        
    },

    DeleteProductByID:(req, res) =>{
        let pid = req.params.id;
        const conn = global.db; // שמירת התחברות 
        conn.query('DELETE FROM t_products WHERE pid = ?', pid,(error, results) => {
            if (error)
            return res.status(500).json(error);
            else
            return res.status(200).json(results);
        });
    }
}