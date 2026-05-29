// CHART

const chart = LightweightCharts.createChart(
  document.getElementById('chart'),
  {
    width: 900,
    height: 500,
    layout: {
      background: { color: '#08111f' },
      textColor: '#DDD',
    },
    grid: {
      vertLines: { color: '#12233d' },
      horzLines: { color: '#12233d' },
    },
  }
);

const candleSeries = chart.addCandlestickSeries();

const data = [
  {
    time: '2026-05-29',
    open: 23000,
    high: 23400,
    low: 22900,
    close: 23300,
  },
  {
    time: '2026-05-30',
    open: 23300,
    high: 23500,
    low: 23200,
    close: 23450,
  },
  {
    time: '2026-05-31',
    open: 23450,
    high: 23600,
    low: 23300,
    close: 23550,
  }
];

candleSeries.setData(data);

// DERIV API

const app_id = "33p7PVqGTbhzPMv1GNtXr";

const connection = new WebSocket(
  `wss://ws.derivws.com/websockets/v3?app_id=${app_id}`
);

connection.onopen = () => {
  console.log("Connected to Deriv API");
};

connection.onmessage = (msg) => {
  const data = JSON.parse(msg.data);
  console.log(data);
};

// BUY CALL

document.querySelector(".place-buy")
.addEventListener("click", () => {

  alert("CALL order submitted");

  // Deriv buy contract code here

});

// BUY PUT

document.querySelector(".place-sell")
.addEventListener("click", () => {

  alert("PUT order submitted");

  // Deriv sell contract code here

});
