const {question} = require('readline-sync');
const fs = require('fs');
const imagemin = require('imagemin');
const gm = require('imagemin-gm');
const moz = require('imagemin-mozjpeg')
const imageminGm = new gm()

const dir = '/home/maurizio/the-macallan/test/src/assets/images/bottles/';

// let files = [];
//
// fs.readdirSync(dir).forEach(file => files.push(`${dir}/${file}`))
//
// console.log(files);

imagemin([`${dir}*quest*.png`], dir, {
    plugins: [
        imageminGm.resize({ width: 119, height: 477, gravity: 'Center' }),
    ]
})
