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

app.get('/', (req, res) => {
    Animals.find({}, (err, animals)=>{
    if(err){
        return res.redirect('/');
    }
    return res.render('index', {animals});
    });
});

app.get('/add', (req, res) => {
    return res.render('add')
});

app.post('/add', (req, res)=>{
    const body = req.body;
    const animal = new Animals(body);
    animal.save((err)=>{
        if(err){
            return res.redirect('/animals');
        }
        return res.redirect('/');
    });

});

app.post('/delete/:id', (req, res) =>{
    console.log(req.params.id);
    var id= req.params.id;
    Animals.remove({_id: id}, function(err){
       })
    return res.redirect('/');
});

app.get('/edit/:id', (req,res) =>{
    var id= req.params.id;
    return res.render('edit', {id});
});





app.get('/view/:id', (req,res) =>{
    var id= req.params.id;
    Animals.find({_id:id}, function(err, animals){
        var type = animals[0].type;
        console.log(animals);
        return res.render('view', {type});
    });

    
});




app.post('/edit/:id', (req,res)=>{
    var bod= req.body;

    var id= req.params.id;
    
    Animals.update({_id:id}, {type:bod.type}, function(err){
        // This code will run when the DB has attempted to update the matching record.
    });
    return res.redirect('/')
});








app.listen(PORT, () =>{
    console.log(`Listing to port:${PORT}`);
});