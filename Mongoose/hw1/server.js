const express = require("express");
const app = express();
const mongoose= require('mongoose')
const bp = require('body-parser');
const path = require('path');
const PORT = 12000;

mongoose.connect('mongodb://localhost/quotes', () =>{
    console.log(`Mongoose for database quotes connected`)
});

const QuoteSchema = new mongoose.Schema({
    name: {
        type: String
    },
    quote: {
        type: String
    }
},{timestamps: true});

mongoose.model('Quote', QuoteSchema);
const Quote=mongoose.model('Quote');


app.set('views', path.resolve(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));


app.get('/', (req, res) =>{
    return res.render('index');
});

app.get('/quotes', (req, res) =>{
    Quote.find({}, (err,quotes) =>{
        if(err){
            return res.redirect('/');
        }
        return res.render('quotes', {quotes});
    });
});

app.post('/quotes', (req, res) => {
    const body = req.body;
    const quote = new Quote(body);
    quote.save((err)=>{
        if(err) {
            return res.redirect('/');
        }
        return res.redirect('/quotes');
    });
});

app.listen(PORT, () =>{
    console.log(`Listing to port:${PORT}`);
});