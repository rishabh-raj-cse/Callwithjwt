const router = require('express').Router();
const User = require('../models/role.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');





router.post('/register', async (req, res) => {

    const userExist = await User.findOne({ userName: req.body.userName });


    if (userExist) { return res.status(400).send('User already exist'); }


    //  hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        userName: req.body.userName,
        password: hashedPassword,
        role: req.body.role
    });

    user.save()
        .then(data => {
            console.log(data)
            res.send({ user: data._id });
        })

    res.send({ user: user._id })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Role."
            });
        });



})




// Login
router.post('/login', async (req, res) => {

    const userValid = await User.findOne({ userName: req.body.userName });
    if (!userValid) return res.status(400).send('Invalid username or password');



    //  compare the password
    const validpass = bcrypt.compare(req.body.password, userValid.password)

    if (!validpass) return res.status(400).send('Invalid username or password');

    const token = jwt.sign({
        _id: userValid._id,
    }, "secret", {
        expiresIn: '1h'
    });
    res.header('auth-token', token).send(token);




    res.status(200).send({})
    //     user: userValid,
    //     token
    // });
});

module.exports = router;