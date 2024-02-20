
const mysql = require('mysql'); 
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'valera22',
  database: 'ecom'
});

connection.connect();

function getAllProducts() {
  connection.query('SELECT * from t_products', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
  });
}

function getProductById(productId) {
    connection.query('SELECT * FROM t_products WHERE pid = ?', [productId], (error, results) => {
      if (error) throw error;
      console.log(results);
      if (results.length === 0) { 
        console.log(`No product found with pid: ${productId}`);
      }
    });
  }
  

function addProduct(pid, pname, price, picname, pdescription) {
 
  const sql = `INSERT INTO t_products (pid, pname, price, picname, pdescription) VALUES (?, ?, ?, ?, ?)`;
  connection.query(sql, [pid, pname, price, picname, pdescription], (err, result) => {
    if (err) throw err;
    console.log(`Product added with ID: ${result.insertId}`);
  });
}

function updateProduct(pid, pname, price, picname, pdescription) {

  const sql = `UPDATE t_products SET pname = ?, price = ?, picname = ?, pdescription = ? WHERE pid = ?`;
  connection.query(sql, [pname, price, picname, pdescription, pid], (err, result) => {
    if (err) throw err;
    console.log(`Product updated: ${result.changedRows} row(s)`);
  });
}

function deleteProductById(productId) {
  connection.query('DELETE FROM t_products WHERE pid = ?', [productId], (error, results) => {
    if (error) throw error;
    console.log(`Deleted ${results.affectedRows} row(s)`);
  });
}

connection.end(err => {
  if (err) {
    return console.log('error:' + err.message);
  }
  console.log('Close the database connection.');
});
