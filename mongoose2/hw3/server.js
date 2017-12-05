const express = require("express");
const app = express();
const mongoose= require('mongoose')
const bp = require('body-parser');
const path = require('path');
const PORT = 3471;

mongoose.connect('mongodb://localhost/messages', () =>{
    console.log(`Mongoose for database messages connected`)
});

// mongoose.connect('mongodb://localhost/comments', () =>{
//     console.log(`Mongoose for database comments connected`)
// });

//For the const schema

var Schema = mongoose.Schema;
var MessagesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    message: { type: String, required: true }, 
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
   }, { timestamps: true });

var CommentSchema = new mongoose.Schema({
// since this is a reference to a different document, the _ is the naming convention!
    _messages: {type: Schema.Types.ObjectId, ref: 'Messages'},
    name: { type: String, required: true },
    comment: { type: String, required: true },
}, {timestamps: true });






mongoose.model('Messages',MessagesSchema);
const Messages=mongoose.model('Messages');
mongoose.model('Comment',CommentSchema);
const Comment=mongoose.model('Comment');






app.set('views', path.resolve(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    Messages.find({}).populate('comments').exec(function(err, messages) {
        console.log(messages[0].comments)
        
        if(err){
            return res.redirect('/');
        }
        return res.render('index', {messages: messages});
           });
   });



app.post("/message", (req, res)=>{
    const body = req.body;
    const message = new Messages(body);
    message.save({}, (err, messages) =>{
        if(err){
            return res.redirect('/');
        }
        return res.redirect('/'); 
    });
});

app.post("/comment/:id", (req, res)=>{
    Messages.findOne({_id: req.params.id}, function(err, messages){
        var comment = new Comment(req.body);
        comment._messages = messages._id;
        messages.comments.push(comment);
        comment.save(function(err){
                messages.save(function(err){
                     if(err) {
                          console.log('Error');
                     } else {
                          res.redirect('/');
                     }
                 });
         });
    });
    
});

app.listen(PORT, () =>{
    console.log(`Listing to port:${PORT}`);
});
// for sake of keeping it small
// message in message message.name message.message
// comment in comments comment.name comment.comment