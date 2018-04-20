const {get} = require('axios');
const fs = require('fs');
let cheerio = require('cheerio');
const cheerioAdv = require('cheerio-advanced-selectors');
const downloader = require('image-downloader');
const {question} = require('readline-sync');



cheerio = cheerioAdv.wrap(cheerio);

const pageUrl = question("What is the URL of the site you're scraping?");
const page = question("Which page are you scraping?")

const elementsToFind = question('What is the class name/id of the elements you are scraping?');
const elementSource = question('What attribute contains the media url?');

const elementSourceIsStyle = elementSource === 'style'


get(`${pageUrl}/${page.length > 0 ? page : ''}`).then(res => getImages(res.data)).catch(err => console.log(`failed: ${err}`))

function getImages(page){
    const $ = cheerio.load(page);
    const arrayOfImages = [];

    $(elementsToFind).find('img').each((i, elem) => arrayOfImages.push($(elem).attr(elementSourceIsStyle ? elementSource : elementSource.replace('background-image', ''))))

    arrayOfImages.map((image, indx) => getImage(`${pageUrl}${image}`, indx)
    )


    fs.writeFile('images.html', arrayOfImages)
    console.log('success')
}

function getImage(image, indx){

    const options = {
        url: image.replace(pageUrl, ''),
        dest: '/home/maurizio/projects/imagepuller'
    }

    downloader.image(options).then(({filename, image}) => console.log(`File saved to ${filename}`)).catch(err => console.log(err));

}