var mongoose = require('mongoose');
const AnimalsSchema = new mongoose.Schema({
    type: {
        type: String
    },
    
},{timestamps: true});

mongoose.model('Animals', AnimalsSchema);
const Animals=mongoose.model('Animals');