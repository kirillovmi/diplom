const mongoose = require("mongoose");

const DemoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    file: {
        type: String
    },
    answers: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            file: {
                type: String
            }
        }
    ]
});

module.exports = Demo = mongoose.model("demo", DemoSchema);