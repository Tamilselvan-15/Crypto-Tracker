import { formatAmericanNumber, formatToBillionMillion } from "../Util/Util";
import Avatar from "@mui/material/Avatar";

const Card = ({ coinValue }) => {
  return (
    <div className="crypto-card info-card">
      <div className="card-header">
        <div>
          <Avatar
            alt="Coin Img"
            src={coinValue.coinImage}
            sx={{ width: 70, height: 70 }}
          />
        </div>
        <div className="crypto-info">
          <h3>{coinValue?.coinId?.toUpperCase()}</h3>
          <div className="crypto-symbol">
            {coinValue?.coinSymbol?.toUpperCase()}
          </div>
        </div>
      </div>
      <div className="card-stats-vertical">
        <div className="stat-item-vertical">
          <span className="stat-label">Current Price</span>
          <span className="stat-value price">
            ${formatAmericanNumber(coinValue?.currentPrice)}
          </span>
        </div>
        <div className="stat-item-vertical">
          <span className="stat-label">Market Cap</span>
          <span className="stat-value market-cap">
            ${formatToBillionMillion(coinValue?.marketCap)}
          </span>
        </div>
        <div className="stat-item-vertical">
          <span className="stat-label">24h Change</span>
          <span
            className={`stat-value ${
              coinValue?.marketCapChangePercentage24h >= 0
                ? "change-positive"
                : "change-negative"
            }`}>
            {coinValue?.marketCapChangePercentage24h?.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
