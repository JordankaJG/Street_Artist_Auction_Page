function initArtistsPage() {
  hamburgerMenu.classList.remove("d-none");
 biddingIcon.classList.add("d-none");
// random datesold in the items array
  function getRandomDate() {
    const start = new Date("2023-10-01").getTime();
    const end = new Date("2023-10-18").getTime();

    // Generate a random timestamp between start and end
    const randomTimestamp = start + Math.random() * (end - start);

    // Create a new Date object from the random timestamp
    const randomDate = formatDate(new Date(randomTimestamp));

    return randomDate;
  }

  let randomDate = getRandomDate();
  console.log(randomDate);

  items.map((item) => {
    item.dateSold = randomDate;
  });

  const items_LS = JSON.parse(localStorage.getItem("items"))
    ? JSON.parse(localStorage.getItem("items"))
    : items;

  // Artist name in header on reload page
  currentLoggedArtist = localStorage.getItem("artistName");
  headerName.innerText = currentLoggedArtist;

  const soldItemsParagraph = document.querySelector(".soldItemsParagraph");
  const totalItemsParagraph = document.querySelector(".totalItemsParagraph");
  const totalIncomeParagraph = document.querySelector(".totalIncomeParagraph");

  let soldItems = 0;
  let totalIncome = 0;

  const artistArt = items_LS.filter(
    (item) => item.artist === currentLoggedArtist
  );
  artistArt.forEach((artist) => {
    if (artist.priceSold) {
      soldItems++;
      totalIncome += artist.priceSold;
    }
  });
  console.log(soldItems);
  console.log(totalIncome);

  soldItemsParagraph.innerText = soldItems;
  totalItemsParagraph.innerText = artistArt.length;
  totalIncomeParagraph.innerText = totalIncome;

  const itemsSoldByArtist = items_LS.filter(
    (item) => item.artist === currentLoggedArtist && !!item.priceSold
  );


  // Chart
  const canvasDiv = document.querySelector(".canvas");

  canvasDiv.innerHTML = "";

  canvasDiv.innerHTML = '<canvas id="myChart" height="260"></canvas>';

  const ctx = document.getElementById("myChart");

  let myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "Amount",
          backgroundColor: "#a16a5e",
          hoverBackgroundColor: "#d54c2e",
          data: [],
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: "y",
      scales: {
        x: {
          min: 0,
          max: 100,
        },
      },
    },
  });

  const last7 = document.querySelector("#last7");
  last7.addEventListener("click", function () {
    renderChartData(7);
    last7.style.backgroundColor = "#d54c2e";
    last14.style.backgroundColor = "#a16a5e";
    last30.style.backgroundColor = "#a16a5e";
  });
  const last14 = document.querySelector("#last14");
  last14.addEventListener("click", function () {
    renderChartData(14);
    last7.style.backgroundColor = "#a16a5e";
    last14.style.backgroundColor = "#d54c2e";
    last30.style.backgroundColor = "#a16a5e";
  });
  const last30 = document.querySelector("#last30");
  last30.addEventListener("click", function () {
    renderChartData(30);
    last7.style.backgroundColor = "#a16a5e";
    last14.style.backgroundColor = "#a16a5e";
    last30.style.backgroundColor = "#d54c2e";
  });

  function renderChartData(days) {
    let labels = generateDates(days);

    const newData = labels.map((label) => {
      let sum = 0;
      itemsSoldByArtist.forEach((item) => {
        if (item.dateSold === label) {
          sum = item.priceSold + sum;
          console.log(sum);
        }
      });

      return sum;
    });

    labels = labels.map((label) => label.slice(0, 2));
    myChart.data.labels = labels;

    myChart.data.datasets[0].data = newData;

    myChart.update();
  }

  last7.click();
}

function generateDates(daysAgo) {
  const arr = [];

  for (let i = 0; i < daysAgo; i++) {
    const start = new Date();
    const startDate = start.getDate();
    const beforeDate = start.setDate(startDate - i);

    const formattedDate = formatDate(beforeDate);

    arr.push(formattedDate);
  }

  return arr;
}

function formatDate(dateNumber) {
  return new Date(dateNumber).toLocaleDateString("en-GB");
}
