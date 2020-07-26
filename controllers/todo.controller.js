const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const urlEncodedParser = bodyParser.urlencoded({extended: false});

// Connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/todo', {useNewUrlParser: true,useUnifiedTopology:true});

// Create a schema - this is like a table stucture
const todoSchema = new mongoose.Schema({
    item: String,
});
const Todo = mongoose.model('Todo', todoSchema);


module.exports = (app)=>{

    app.get('/todo', (req, res)=>{
        // Get the data from mongodb
        Todo.find().then((data)=>res.render('todo', {items: data}))
                    .catch(()=>console.log('Error: cannot find any data !!!'));
    });

    app.post('/todo', urlEncodedParser, (req, res)=>{
        // Get data from mongodb and add it
        Todo(req.body).save().then((data)=>res.json(data))
                        .catch(()=>console.log('Error: cannot Add any data !!!'));
    });

    app.delete('/todo/:item', (req, res)=>{
        // Delete the requested item from mongodb
        Todo.deleteOne({item: req.params.item.replace(/\-/g,' ')})
            .then((data)=>res.json(data))
            .catch(()=>console.log('Error: cannot remove any data !!!'));
    });

};
