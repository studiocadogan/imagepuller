These are command line tools designed to make it easier to pull images from pages. `node index` will scrape any given webpage and container for images, and `node optimizer` will optimize an image provided from any given url and save it locally.

**Requirements**
* Node.js


**Bugs**

* If imagemin-mozjpeg 7.0.0 is used, you will run into an EPIPE error. Downgrade to 6.0.0 to fix this.