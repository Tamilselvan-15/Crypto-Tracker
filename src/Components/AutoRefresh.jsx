import { useEffect, useState, useRef } from "react";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Typography,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { proxy } from "valtio";

export const refresh = proxy({
  interval: 0,
});

const rereshIntervals = [
  {
    label: "OFF",
    value: -1,
  },
  {
    label: "15s",
    value: 15,
  },
  {
    label: "30s",
    value: 30,
  },
  {
    label: "1m",
    value: 60,
  },
];

export default function AutoRefresh({ onRefresh }) {
  const [intervalSec, setIntervalSec] = useState(-1);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (intervalSec !== -1) {
      intervalRef.current = setInterval(() => {
        onRefresh();
      }, intervalSec * 1000);
    }
    if (intervalSec === -1) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [intervalSec, onRefresh]);

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography sx={{ color: "#1e40af", fontWeight: 600 }}>
        Refresh Every
      </Typography>

      <FormControl
        variant="standard"
        size="small"
        sx={{
          minWidth: "80px",
          backgroundColor: "#1e40af",
          borderRadius: "6px",
          paddingX: 1,
        }}>
        <Select
          sx={{
            color: "white",
            paddingx: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          value={intervalSec}
          onChange={(e) => setIntervalSec(e.target.value)}
          disableUnderline>
          {rereshIntervals.map((item) => (
            <MenuItem key={item.label} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <IconButton
        onClick={onRefresh}
        sx={{
          backgroundColor: "#1e40af",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#1e3a8a", // darker shade on hover
          },
        }}>
        <RefreshIcon />
      </IconButton>
    </Box>
  );
}
