const itemTitleInput = document.querySelector('#item-input');
const artistInput = document.querySelector('#artist-input-select');
const minPriceInput = document.querySelector('#min-price-input');
const maxPriceInput = document.querySelector('#max-price-input');
const typeInput = document.querySelector('#type-input-select');

const visitorListingItemsContainer = document.querySelector('#visitorListingItems')

function initVisitorListingPage() {
  const doneBtn = document.querySelector('.filter-button-done');
  const filterBtn = document.querySelector('.filters-button')
  const filterClose = document.querySelector('.filter-button-close')
  const filterMenu = document.querySelector('.filter-menu');

  const items_LS = JSON.parse(localStorage.getItem('items')) ? JSON.parse(localStorage.getItem('items')) : items;
  

  // Render published cards
  visitorListingItemsContainer.innerHTML = '';
  const storageItemsToRender = items_LS.filter(item => item.isPublished)
  storageItemsToRender.forEach(({
    image,
    title,
    description,
    price,
    artist
  }, index) => {
    renderVisitorCard(index, image, artist, price, title, description)
  })

  // Filter buttons 
  if (filterMenu.classList.contains('filter-menu-active')) {
    filterMenu.classList.remove('filter-menu-active');
    filterBtn.style.display = 'block';
  }

  doneBtn.style.display = 'none';
  filterBtn.addEventListener('click', () => {
    filterMenu.classList.add('filter-menu-active')
    filterBtn.style.display = 'none';
    doneBtn.style.display = 'block';
  })
  filterClose.addEventListener('click', () => {
    filterMenu.classList.remove('filter-menu-active');
    filterBtn.style.display = 'block';
    doneBtn.style.display = 'none';
  })

  // Fill artists 
  fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()).then(data => {
    data.forEach(user => {
      artistInput.innerHTML += `
        <option value="${user.name}">${user.name}</option>
    `
    })
  })
  // Fill type 
  itemTypes.forEach((type) => {
    typeInput.innerHTML += `
        <option value="${type}">${type}</option>
    `
  })

  // Filter cards
  doneBtn.addEventListener('click', () => {
    filterMenu.classList.remove('filter-menu-active');

    const filteredItemsToRender = items_LS.filter(item => item.isPublished &&
      (itemTitleInput.value ? item.title.toLowerCase().includes(itemTitleInput.value.toLowerCase()) : true) &&
      (artistInput.value ? item.artist === artistInput.value : true) &&
      (minPriceInput.value.toString() ? item.price > minPriceInput.value : true) &&
      (maxPriceInput.value.toString() ? item.price < maxPriceInput.value : true) &&
      (typeInput.value ? item.type === typeInput.value : true))

    visitorListingItemsContainer.innerHTML = '';
    filteredItemsToRender.forEach(({
      image,
      title,
      description,
      price,
      artist
    }, index) => {
      renderVisitorCard(index, image, artist, price, title, description)

      minPriceInput.value = '';
      maxPriceInput.value = '';
      itemTitleInput.value = '';
      typeInput.value = '';
      artistInput.value = '';
    })

    //  filter close
    filterMenu.classList.remove('filter-menu-active');
    filterBtn.style.display = 'block';
    doneBtn.style.display = 'none';
  })
}

function renderVisitorCard(index, image, artist, price, title, description) {
  if (index % 2 !== 0) {
    visitorListingItemsContainer.innerHTML += `<div class="art-card col-lg-4 inverse-card mb-4 p-0 ">

        <div class="image-div">
          <img  class="img-fluid "src="${image}" />
        </div>
        <div class="content-div p-4">
          <div
            class="artist-price d-flex justify-content-between align-items-center my-2"
          >
            <h3 class="reenie-font font-color-light">${artist}</h3>
            <div class="price font-color-dark-brown bg-color-light price-tag">$${price}</div>
          </div>
          <h6 class="item-artist-title font-color-light ">${title}</h6>
          <p class="card-desc font-color-light ">
            ${description}
           </p>
         </div>
  
       </div>`;
      //  div
  } else {
    visitorListingItemsContainer.innerHTML += `<div class="art-card col-lg-4 mb-4 p-0">
  
      
        <div class="image-div">
          <img src="${image}"  />
        </div>
        <div class="content-div p-4">
          <div
            class="artist-price d-flex justify-content-between align-items-center my-2"
          >
            <h3 class="reenie-font font-color-dark-brown">${artist}</h3>
            <div class="price font-color-light bg-color-dark price-tag">$${price}</div>
          </div>
          <h6 class="  item-artist-title font-color-dark-brown">${title}</h6>
          <p class="card-desc font-color-dark-brown t">
            ${description}
           </p>
        
         </div>

       </div>`;
  }
}