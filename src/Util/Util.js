// to format commas for indian rupees
function formatIndianNumber(num) {
  const plainNumber = Number(num); // 117536
  const indianFormatted = plainNumber.toLocaleString("en-IN");
  return indianFormatted;
}

//to format million or billion
function formatToBillionMillion(num) {
  const billion = 1_000_000_000;
  const million = 1_000_000;

  if (num >= billion) {
    return (num / billion).toFixed(2) + "B"; // e.g. 2.34B
  } else if (num >= million) {
    return (num / million).toFixed(2) + "M"; // e.g. 5.67M
  } else {
    return num;
  }
}

//to get series data for one day
function getDataForOneDay(prices) {
  if (!prices || prices.length === 0) {
    return [];
  }

  // Sort prices by timestamp
  const sortedPrices = [...prices].sort((a, b) => a[0] - b[0]);

  // Group prices into 30-minute intervals
  const intervalMs = 30 * 60 * 1000; // 30 minutes
  const groupedData = {};

  sortedPrices.forEach(([timestamp, price]) => {
    const intervalStart = Math.floor(timestamp / intervalMs) * intervalMs;

    if (!groupedData[intervalStart]) {
      groupedData[intervalStart] = [];
    }
    groupedData[intervalStart].push(price);
  });

  // Convert to OHLC format
  const candlestickData = Object.keys(groupedData)
    .map((timestamp) => {
      const intervalPrices = groupedData[timestamp];
      const open = intervalPrices[0].toFixed(2);
      const close = intervalPrices[intervalPrices.length - 1].toFixed(2);
      const high = Math.max(...intervalPrices).toFixed(2);
      const low = Math.min(...intervalPrices).toFixed(2);

      return {
        x: new Date(parseInt(timestamp)),
        y: [open, high, low, close],
      };
    })
    .sort((a, b) => a.x.getTime() - b.x.getTime());

  return candlestickData;
}

//to get series data for seven days
function getDataForSevenDays(prices) {
  if (!prices || prices.length === 0) {
    return [];
  }

  // Sort prices by timestamp
  const sortedPrices = [...prices].sort((a, b) => a[0] - b[0]);

  // Group prices into 4-hour intervals
  const intervalMs = 4 * 60 * 60 * 1000; // 4 hours
  const groupedData = {};

  sortedPrices.forEach(([timestamp, price]) => {
    const intervalStart = Math.floor(timestamp / intervalMs) * intervalMs;

    if (!groupedData[intervalStart]) {
      groupedData[intervalStart] = [];
    }
    groupedData[intervalStart].push(price);
  });

  // Convert to OHLC format
  const candlestickData = Object.keys(groupedData)
    .map((timestamp) => {
      const intervalPrices = groupedData[timestamp];
      const open = intervalPrices[0];
      const close = intervalPrices[intervalPrices.length - 1];
      const high = Math.max(...intervalPrices);
      const low = Math.min(...intervalPrices);

      return {
        x: new Date(parseInt(timestamp)),
        y: [open, high, low, close],
      };
    })
    .sort((a, b) => a.x.getTime() - b.x.getTime());

  return candlestickData;
}

//to get series data for 30 days
function getDataForMonth(prices) {
  if (!prices || prices.length === 0) {
    return [];
  }

  // Sort prices by timestamp
  const sortedPrices = [...prices].sort((a, b) => a[0] - b[0]);

  // Group prices into 1-day intervals
  const intervalMs = 24 * 60 * 60 * 1000; // 1 day
  const groupedData = {};

  sortedPrices.forEach(([timestamp, price]) => {
    const intervalStart = Math.floor(timestamp / intervalMs) * intervalMs;

    if (!groupedData[intervalStart]) {
      groupedData[intervalStart] = [];
    }
    groupedData[intervalStart].push(price);
  });

  // Convert to OHLC format
  const candlestickData = Object.keys(groupedData)
    .map((timestamp) => {
      const intervalPrices = groupedData[timestamp];
      const open = intervalPrices[0];
      const close = intervalPrices[intervalPrices.length - 1];
      const high = Math.max(...intervalPrices);
      const low = Math.min(...intervalPrices);

      return {
        x: new Date(parseInt(timestamp)),
        y: [open, high, low, close],
      };
    })
    .sort((a, b) => a.x.getTime() - b.x.getTime());

  return candlestickData;
}

export {
  formatIndianNumber,
  formatToBillionMillion,
  getDataForOneDay,
  getDataForSevenDays,
  getDataForMonth,
};
