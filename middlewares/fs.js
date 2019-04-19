const fs = require('fs');

exports.deleteFile = (filepath) => {
    fs.unlink(filepath, (error) => {
        if(error) {
            console.log(error);
        }
    })
};