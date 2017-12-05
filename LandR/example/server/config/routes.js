var mongoose = require('mongoose');
var user = require('../controllers/controlllers.js');

module.exports = function(app) {
app.get('/', (req, res) => {
  user.show(req, res);
});

app.post('/login', (req,res)=>{
  user.login(req,res);
});

app.post('/register', (req,res) =>{
  user.register(req,res);
})

}