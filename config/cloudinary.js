const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "dcm2mtvq9",
    api_key: "658225375394325",
    api_secret: "FFQGLs0Ytl73H0RXsmeHHCaYCyk",
    secure: true,
});

module.exports = cloudinary;