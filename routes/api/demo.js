const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");


const Demo = require('../../models/Demo');
const auth = require("../../middleware/auth");

//@route    POST api/demo
//@desc     Create a new demo
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
        const newDemo = new Demo({
            title: req.body.title,
            question: req.body.question,
            file: req.body.file
        });

        const demo = await newDemo.save();
        res.json(demo);
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//@route    POST api/demo/:id
//@desc     Upload file on server
//@access   Public

router.post("/:id", async (req, res) => {
    let filedata = req.file;
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
})

//@route    POST api/demo/add_file
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

//@route    POST api/demo/update/:id
//@desc     Update information about sending file
//@access   Public

router.post("/update/:id", auth, async (req, res) => {
    try {
        const demo = await Demo.findOneAndUpdate(
            {_id: req.params.id},
            {$set: {title: req.body.title, question: req.body.question, file: req.body.file}},
            {new: true}
        );
        
        return res.json(demo);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
})

//@route    GET api/demo
//@desc     Get all demo
//@access   Public

router.get("/",async (req, res) => {
    try  {
        const demo = await Demo.find();
        res.json(demo);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//@route    GET api/demo/download
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

//@route    GET api/demo/:id
//@desc     Get demo by id
//@acces    Public

router.get("/:id", async (req, res) => {
    try {
        //const profile = await Profile.findOne({user: req.params.user_id}).populate("user", ["name"]);
        const demo = await (await Demo.findById(req.params.id).populate('answers.user', 'name'));
        if(!demo) {
            return res.status(404).json({msg: "Thing not found"});
        }

        res.json(demo);
    } catch(error) {
        if(error.kind === "ObjectID") {
            return res.status(404).json({msg: "Thing not found"});
        }
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//@route    PUT api/practic/:id
//@desc     Update information about sending file
//@access   Public

router.put("/:id", auth, async (req, res) => {
    try {
        const demo = await Demo.findById(req.params.id);

        /*if(practic.answers.filter((answer) => answer.user.toString() === req.user.id).lenght() > 0) {
            return res.status(400).json({msg: 'Вы уже отправляли решение этого задания'});
        }*/

        demo.answers.unshift({user: req.user.id, file: req.body.file});
        await demo.save();

        res.json(demo.answers)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
})

//@route    DELETE api/demo/:id
//@desc     Delete the demo
//@access   Private

router.delete('/:id', async (req, res) => {
    try  {
        let demo = await Demo.findById(req.params.id);

        if(!demo) {
            return res.status(404).json({msg: 'Задание не найдено'});
        }

        await demo.remove();
        res.json({msg: 'Задание удалено'});
    } catch (error) {
        if(error.kind === "ObjectID") {
            return res.status(404).json({msg: "Задание не найдено"});
        }
        res.status(500).send("Server error");
    }
});

module.exports = router;