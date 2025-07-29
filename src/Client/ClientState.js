import { proxy, useSnapshot } from "valtio";

// Proxy state to control coin refresh across components
const refreshCoin = proxy({ value: false });

//Hook to read the current refreshCoin state reactively
export const useRefreshCoin = () => {
  return useSnapshot(refreshCoin);
};

//Setter to trigger a refresh for coin data.
export const setRefreshCoin = (value) => {
  refreshCoin.value = value;
};

//home loading variable
const homeLoader = proxy({ value: true });

//Hook to read the  loading for home
export const useHomeLoader = () => {
  return useSnapshot(homeLoader);
};

//Setter to load home
export const setHomeLoader = (value) => {
  homeLoader.value = value;
};
