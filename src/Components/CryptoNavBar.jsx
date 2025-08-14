import { useDispatch, useSelector } from "react-redux";
import { setSelectedCoin, setSelectedDays } from "../store/coinFilterSlice";

import AutoRefresh from "./AutoRefresh";
import { setRefreshCoin } from "../Client/ClientState";
import { FormControl, Select, MenuItem } from "@mui/material";

import { InputBase, Paper, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { setHomeLoader } from "../Client/ClientState";

const CryptoNavbar = ({
  searchCoin,
  setSearchCoin,
  noMatchFound,
  setError,
}) => {
  const dispatch = useDispatch();
  const selectedCoin = useSelector((state) => state.coinFilter.selectedCoin);
  const onRefresh = () => {
    setHomeLoader(true);
    setRefreshCoin(true);
    setError(false);
  };

  //to set coin from select box
  function handleCoinSelect(event) {
    dispatch(setSelectedCoin(event.target.value));
    dispatch(setSelectedDays(1));
    setHomeLoader(true);
    setSearchCoin("");
    setError(false);
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">Crypto Tracker</div>
        <div style={{ position: "relative", maxWidth: 300 }}>
          <Paper
            component="form"
            sx={{
              minWidth: "250px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              borderRadius: "25px",
              p: "2px 4px",
              backgroundColor: "#ffffff",
              color: "#1e40af",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}>
            <InputBase
              sx={{
                padding: "1px",
                ml: 1,
                flex: 1,

                color: "#1e40af",
                fontWeight: 500,
                "::placeholder": {
                  color: "#94a3b8",
                  opacity: 1,
                },
              }}
              placeholder="Search"
              value={searchCoin}
              onChange={(e) => {
                setSearchCoin(e.target.value);
              }}
            />

            {searchCoin && (
              <IconButton
                onClick={() => setSearchCoin("")}
                sx={{
                  backgroundColor: "#1e40af",
                  color: "white",
                  p: "6px",
                  "&:hover": {
                    backgroundColor: "#1e3a8a",
                  },
                }}>
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
            {searchCoin.length === 0 && (
              <IconButton
                sx={{
                  backgroundColor: "#1e40af",
                  color: "white",
                  p: "6px",
                  "&:hover": {
                    backgroundColor: "#1e3a8a",
                  },
                }}>
                <SearchIcon fontSize="small" />
              </IconButton>
            )}
          </Paper>

          {noMatchFound && searchCoin.length > 2 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                right: "0",
                marginTop: "4px",
                zIndex: 10,
                background: "white",
                border: "1px solid #FCA5A5",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                padding: "12px",
                textAlign: "center",
                color: "#DC2626",
                fontWeight: 500,
                fontSize: "14px",
              }}>
              No records found
            </div>
          )}
        </div>
        <FormControl size="small" variant="outlined" sx={{ minWidth: "150px" }}>
          <Select
            labelId="currency-select-label"
            className="currency-select"
            value={selectedCoin}
            onChange={(event) => {
              handleCoinSelect(event);
            }}>
            <MenuItem value="bitcoin">Bitcoin</MenuItem>
            <MenuItem value="ethereum">Ethereum</MenuItem>
            <MenuItem value="ripple">Ripple</MenuItem>
            <MenuItem value="tether">Tether</MenuItem>
            <MenuItem value="binancecoin">Binancecoin</MenuItem>
          </Select>
        </FormControl>
        <AutoRefresh onRefresh={onRefresh} />
      </div>
    </nav>
  );
};

export default CryptoNavbar;
