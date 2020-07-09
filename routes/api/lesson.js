const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");


const Lesson = require('../../models/Lesson');
const User = require('../../models/User');
const auth = require("../../middleware/auth");

//@route    POST api/lesson
//@desc     Create a new lesson
//@access   Private

router.post("/", [
    check("title", "Title id required").not().isEmpty(),
    check("video", "Video is required").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    
    try {
        const newLesson = new Lesson({
            title: req.body.title,
            video: req.body.video,
            theory: req.body.theory,
            question: req.body.question
        });

        const lesson = await newLesson.save();
        res.json(lesson);
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//@route    GET api/lesson/user_answers
//@desc     Get all user lesson answers
//@access   Private

router.get('/user_answers', auth, async (req, res) => {
    try {
        let lesson = await Lesson.find();
        let answers = []

        lesson.map((cur_lesson) => {
            cur_lesson.testing.map((test) => {
                if(test.user.toString() === req.user.id) {
                    answers.push({lesson: cur_lesson.title, trying: test.trying, score: test.score, isFinished: test.isFinished})
                }
            })
        })
        res.json(answers);

    } catch(error) {
        res.status(500).send("Server error");
    }
})

//@route    GET api/lesson
//@desc     Get all lessons
//@access   Public

router.get("/",async (req, res) => {
    try  {
        const lessons = await Lesson.find();
        res.json(lessons);
    } catch (error) {
        res.status(500).send("Server error");
    }
});

//@route    GET api/lesson/:id
//@desc     Get lesson by id
//@acces    Public

router.get("/:id", async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id).populate('testing.user', 'name');

        if(!lesson) {
            return res.status(404).json({msg: "Thing not found"});
        }

        res.json(lesson);
    } catch(error) {
        if(error.kind === "ObjectID") {
            return res.status(404).json({msg: "Thing not found"});
        }
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//@route    PUT api/lesson/:id
//@desc     Add or update information about user's testing
//@access   Private

router.put('/:id', auth, async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        const user = await User.findById(req.user.id).select("-password");
        let isExist = false;

        lesson.testing.map((user) => {
            if(user.user.toString() === req.user.id) {
                isExist = true;
            }
        })
        
        if(isExist) {
            const removeIndex = lesson.testing.map((user) => user.user.toString()).indexOf(req.user.id);
            const trying = lesson.testing[removeIndex].trying;
            let score = 0;
            lesson.testing.splice(removeIndex, 1);
            
            if(trying + 1 == 1 && req.body.isFinished) {
                score = 1;
            } else if (trying + 1 > 1 && trying + 1 < 5 && req.body.isFinished) {
                score = 1 - trying * 0.2;
            } else if (trying + 1 >= 5 && req.body.isFinished){
                score = 0
            }
        
            lesson.testing.unshift({user: req.user.id, trying: trying + 1, score: score, isFinished: req.body.isFinished});
            user.score += score;
        } else {
            let score = 0;
            (req.body.isFinished) ? score = 1 : score = 0
            lesson.testing.unshift({user: req.user.id, trying: 1, score: score, isFinished: req.body.isFinished});
            user.score += score;
        }
        res.json(lesson);

        await lesson.save();
        await user.save();
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//@route    POST api/lesson/update/:id
//@desc     Update lesson
//@access   Private

router.post('/update/:id', async (req, res) => {
    try {
        let lesson = await Lesson.findOneAndUpdate(
            {_id: req.params.id},
            {$set: {title: req.body.title, video: req.body.video, theory: req.body.theory, question: req.body.question}},
            {new: true}
        );

        return res.json(lesson);

    } catch(error) {
        if(error.kind === "ObjectID") {
            return res.status(404).json({msg: "Урок не найден"});
        }
        res.status(500).send("Server error");
    }
});

//@route    DELETE api/lesson/:id
//@desc     Delete the lesson
//@access   Private

router.delete('/:id', async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);

        if(!lesson) {
            return res.status(404).json({msg: 'Урок не найден'});
        }

        await lesson.remove();
        res.json({msg: 'Урок удален'});

    } catch (error) {
        if(error.kind === "ObjectID") {
            return res.status(404).json({msg: "Урок не найден"});
        }
        res.status(500).send("Server error");
    }
});

module.exports = router;