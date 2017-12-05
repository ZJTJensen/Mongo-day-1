const mongoose= require('mongoose');
const Controllers=mongoose.model('Controllers');
module.exports = {

    show: function(req, res) {
        Controllers.find({}, function(errs, Controllers){
            return res.json({Controllers: Controllers})
        });
    },
    new: function(req, res) {
        let Controlleri = new Controllers()
        Controlleri.name = req.params.name;
        console.log(Controlleri.name)
        Controlleri.save(function(err){
            return res.redirect('/');
        });
    },
    remove: function(req, res) {
        Controllers.remove({name: req.params.name}, function(err){
            return res.redirect('/');
        })
        
    },
    view: function(req, res) {
        Controllers.find({name: req.params.name}, function(errs, users){
            return res.json({users: users});
        });
    },

}