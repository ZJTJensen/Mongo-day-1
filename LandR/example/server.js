const express = require("express");
const app = express();
const session = require('express-session');
const mongoose= require('mongoose');
const bp = require('body-parser');
const path = require('path');
const PORT = 5000;




app.set('views', path.resolve(__dirname,'./client/views'));
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));
app.use(session({secret: "Zachisaboss"}));




require('./server/config/mongoose.js')

var routes_setter= require('./server/config/routes.js');
routes_setter(app);



app.listen(PORT, () =>{
    console.log(`Listing to port:${PORT}`);
});