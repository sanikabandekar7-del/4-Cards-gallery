// ==========================
// CATEGORY FILTER
// ==========================

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const category = button.dataset.category;

        galleryItems.forEach(item => {

            if(item.classList.contains(category)){
                item.style.display = "block";
            }
            else{
                item.style.display = "none";
            }

        });

    });

});


// ==========================
// LIGHTBOX
// ==========================

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");

const closeBtn = document.querySelector(".close-btn");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentImages = [];
let currentIndex = 0;


// Open Lightbox

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        const category = [...item.classList].find(c =>
            c !== "gallery-item"
        );

        currentImages = [...document.querySelectorAll("." + category)];

        currentIndex = currentImages.indexOf(item);

        showImage();

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


// Show Image

function showImage(){

    const item = currentImages[currentIndex];

    const img = item.querySelector("img");

    const title = item.querySelector("h3");

    lightboxImage.src = img.src;

    lightboxTitle.innerHTML = title.innerHTML;

}


// Next

nextBtn.onclick = () => {

    currentIndex++;

    if(currentIndex >= currentImages.length){

        currentIndex = 0;

    }

    showImage();

};


// Previous

prevBtn.onclick = () => {

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = currentImages.length-1;

    }

    showImage();

};


// Close

function closeLightbox(){

    lightbox.classList.remove("active");

    document.body.style.overflow = "auto";

}

closeBtn.onclick = closeLightbox;


// Click outside image

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        closeLightbox();

    }

});


// Keyboard Controls

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("active")) return;

    if(e.key==="ArrowRight"){

        nextBtn.click();

    }

    else if(e.key==="ArrowLeft"){

        prevBtn.click();

    }

    else if(e.key==="Escape"){

        closeLightbox();

    }

});