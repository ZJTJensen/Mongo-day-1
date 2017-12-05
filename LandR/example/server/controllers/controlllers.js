
const mongoose= require('mongoose');
const User=mongoose.model('User');
module.exports = {

    show: function(req, res) {
        if(req.session.no){
            errs= req.session.no
        }

        if(req.session.errors){
            var errs= [];
            for(let i in req.session.errors.errors){
                errs.push(req.session.errors.errors[i].message);
            }
            errs = errs.reverse()
        }
        
        req.session.destroy();
        
        return res.render('index', {errs});
    },
    login: function(req, res) {
        var body = req.body;
        if(!body.email || !body.password){
            req.session.no = ["Wrong login info"];
            return res.redirect('/');
        }
        User.find({email: body.email}, function(err, user){
            if(user.length < 1){
                req.session.no = ["Wrong login info"];
                return res.redirect('/');
            }  
            user=user[0];  
                
                if(User.schema.methods.match(req.body.password, user.password)){
                    req.session.id = user.id;
                    return res.render('success');
                }else{
                req.session.no = ["Wrong login info"];
                return res.redirect('/'); 
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
                req.session.errors = errs;
                return res.redirect('/');

            });

            
        
    }
}