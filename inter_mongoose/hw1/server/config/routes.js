var mongoose = require('mongoose');
var animals = require('../controllers/animals.js');

module.exports = function(app) {
app.get('/', (req, res) => {
  animals.show(req, res);
});
app.get('/add', (req, res) => {
    return res.render('add')
});
app.post('/add', (req, res)=>{
    animals.save(req, res);
});

app.post('/delete/:id', (req, res) =>{
    animals.delete(req, res);
});

app.get('/edit/:id', (req,res) =>{
    var id= req.params.id;
    return res.render('edit', {id});
});

app.get('/view/:id', (req,res) =>{
    animals.single(req, res);
});

app.post('/edit/:id', (req,res)=>{
    animals.edit(req, res);
});
}