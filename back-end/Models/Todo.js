let dayjs = require('dayjs')
const mongoose = require('mongoose');

let nowTime = new Date()
let ShowSecond = nowTime.getMinutes()
let ShowHours = nowTime.getHours()
let date = dayjs().add(7).format('dddd ');

const TodoSchema = new mongoose.Schema({
    task: String,
    done: {
        type: Boolean,
        default: false
    },
    hours: {
        type: Number,
        default: ShowHours
    },
    second: {
        type: Number,
        default: ShowSecond
    },
    day: {
        type: String,
        default: date
    
    }
});

const TodoModel = mongoose.model("todos", TodoSchema);
module.exports = TodoModel;




