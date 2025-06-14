const express = require("express");
const { dBConnect } = require("./Config/database");
const { cloudinaryConnect } = require("./Config/cloudinary");
const cookieParser = require("cookie-parser");
const app = express();
require('dotenv').config();
const cors = require('cors');
const fileUpload = require("express-fileupload");
const authRoutes = require('./Routes/authRoutes');
const searchRoutes = require('./Routes/searchRoutes'); 
const creationRoutes = require('./Routes/creationRoutes');
const path = require("path");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server connected to port: ${PORT}`);
});

app.use(express.static(path.join(__dirname, "../Frontend/build")));

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "../Frontend/build/index.html"));
})

//middlewares
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: true,
    credentials: true
}

app.use(cors(corsOptions));

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp/"
    })
)

//connect to database
dBConnect();

//cloudinary connect
cloudinaryConnect();

//routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/search',searchRoutes);
app.use('/api/v1/create',creationRoutes);

app.use("/",(req,res) => {
    return res.json({
        success:true,
        message:"Your server is up and running"
    })
});