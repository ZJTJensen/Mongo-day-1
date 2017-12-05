
const mongoose= require('mongoose');
const User=mongoose.model('User');
module.exports = {

    show: function(req, res) {
    
        req.session.destroy();
        return res.render('index');
    },
    login: function(req, res) {
        var body = req.body;
    User.find({email: body.email}, function(err, user){
        user=user[0];    
        console.log(body.password);
            console.log(user.password);
            if (!User.schema.methods.match(req.body.password, user.password)){
                return res.redirect('/');   
            }else{
            
            req.session.id = user.id;
            return res.render('success');
            }
        })
 
    },





    register: function(req, res ){
        var body = req.body;
           var user = new User({
               first_name: body.first_name,
                last_name: body.last_name,
                email: body.email,
                password: body.password,
                password_confirm: body.password_confirm,
                birthdate: body.birthdate
            })
            user.save(function(errs){
                if(!errs){
                req.session.id = user.id;
                return res.render('success');
                }
                return res.render('index',{regErrs: user.errors});

            });

            
        
    }
}