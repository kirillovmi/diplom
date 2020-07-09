const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//@route    POST api/users
//@desc     Register user
//@access   Public

router.post("/", [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Plaese include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more character").isLength({min: 6})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;


    try {
        let user = await User.findOne({email});

        if(user) {
            return res.status(400).json({errors: [{msg: "User already exist"}]});
        }

        user = new User({
            name, 
            email,
            password
        });

        const payload = {
            user: {
                id: {
                    id: user.id
                }
            }
        };

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        jwt.sign(payload, config.get("jwtSecret"), {expiresIn: 360000}, (error, token) => {
            if(error) throw error;
            res.json({token});
        });

    } catch(error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;