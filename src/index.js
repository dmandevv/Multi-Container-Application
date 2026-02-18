const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/todo');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://mongodb:27017/todoapp')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos).send("Here are your todos");
});

app.post('/todos', async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    });
    await todo.save();
    res.status(201).json(todo);
});

app.get('/todos/:id', async (req, res) => {
    try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).send('Todo not found');
    res.json(todo);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.put('/todos/:id', async (req, res) => {
    try {
    const todo = await Todo.findByIdAndUpdate(
    req.params.id, 
    { title: req.body.title, completed: req.body.completed},
    { new: true }) // This returns the modified document rather than the original
    if (!todo) return res.status(404).send('Todo not found');
    res.json(todo);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.delete('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) return res.status(404).send('Todo not found');
        res.json(todo);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});