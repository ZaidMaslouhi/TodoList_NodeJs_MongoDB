let express = require('express');
let todoController = require('./controllers/todo.controller');


let app = express();

// Set up template engine
app.set('view engine', 'ejs');

// Static files
app.use(express.static('./public'));

// Fire the controller
todoController(app);

// Listen to port
app.listen(3000);
console.log('You are listen to the port 3000');

