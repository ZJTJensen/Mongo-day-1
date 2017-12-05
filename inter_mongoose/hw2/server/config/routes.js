var mongoose = require('mongoose');
var controllers = require('../controllers/controlllers.js');

module.exports = function(app) {
app.get('/', (req, res) => {
  controllers.show(req, res);
});

app.get('/new/:name/', (req, res) =>{
  controllers.new(req, res);
});

app.get('/remove/:name/', (req, res) =>{
  controllers.remove(req, res);
});

app.get('/:name', (req, res) => {
  controllers.view(req, res);
});

}