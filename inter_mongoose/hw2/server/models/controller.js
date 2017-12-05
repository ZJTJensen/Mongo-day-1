var mongoose = require('mongoose');
const ControllersSchema = new mongoose.Schema({
    name: {
        type: String
    },
    
},{timestamps: true});

mongoose.model('Controllers', ControllersSchema);
const Controllers=mongoose.model('Controllers');