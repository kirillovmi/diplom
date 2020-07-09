const mongoose = require("mongoose");

const PracticSchema = new mongoose.Schema({
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

module.exports = Practic = mongoose.model("practic", PracticSchema);