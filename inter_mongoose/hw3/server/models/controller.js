var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require("bcrypt");

let UserSchema = new Schema({
    email:{
        type: String,
        required:[true, "Email is reuired"],
        validate:{
        validator: function(value){
            return function (value){
                return 
            }
        }
    }
    },

    birthday:{
        type: Date,
        required:[true, "Birthday is required"],
        validate:{
            validator:function(value){
                let years= new Date().getFullYear()-value.getFullYear();
                return years >= 18;
            },
            message:"You must be 18 or older"
        }
    }

    password_confirm:{

    }

})











const ControllersSchema = new mongoose.Schema({
    type: {
        type: String
    },
    
},{timestamps: true});

mongoose.model('Controllers', ControllersSchema);
const Controllers=mongoose.model('Controllers');