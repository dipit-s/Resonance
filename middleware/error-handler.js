
module.exports = errorHandler;
const multer = require("multer");

function errorHandler(err, req, res) {
    if (typeof err === "string") {
        // custom application error
        return res.status(400).json({success:false, data: err });
    }

    else if (err.name === "ValidationError") {
        // mongoose validation error
        return res.status(400).json({ success:false,data: err.message });
    }

    else if (req.fileValidationError) {
        return res.status(400).json({ success:false,data: req.fileValidationError });
    }

    else if (err instanceof multer.MulterError) {
        // multer error in file upload
        return res.status(400).json({ success:false,data: err });
    }
    else if (err.name === "UnauthorizedError") {
        // jwt authentication error
        return res.status(401).json({ success:false ,data: "Invalid Token" });
    }

    // default to 500 server error
    return res.status(500).json({ success:false,data: err.message });
}