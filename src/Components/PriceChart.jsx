import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

import {
  getDataForOneDay,
  getDataForSevenDays,
  getDataForMonth,
  formatAmericanNumber,
} from "../Util/Util";
import { getCoinPriceDetails } from "../Api/Api";
import { setSelectedDays } from "../store/coinFilterSlice";

const PriceChart = () => {
  const dispatch = useDispatch();

  const selectedCoin = useSelector((state) => state.coinFilter.selectedCoin);
  const selectedDays = useSelector((state) => state.coinFilter.selectedDays);

  const [graphData, setGraphData] = useState([]);
  const [graphLoader, setGraphLoader] = useState(true);
  const [graphError, setGraphError] = useState(false);

  // Initial and dependency-based data fetching
  useEffect(() => {
    getCoinChartDetails();
  }, [selectedDays, selectedCoin]);

  // Show error toast if graph data fails to load
  useEffect(() => {
    if (graphError) {
      toast.error("Unable to load chart data. Please try again", {
        position: "top-right",
        autoClose: 3000,
        style: { paddingRight: "2.5rem" },
      });
    }
  }, [graphError]);

  // to get coin price data for the selected coin and timeframe
  const getCoinChartDetails = async () => {
    try {
      setGraphLoader(true);
      setGraphError(false);
      setGraphData([]);

      const response = await getCoinPriceDetails(selectedCoin, selectedDays);
      setGraphData(response?.prices || []);
    } catch (error) {
      setGraphError(true);
    } finally {
      setGraphLoader(false);
    }
  };

  // to get data for the selected time range
  const series = useMemo(() => {
    let data = [];
    if (selectedDays === 1) {
      data = getDataForOneDay(graphData);
    } else if (selectedDays === 7) {
      data = getDataForSevenDays(graphData);
    } else {
      data = getDataForMonth(graphData);
    }
    return [{ data }];
  }, [graphData, selectedDays]);

  // Chart configuration
  const options = useMemo(
    () => ({
      chart: {
        type: "candlestick",
        height: 350,
        toolbar: { show: false },
      },
      xaxis: {
        type: "datetime",
        labels: {
          format: selectedDays === 1 ? "HH:mm" : "dd MMM",
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return "$" + formatAmericanNumber(val);
          },
        },
        tooltip: { enabled: true },
      },
    }),
    [selectedDays]
  );

  return (
    <div className="crypto-card chart-card">
      <div className="chart-header">
        <h3 className="chart-title">Price Chart</h3>
        <div className="time-buttons">
          {[
            { label: "1D", value: 1 },
            { label: "7D", value: 7 },
            { label: "1M", value: 30 },
          ].map((btn) => (
            <button
              key={btn.value}
              className={`${
                selectedDays === btn.value ? "time-btn active" : "time-btn"
              }`}
              onClick={() => dispatch(setSelectedDays(btn.value))}>
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-container">
        {!graphError &&
          (!graphLoader ? (
            <ReactApexChart
              options={options}
              series={series}
              type="candlestick"
              height="100%"
              width="100%"
            />
          ) : (
            <div className="loader-align">
              <CircularProgress disableShrink />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PriceChart;
