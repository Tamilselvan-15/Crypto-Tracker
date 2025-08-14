import CryptoNavBar from "./CryptoNavBar";
import CryptoCard from "./CryptoCard";
import PriceChart from "./PriceChart";
import CircleLoader from "./CircleLoader";
import NetworkError from "./NetworkError";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCoinInfoDetails } from "../Api/Api";
import { setSelectedDays, setSelectedCoin } from "../store/coinFilterSlice";
import {
  setRefreshCoin,
  useRefreshCoin,
  setHomeLoader,
  useHomeLoader,
} from "../Client/ClientState";

const HomePage = () => {
  const refreshProxy = useRefreshCoin();
  const refresh = refreshProxy.value;

  const isLoading = useHomeLoader().value;

  const selectedCoin = useSelector((state) => state.coinFilter.selectedCoin);
  const dispatch = useDispatch();
  const [searchCoin, setSearchCoin] = useState("");

  const [searchDataSet, setSearchDataSet] = useState([]);
  const [error, setError] = useState(false);
  const [coinValue, setCoinValue] = useState({});
  const [noMatchFound, setNoMatchFound] = useState(false);

  // to fetch coin data initially and on manual refresh
  useEffect(() => {
    if (refresh) {
      if (isLoading) {
        getCoinDetails();
      }
      setRefreshCoin(false);
    }
  }, [refresh, isLoading]);

  // to fetch coin data when selectedCoin changes
  useEffect(() => {
    if (!error) getCoinDetails();
  }, [selectedCoin, error]);

  //to perform search when searchCoin input changes
  useEffect(() => {
    if (searchCoin.length > 2) {
      if (error) {
        setError(false);
      }
      handleSearchCoin();
    }
  }, [searchCoin]);

  // to format coin data
  const normalizeCoinData = (coin) => {
    return {
      coinId: coin.id,
      coinSymbol: coin.symbol,
      marketCap: coin.market_cap,
      marketCapChangePercentage24h: coin.market_cap_change_percentage_24h,
      currentPrice: coin.current_price,
      coinImage: coin.image,
    };
  };

  const getCoinDetails = async () => {
    try {
      const coinData = await getCoinInfoDetails();
      setSearchDataSet(coinData);

      // Set the selected coin if it exists in the list
      const foundCoin = coinData.find((coin) => coin.id === selectedCoin);
      if (foundCoin) {
        setCoinValue(normalizeCoinData(foundCoin));
      }
    } catch (err) {
      console.error("Error fetching coin data:", err);
      setError(true);
    } finally {
      setHomeLoader(false);
    }
  };

  // Handles search input to find and select a coin
  const handleSearchCoin = () => {
    const query = searchCoin.toLowerCase().trim();
    if (!query || searchDataSet.length === 0) return;

    const matchedCoin = searchDataSet.find(
      (coin) =>
        coin.symbol === query.toLowerCase() || coin.id === query.toLowerCase()
    );

    if (matchedCoin) {
      setCoinValue(normalizeCoinData(matchedCoin));
      dispatch(setSelectedCoin(matchedCoin.id));
      dispatch(setSelectedDays(1));
      setNoMatchFound(false);
    } else {
      setNoMatchFound(true);
    }
  };

  return (
    <>
      <CryptoNavBar
        searchCoin={searchCoin}
        setSearchCoin={setSearchCoin}
        noMatchFound={noMatchFound}
        setError={setError}
      />
      {error ? (
        <NetworkError setError={setError} />
      ) : (
        <div>
          {isLoading ? (
            <CircleLoader />
          ) : (
            <div className="cards-wrapper">
              {coinValue !== "" ? <CryptoCard coinValue={coinValue} /> : null}

              <PriceChart />
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default HomePage;
