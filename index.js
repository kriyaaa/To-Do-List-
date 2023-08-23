const express = require('express');
const path = require('path');
const port = 8000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assests'));

var to_do = []

app.get('/', function(req, res){
    return res.render('home', {
        title: "To_do List",
        to_do: to_do
    });
})

app.post('/add-task', function(req, res){
    to_do.push({
        task: req.body.task,
        checked: false      
    });
    res.redirect('/');
});

app.get('/delete-task/:index', function(req, res){
    const index = req.params.index;
    if(index >= 0 && index<to_do.length){
        to_do.splice(index, 1);
    }
    res.redirect('/');
});

app.get('/toggle-task/:index', function(req, res){
    const index = req.params.index;
    if(index >= 0 && index < to_do.length){
        to_do[index].checked = !to_do[index].checked;
    }
    res.redirect('/');
});

app.listen(port, function(err){
    if(err){
        console.log('Error in running the server', err);
    }
    console.log('Yup! My Express Server is running on Port:', port);
});