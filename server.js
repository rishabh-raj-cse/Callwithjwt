const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const User = require('./models/role.js')


// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use(express.json())
// DB Config
//const db = require('mongodb+srv://m001-student:eklavyaraj12065@cluster0.pdumx.mongodb.net/ecommerce?retryWrites=true&w=majority').mongoURI;



// Connect to Mongo

mongoose.connect('mongodb+srv://m001-student:eklavyaraj12065@cluster0.pdumx.mongodb.net/ecommerce?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//middleware
const authRoute = require('./routes/auth.js');
app.use('/api/user', authRoute);


app.use('/api/posts', require('./routes/posts.js'));



















// // Route for monogoose
// app.get('/role', (req, res) => {

//     const role = new User({
//         userName: "rishabh",
//         password: "rishabh",
//         role: "admin"
//     });

//     role.save()
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while creating the Role."
//             });
//         });
// });









// Port
// const port = process.env.PORT || 5000;

// const jwt = require('jsonwebtoken');

// const secret = 'secret';

// const generateToken = (user) => {
//     return jwt.sign({
//         user
//     }, secret, {
//         expiresIn: '1h'
//     });
// }


// app.post('/login', (req, res) => {
//     const { userName, password } = req.body;
//     User.findOne({ userName, password })
//         .then(user => {
//             if (!user) {
//                 return res.status(401).send({
//                     message: 'Invalid Credentials'
//                 });
//             }
//             const token = generateToken(user);
//             res.status(200).send({
//                 user,
//                 token
//             });
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while creating the Role."
//             });
//         });
// });


// // app.get('/', (req, res) => {
// //     res.send('Hello World');
// // });








app.listen(5000, () => console.log(`Server started on port 5000`));








