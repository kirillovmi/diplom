const express = require("express");
const connectDb = require("./config/db");
const cors = require("cors");
const multer = require('multer');

const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

//Connect DataBase
connectDb();

//Init Middleware
app.use(express.json({extended: false}));
app.use(cors());

app.use(express.static(__dirname));
app.use(multer({storage:storageConfig}).single("file"));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/lesson", require("./routes/api/lesson"));
app.use("/api/practic", require("./routes/api/practic"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/demo", require("./routes/api/demo"));


if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    });
}


app.listen(PORT);