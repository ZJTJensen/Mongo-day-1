const mongoose= require('mongoose');
const Controllers=mongoose.model('Controllers');
module.exports = {

    show: function(req, res) {
            return res.render('index', {controllers});

    },

}