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

//middlewares
app.use(express.json());
app.use(cookieParser());

const frontendPath = path.join(__dirname, "../Frontend/build");

app.use(
    cors({
        origin:"https://insurance-gallery.onrender.com",
        credentials:true
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp/"
    })
)

//routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/search',searchRoutes);
app.use('/api/v1/create',creationRoutes);

//connect to database
dBConnect();

//cloudinary connect
cloudinaryConnect();

if(process.env.NODE_ENV === "production"){
    app.use(express.static(frontendPath));

    app.get(/^\/(?!api).*/, (req,res) => {
        res.sendFile(path.join(frontendPath,"index.html"));
    })
}

app.use("/",(req,res) => {
    return res.json({
        success:true,
        message:"Your server is up and running"
    })
});