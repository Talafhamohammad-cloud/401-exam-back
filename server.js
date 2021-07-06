const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require("mongoose");
require('dotenv').config();
mongoose.connect("mongodb://localhost:27017/cocktail", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const server = express();
server.use(express.json());
server.use(cors());

const cocktail = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
})
const cocktailmodel = mongoose.model("cocktail", cocktail);

const PORT = process.env.PORT;
server.get('/getcocktail',getco);
server.get('/getfavourite', getfav);
server.post('/addfavourite', addTofav);
server.delete('/delete/:idDrink', deleteco);
server.put('/update/:idDrink', updateco);
server.get('/',(req,res)=>{
    res.send('Hola talafha')
});

function getco (req,res){
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic';
    axios.get(url).then(result=>{
        res.send(result.data);
    })
}

function addTofav(req,res){
    const {
        strDrink,
        strDrinkThumb
    }=req.body;
    const newcocktail = new cocktailmodel({
        name: strDrink,
        img: strDrinkThumb

    })
    newcocktail.save;
}
function getfav(req,res) {
    cocktailmodel.find({},(err,data)=>{
        res.send(data);
    })

    
}
function deleteco(req, res) {
    const id = req.parms.idDrink;
    cocktailmodel.findByIdDelete(id,(err,data)=>{
        cocktailmodel.find({}, (err, newdata)=>{
            res.send(newdata);
        })

    })

} 
function updateco(req, res) {
    cocktailmodel.find({},(err,data)=>{
        data.map((item,idx)=>{
            if (idx == req.parms.idDrink) {
                item.img=req.body.img;
                item.name = req.body.name;
                item.save()
            }
        })
        res.send(data);
    })
}



server.listen(PORT,()=>{
    console.log(`lisitining on port ${PORT}`)
})