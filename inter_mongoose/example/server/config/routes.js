var mongoose = require('mongoose');
var controllers = require('../controllers/controllers.js');

module.exports = function(app) {
app.get('/', (req, res) => {
  controllers.show(req, res);
});

}