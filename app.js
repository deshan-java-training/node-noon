const cors = require('cors');
const express = require('express');
const database = require('./database');

const ERROR ='Error occured';

const app = express();
app.use(cors());
app.use(express.json());

//database.connect();

app.get('/noonbackend/', (req, res)=>{
    res.send('Welcome to Noon API') ;
});

app.get('/noonbackend/api/products', (req, res)=>{
    database.getAllProducts(res);
});

app.get('/noonbackend/api/products/:id', (req, res)=>{
    database.getProductById(req.params.id, res);
});

app.get('/noonbackend/api/products/favorite/:id', (req, res)=>{
    database.isFavorite(req.params.id, res);
});

app.put('/noonbackend/api/products/:id', (req, res)=>{
    const favorite = {
        favorite_id: req.params.id,
        is_favorite: req.query.is_favorite
    }
    console.log(favorite);
    database.updateFavorite(favorite,res);
});

app.listen(0, () => console.log('Application is running'));

