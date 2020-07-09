const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    theory: {
        type: String
    },
    question: {
        text: {
            type: String,
        },
        answers: [
            {
                title: {
                    type: String,
                },
                right: {
                    type: Boolean,
                    default: false
                },
                user_answer: {
                    type: Boolean,
                    default: false
                }
            }
        ]
    },
    testing: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            trying: {
                type: Number 
            },
            score: {
                type: Number,
                default: 0
            },
            isFinished: {
                type: Boolean,
                default: false
            }
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
            text: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

module.exports = Lesson = mongoose.model("lesson", LessonSchema);