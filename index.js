// Assignment run command is node  index.js

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const port = 3002;
app.use(bodyParser.urlencoded({ extended: false }))
const validationName = (req, res, next) => {
    var error = [];
    if (req.method === 'POST') {
        if ((req.body.title == undefined || req.body.title == "") && (req.body.description == undefined || req.body.description == "")) {
            error.push({ error: { title: "The Title is required", description: "The Description is required" } });
            res.send(error);
        }
        else if (req.body.title == undefined || req.body.title == "") {
            error.push({ error: { title: "The Title is required" } });
            res.send(error);
        }
        else if (req.body.description == undefined || req.body.description == "") {
            error.push({ error: { description: "The Description is required" } });
            res.send(error);
        }
        else {
            next();
        }
    }
    if (req.method === 'PUT') {
        var id = req.params.id;
        var index = data.findIndex(o => o.id == id);
        if (index == -1) {
            error.push({ error: { id: "The ID is not present" } });
        }
        if (req.body.title) {
            if (req.body.title == undefined || req.body.title == '') {
                error.push({ error: { title: "The Title is required" } });
            }
        }
        if (req.body.description) {
            if (req.body.description == undefined || req.body.description == '') {
                error.push({ error: { description: "The Description is required" } });
            }
        }
        if (error.length > 0) {
            res.status(400).json({ errors: error });
        } else {
            next();
        }

    }

    if (req.method === 'DELETE') {
        var id = req.params.id;
        var index = data.findIndex(o => o.id == id);
        if (index == -1) {
            error.push({ error: { id: "The ID is not present" } });
            res.send(error);
        }
        next();
    }

};


let i = 0;

var data = [
    {
        id: ++i,
        title: 'Abdullah',
        description: 'IT',
    },
    {
        id: ++i,
        title: 'Sameel',
        description: 'Backend',
    },
    {
        id: ++i,
        title: 'Huzzaifa',
        description: 'Front End',
    }
];

// localhost:3002/todos/ 
// It will show all the data 
app.get('/todos', (req, res) => {

    res.json(data);
});

// It will insert  the data 
// For example localhost:3002/todos/?title=tester&description=testing
app.post('/todos', validationName, (req, res) => {
    try {
        var todo = {
            id: ++i,
            title: req.body.title,
            description: req.body.description,
        }
        data.push(todo);
        res.send('Inserted');
    } catch (error) {
        res.status(500).send('Server Error')
    }
});

// It will update  the entry
// For example localhost:3002/todos/3?title=dummy&description=data
app.put('/todos/:id', validationName, (req, res) => {
    try {
        var id = req.params.id;
        var index = data.findIndex(o => o.id == id);
        data[index].title = req.body.title || data[index].title;
        data[index].description = req.body.description || data[index].description;
        res.send('Updated');
    } catch (error) {
        res.status(500).send(error);
    }
});

// It will Delete  the entry
// For example localhost:3002/todos/3
app.delete('/todos/:id', validationName, (req, res) => {
    try {
        var id = req.params.id;
        var index = data.findIndex(o => o.id == id);
        data.splice(index, 1);
        res.send('Deleted')
    } catch (error) {
        res.status(500).send(error);
    }
});

// The port where the project is listening

app.listen(port, (req, res) => {
    console.log(`Server is running on ${port}`);
})