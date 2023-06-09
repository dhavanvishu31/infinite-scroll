const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash Api
const count = 30;
const apiKey = '4oOMnNEAA7QgkqKHDk5gxgE2B55epWjb62Xezi4vmZk';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images were loaded
function imageLoaded(){
 
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden=true;
        console.log('ready =', ready); 
    }
}

//Helper Function to set attributes in DOM Elements
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

//create Elements for links & photos, add DOM
function displayPhotos(){
    imagesLoaded=0;
    totalImages = photosArray.length;

    //Run function for each object in photosArray
    photosArray.forEach((photo)=>{
        //create <a> to link unsplash
        const item = document.createElement('a');
       
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank',
        });
        //create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
         src:photo.urls.regular,
         alt:photo.alt_description,
         title:photo.alt_description,
        });
        img.addEventListener('load',imageLoaded);

        //put <img> inside <a>, and put both inside imagecontainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //catch error here
    }
}

//check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready=false;
        getPhotos();
    }

});

//load
getPhotos();