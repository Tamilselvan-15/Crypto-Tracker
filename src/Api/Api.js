import client from "../Client/Client";

//get API for Coin Price Details
const getCoinPriceDetails = async (coin, days) => {
  try {
    let URL = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`;
    const response = await client(URL, {}, "GET");
    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//get API for Coin Information Details
const getCoinInfoDetails = async () => {
  try {
    let URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false`;
    //let URL = "http://localhost:5000/coins";
    const response = await client(URL, {}, "GET");
    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export { getCoinPriceDetails, getCoinInfoDetails };
