var mongoose = require('mongoose');
const ControllersSchema = new mongoose.Schema({
    type: {
        type: String
    },
    
},{timestamps: true});

mongoose.model('Controllers', ControllersSchema);
const Controllers=mongoose.model('Controllers');