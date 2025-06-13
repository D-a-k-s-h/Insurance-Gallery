const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {
        let token = null;

        // Safely get token from header
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.replace("Bearer ", "");
        } 
        else if (req.body.token) {
            token = req.body.token;
        } 
        else if (req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(404).json({
                success: false,
                message: "Token not found"
            });
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token cannot be verified"
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Token cannot be verified"
        });
    }
    next();
}