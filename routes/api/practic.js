const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");


const Practic = require('../../models/Practic');
const auth = require("../../middleware/auth");

//@route    POST api/practic
//@desc     Create a new practic
//@access   Private

router.post("/", [
    check("title", "Title id required").not().isEmpty(),
    check("question", "Question is required").not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const newPractic = new Practic({
            title: req.body.title,
            question: req.body.question,
            file: req.body.file
        });

        const practic = await newPractic.save();
        res.json(practic);
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//@route    POST api/practic/:id
//@desc     Upload file on server
//@access   Public

router.post("/:id", async (req, res) => {
    let filedata = req.file;
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
})

//@route    POST api/practic/add_file
//@desc     Upload file on server from profile
//@access   Public
router.post("/add_file", async (req, res) => {
    let filedata = req.file;
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});

//@route    POST api/practic/update/:id
//@desc     Update information about sending file
//@access   Public

router.post("/update/:id", auth, async (req, res) => {
    try {
        const practic = await Practic.findOneAndUpdate(
            {_id: req.params.id},
            {$set: {title: req.body.title, question: req.body.question, file: req.body.file}},
            {new: true}
        );
        
        return res.json(practic);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
})

//@route    GET api/practic
//@desc     Get all practics
//@access   Public

router.get("/",async (req, res) => {
    try  {
        const practics = await Practic.find();
        res.json(practics);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//@route    GET api/practic/download
//@desc     Download file from server
//@access   Public
router.get('/download/:id', async (req, res) => {
    try {
        res.download(__dirname.replace('routes\\api', '') + 'uploads\\' + req.params.id, req.params.id);
    } catch (error) {
        if(error.kind === "ObjectID") {
            return res.status(404).json({msg: "Thing not found"});
        }
        res.status(500).send("Server error");
    }
});

//@route    GET api/practic/:id
//@desc     Get practic by id
//@acces    Public

router.get("/:id", async (req, res) => {
    try {
        //const profile = await Profile.findOne({user: req.params.user_id}).populate("user", ["name"]);
        const practic = await (await Practic.findById(req.params.id).populate('answers.user', 'name'));
        if(!practic) {
            return res.status(404).json({msg: "Thing not found"});
        }

        res.json(practic);
    } catch(error) {
        if(error.kind === "ObjectID") {
            return res.status(404).json({msg: "Thing not found"});
        }
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//@route    DELETE api/practic/:id
//@desc     Delete the practic
//@access   Private

//@route    PUT api/practic/:id
//@desc     Update information about sending file
//@access   Public

router.put("/:id", auth, async (req, res) => {
    try {
        const practic = await Practic.findById(req.params.id);

        /*if(practic.answers.filter((answer) => answer.user.toString() === req.user.id).lenght() > 0) {
            return res.status(400).json({msg: 'Вы уже отправляли решение этого задания'});
        }*/

        practic.answers.unshift({user: req.user.id, file: req.body.file});
        await practic.save();

        res.json(practic.answers)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
})

router.delete('/:id', async (req, res) => {
    try  {
        let practic = await Practic.findById(req.params.id);

        if(!practic) {
            return res.status(404).json({msg: 'Задание не найдено'});
        }

        await practic.remove();
        res.json({msg: 'Задание удалено'});
    } catch (error) {
        if(error.kind === "ObjectID") {
            return res.status(404).json({msg: "Задание не найдено"});
        }
        res.status(500).send("Server error");
    }
});

module.exports = router;