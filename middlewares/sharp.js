const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const path = require('path');

class Resize {
    constructor(folder) {
        this.folder = folder;
    }

    save(input, callback) {
        const filename = Resize.filename();
        const originalPath = this.filepath(filename.original);
        const thumbnailPath = this.filepath(filename.thumbnail);
        const promises = [];

        //Save original photo
        promises.push(sharp(input).toFile(originalPath));

        //Resize to small for thumbnails
        promises.push(
            sharp(input).resize(500, 500, {
                fit: sharp.fit.inside,
                withoutEnlargement: true,
            })
                .toFile(thumbnailPath)
        );

        Promise.all(promises)
            .then(() => {
                console.log('saved all photos');

                const filePaths = {
                    thumbnail: thumbnailPath,
                    original: originalPath,
                    filename: filename.plain
                };

                callback(filePaths);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    static filename() {
        const filename = uuidv4();

        return { thumbnail: `${filename}_thumbnail.png`, original: `${filename}.png`, plain: filename };
    }

    filepath(filename) {
        return path.resolve(`${this.folder}/${filename}`)
    }
}
module.exports = Resize;