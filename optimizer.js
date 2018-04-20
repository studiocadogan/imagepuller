const {question} = require('readline-sync');
const download = require('image-downloader');
const imagemin = require('imagemin');
const moz = require('imagemin-mozjpeg')
const fs = require('fs');

console.log(process.cwd())

const imageToBeOptimized = question('Which image would you like to optimize? ')

const options = {
    url: imageToBeOptimized,
    dest: `${process.cwd()}/downloaded`
}

if (!fs.existsSync(`${process.cwd()}/downloaded`)) {
    fs.mkdirSync(`${process.cwd()}/downloaded`, 0o744)
}

if (!fs.existsSync(`${process.cwd()}/optimized`)) {
    fs.mkdirSync(`${process.cwd()}/optimized`, 0o744)
}


download.image(options)
    .then(({filename, image}) => optimize(filename)).then(file => console.log(`Saved to ${file}`)).catch(err => console.log('File upload failed'))

function optimize(filename) {
    return imagemin([filename], `${process.cwd()}/optimized`, {
        plugins: [
            moz({quality: 80})
        ]
    })
        .then(file => file[0].path).catch(err => console.log(err))

}

