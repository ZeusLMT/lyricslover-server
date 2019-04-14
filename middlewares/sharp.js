const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const path = require('path');

class Resize {
    constructor(folder) {
        this.folder = folder;
    }

    save(input, callback) {
        const filename = Resize.filename();
        const thumbnailPath = `${this.filepath(filename)}.png`;

        //Resize to small for thumbnails
        sharp(input).resize(500, 500, {
            fit: sharp.fit.inside,
            withoutEnlargement: true,
        })
            .toFile(thumbnailPath)
            .then(() => {
                callback(thumbnailPath);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    static filename() {
        return uuidv4();
    }

    filepath(filename) {
        return path.resolve(`${this.folder}/${filename}`)
    }
}
module.exports = Resize;