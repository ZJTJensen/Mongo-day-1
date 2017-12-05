const express = require("express");
const app = express();
const mongoose= require('mongoose')
const bp = require('body-parser');
const path = require('path');
const PORT = 12000;

mongoose.connect('mongodb://localhost/animals', () =>{
    console.log(`Mongoose for database animals connected`)
});

const AnimalsSchema = new mongoose.Schema({
    type: {
        type: String
    },
},{timestamps: true});

mongoose.model('Animals', AnimalsSchema);
const Animals=mongoose.model('Animals');

app.set('views', path.resolve(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));

app.get('/', (req, res) =>{
    Animal.find({}, (err,animals) =>{
        if(err){
            return res.redirect('/');
        }
        return res.render('index', {animals});
    });
    
});
app.get('/animals', (req, res) =>{
    return res.render('quotes');
});

app.post('/animals', (req, res) => {
    const body = req.body;
    const animal = new Animal(body);
    animal.save((err)=>{
        if(err) {
            return res.redirect('/animals');
        }
        return res.redirect('/');
    });
});

app.get('/View', (req, res) =>{
    Animal.find({}, (err,animals) =>{
        if(err){
            return res.redirect('/');
        }
        return res.render('info', {animals});
    });
});

app.post('/View',(req, res) => {
    const body = req.body;
    const animal = new Animal(body);
    animal.save((err)=>{
        if(err) {
            return res.redirect('/animals');
        }
        return res.redirect('/');
    });
});





app.get('/Edit', (req, res) =>{
    Animal.find({}, (err,animals) =>{
        if(err){
            return res.redirect('/');
        }
        return res.render('info', {animals});
    });
});

app.post('/Edit',(req, res) => {
    const body = req.body;
    const type = Type(req.body);
    animal.save((err)=>{
        if(err) {
            return res.redirect('/animals');
        }
        User.update({type:'Andrinnna'}, {type:'Andriana'}, function(err){
            // This code will run when the DB has attempted to update the matching record.
        })
        return res.redirect('/Edit');
    });
});






app.post('/Delete', (req, res) => {
    const body = req.body;
    const animal = new Animal(body);
    animal.save((err)=>{
        if(err) {
            return res.redirect('/animals');
        }
        return res.redirect('/');
    });
});






app.listen(PORT, () =>{
    console.log(`Listing to port:${PORT}`);
});