const biddingsUl = document.querySelector("#biddings");
const biddingsUlOther = document.querySelector("#otherBiddings");
const yourBid = document.querySelector(".yourBids");
const otherBid = document.querySelector(".otherBids");
let yourBids = [];

let otherBids = [];
let itemFormLs = JSON.parse(localStorage.getItem("items"));

const auctionImage = document.querySelector(".auctionImage");
const auctionContent = document.querySelector(".auctionContent");
const auctionArtistName = document.querySelector(".auctionArtistName");
const auctionStartingPrice = document.querySelector(".auctionStartingPrice");
const auctionDescription = document.querySelector(".auctionDescription");
const auctionTitle = document.querySelector(".auctionTitle");
const liveAuctioningItem = document.querySelector(".liveAuctioningItem");
const auctioningItemIndex = itemFormLs.findIndex((item) => item.isAuctioning);
console.log(auctioningItemIndex);

if (
  auctioningItemIndex !== -1 &&
  itemFormLs[auctioningItemIndex].artist === localStorage.getItem("artistName")
) {
  if (!+yourBids[+yourBids.length - 1] && +otherBids[+otherBids.length - 1]) {
    liveAuctioningItem.innerHTML = `Currently unavailable`;
  } else {
    if (+yourBids[+yourBids.length - 1] > +otherBids[otherBids.length - 1]) {
      liveAuctioningItem.innerHTML = `$${+yourBids[+yourBids.length - 1]}`;
    } else {
      liveAuctioningItem.innerHTML = `$${+otherBids[+otherBids.length - 1]}`;
    }
  }
} else {
  liveAuctioningItem.innerHTML = `Currently unavailable`;
}

function initAuctionPage() {
  headerName.innerText = "Auction";

  biddingIcon.classList.replace("d-block", "d-none");
  hamburgerMenu.classList.add("d-none");

  yourBid.innerHTML += ``;

  const noAuctionElement = document.querySelector(".noAuctionInProgress");
  const auctionInnerElement = document.querySelector(".auctionInner");

  noAuctionElement.classList.add("d-none");
  auctionInnerElement.classList.remove("d-none");

  const activeAuction = items_LS.filter((item) => item.isAuctioning);

  if (activeAuction.length === 0) {
    noAuctionElement.classList.remove("d-none");
    auctionInnerElement.classList.add("d-none");
  } else {
    startTimer();
  }

  const input = document.querySelector(".bidAmount");
  const bidBtn = document.querySelector(".bidBtn");

  const auctioningItemIndex = items_LS.findIndex((item) => item.isAuctioning);
  console.log(auctioningItemIndex);

  if (auctioningItemIndex !== -1) {
    items_LS[auctioningItemIndex].isAuctioning = true;
    auctionImage.src = items_LS[auctioningItemIndex].image;
    auctionArtistName.innerText = items_LS[auctioningItemIndex].artist;
    auctionStartingPrice.innerText = Math.floor(
      items_LS[auctioningItemIndex].price / 2
    );
    auctionDescription.innerText = items_LS[auctioningItemIndex].description;
  }

  input.value = auctionStartingPrice.innerText;

  if (localStorage.getItem("artistName")) {
    bidBtn.disabled = true;
    bidBtn.innerText = "Disabled for artists";
    bidBtn.style.backgroundColor = "grey";
    return;
  } else {
    bidBtn.disabled = false;
    bidBtn.innerText = "Place your bid";
    bidBtn.style.backgroundColor = "#a16a5e";
  }

  bidBtn.removeEventListener("click", callBidApi);
  bidBtn.addEventListener("click", callBidApi);

  function callBidApi() {
    const bidAmount = input.value;
    input.value = +bidAmount + 30;
    yourBid.innerHTML += `<li class="bid"><i class="fa-solid fa-money-bill-wave" style="color: #27b42a;"></i> $${+bidAmount}</li>`;
 
    yourBids.push(+bidAmount);


    const formData = new FormData();
    const bidApi = "https://projects.brainster.tech/bidding/api";
    formData.append("amount",bidAmount)
    fetch(bidApi,{
      method:"POST",
      body:formData
    }).then(res=>res.json()).then(data=>{
     
      if(data.isBidding){
        otherBid.innerHTML += `<li class="otherBid">${data.bidAmount}<i class="fa-solid fa-money-bill-wave" style="color: #f05247;"></i></li>`;
                       otherBids.push(+data.bidAmount);
      }else{

 biddingsUl.innerHTML = `Bidding is over!!!`;
      }
    })

    removeEventListener("click", callBidApi);
  }
}

function startTimer() {
  const auctioningItemIndex = itemFormLs.findIndex((item) => item.isAuctioning);
  const timeElement = document.getElementById("time");
  let time;

  if (+localStorage.getItem("time") > 0) {
    time = +localStorage.getItem("time");
  } else {
    time = 120;
    localStorage.setItem("time", time);
    time = +localStorage.getItem("time");
  }

  const timerInterval = setInterval(() => {
    time -= 1;
    localStorage.setItem("time", time);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    timeElement.innerText = `${minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;

    if (time === 0) {
      clearInterval(timerInterval);

      items_LS[auctioningItemIndex].dateSold = new Date().toJSON();
      if (+yourBids[+yourBids.length - 1] > +otherBids[otherBids.length - 1]) {
        items_LS[auctioningItemIndex].priceSold =
          +yourBids[yourBids.length - 1];

        timeElement.innerText = `You won the auction! Item sold for $${+yourBids[
          yourBids.length - 1
        ]}`;
      } else {
        items_LS[auctioningItemIndex].priceSold =
          +otherBids[otherBids.length - 1];
        timeElement.innerText = `You lost the auction! Item sold for $${+otherBids[
          otherBids.length - 1
        ]}`;
      }

      items_LS[auctioningItemIndex].isAuctioning = false;

      update_LS(items_LS);
      updateCards();
    }
  }, 1000);
}
