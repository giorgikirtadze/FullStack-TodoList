const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/tests');

app.get('/getUsers', (req, res) => {
    TodoModel.find({})
        .then(users => {
            res.json(users);
        })
        .catch(error => res.json('Error: ', error));
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate({ _id: id }, { $set: { done: req.body.done } }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});
app.delete('/delete', (req, res) => {
    const { ids } = req.body;
    TodoModel.deleteMany({ _id: { $in: ids } })
        .then(() => {
            res.sendStatus(200);
        })
        .catch(error => {
            res.status(500).json({ error: 'Error deleting items', message: error.message });
        });
});

let dayjs = require('dayjs')
app.post('/add', (req, res) => {
    const task = req.body.task;
    
    const nowTime = new Date();
    
    let ShowSecond = nowTime.getMinutes()
    let ShowHours = nowTime.getHours()
    let date = dayjs().add(7).format('dddd ');

    TodoModel.create({
        task: task,
        hours: ShowHours,
        second: ShowSecond,
        day: date
    })
    .then(result => res.json(result))
    .catch(error => res.status(500).json({ error: 'Error adding task', message: error.message }));
});

// Your existing server code remains the same

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    let done = req.body.done;
    console.log('done', done);
 
    TodoModel.findByIdAndUpdate({ _id: id }, { $set: { done: done } }, { new: true }) // Corrected syntax
        .then(result => res.json(result)) // Corrected variable name
        .catch(err => res.status(404).json({ error: 'Error updating task', message: err.message })); // Corrected error handling
});




app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
