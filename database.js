var mysql = require('mysql2');
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "androme2_noonapp",
//   database: "androme2_noonapp",
//   password: "Mysql@123"
// });

var con = mysql.createPool({
    connectionLimit:100,
    host: "localhost",
    user: "androme2_noonapp",
    database: "androme2_noonapp",
    password: "Mysql@123"
  });

const ERROR ='Error occured';

// function connectToDB(){
//     con.connect(function(err) {
//         if (err) throw err;
//         console.log("Connected!");
//     });
//     return con;
// }

function getAllProducts(response){
    con.query(`select * from products LEFT JOIN favorites ON products.product_id = favorites.favorite_id`, (err,res)=>{
        if(err){
            response.status(500).send(err);
        }else{
            response.status(200).send(res);
        }
    });
}

function getProductById(dataId, response){
    con.query("SELECT * FROM products LEFT JOIN favorites ON products.product_id = favorites.favorite_id WHERE `product_id` = ?", [dataId], (err,res) => {
        if(err){
            response.status(500).send(err);
        }else{
            response.status(200).send(res);
        }
    });
}

function isFavorite(dataId, response){
    con.query("SELECT * FROM favorites WHERE `favorite_id` = ?", [dataId], (err,res) => {
        if(err){
            response.status(500).send(err);
        }else{
            response.status(200).send(res);
        }
    });
}

function updateFavorite(favorite, response){
    con.query("INSERT INTO favorites (`favorite_id`, `is_favorite`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `is_favorite` = ?", [favorite.favorite_id, favorite.is_favorite, favorite.is_favorite], (err,res) => {
        if(err){
            response.status(500).send(err);
        }else{
            response.status(200).send(favorite);
        }
    });
}

//module.exports.connect = connectToDB;
module.exports.getAllProducts = getAllProducts;
module.exports.getProductById = getProductById;
module.exports.isFavorite = isFavorite;
module.exports.updateFavorite = updateFavorite;

