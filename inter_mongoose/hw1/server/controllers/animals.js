const mongoose= require('mongoose');
const Animals=mongoose.model('Animals');
module.exports = {

    show: function(req, res) {
        Animals.find({}, (err, animals)=>{
            if(err){
                return res.redirect('/');
            }
            return res.render('index', {animals});
            });
    },
    save: function(req, res) {
        const body = req.body;
        const animal = new Animals(body);
        animal.save((err)=>{
            if(err){
                return res.redirect('/animals');
            }
            return res.redirect('/');
        });
    },
    delete: function(req, res){
        console.log(req.params.id);
        var id= req.params.id;
        Animals.remove({_id: id}, function(err){
           })
        return res.redirect('/');
    },
    single: function(req, res){
        var id= req.params.id;
        Animals.find({_id:id}, function(err, animals){
            var type = animals[0].type;
            console.log(animals);
            return res.render('view', {type});
        });
    },
    edit: function(req, res){
        var bod= req.body;
        
            var id= req.params.id;
            
            Animals.update({_id:id}, {type:bod.type}, function(err){
                // This code will run when the DB has attempted to update the matching record.
            });
            return res.redirect('/')
    }
}