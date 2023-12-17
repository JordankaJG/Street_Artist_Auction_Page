
// Sider Images
function initVisitorHomePage(){
  biddingIcon.classList.replace("d-none", "d-block");
hamburgerMenu.classList.add("d-none");
  


const sliderRow1 = document.querySelector(".slider_row_1");
const sliderRow2 = document.querySelector(".slider_row_2");


function renderSliderImages1() {

  for (let i = 0; i < 2; i++) {
    items.forEach((artist) => {
      let imgDiv = document.createElement("div");
      imgDiv.classList.add("slider_div");
      let image = document.createElement("img");
      image.classList.add("slider_img");
      image.setAttribute("src", `${artist.image}`);

      imgDiv.appendChild(image);

      sliderRow1.appendChild(imgDiv);
      imgDiv.addEventListener("click", function () {
        location.hash = "#visitorListingPage";
      });
    });
  }
}
renderSliderImages1();

function renderSliderImages2() {

  for (i = 0; i < 2; i++) {
    items.forEach((artist) => {
      let imgDiv = document.createElement("div");
      imgDiv.classList.add("slider_div");
      let image = document.createElement("img");
      image.classList.add("slider_img");
      image.setAttribute("src", `${artist.image}`);

      imgDiv.appendChild(image);

      sliderRow2.appendChild(imgDiv);
      imgDiv.addEventListener("click", function () {
        location.hash = "#visitorListingPage";
      });
    });
  }
}
renderSliderImages2();
// Carousel

const slidesContainer = document.querySelector(".carousel-inner");
const carouselItem = document.querySelectorAll(".carousel_item");

const leftArrow = document.querySelector(".button-left");
const rightArrow = document.querySelector(".button-right");
let itemIndex = 0;

rightArrow.addEventListener("click", function () {
  itemIndex = itemIndex < 2 ? itemIndex + 1 : 0;
  slidesContainer.style.transform = "translate(" + itemIndex * -33.3 + "%)";
});

leftArrow.addEventListener("click", function () {
  itemIndex = itemIndex > 0 ? itemIndex - 1 : 2;
  slidesContainer.style.transform = "translate(" + itemIndex * -33.3 + "%)";
});



findArtBtn = document.querySelector('.find_one');
findArtBtn.addEventListener('click', () => {
    location.hash = '#visitorListingPage'
})}