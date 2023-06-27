"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Tools from "../ChartComponents/SideToolBar";
import OhlcHeader from "../ChartComponents/OhlcHeader";
import IndicatorBar from "../ChartComponents/IndicatorBar";
import CandleStickChart from "../ChartComponents/CandleStickChart";
import { INITIAL_TIMEFRAME, OHLC_DATA_POINTS } from "../../Utils/constants";
import CandleStickData from "../Services/CandleStickData";
const OhlcFooter = dynamic(() => import("../ChartComponents/OhlcFooter"), {
  ssr: false,
});

const OhlcChart: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState(INITIAL_TIMEFRAME);
  const [series, setSeries] = useState([]);

  const [currentPrice, setCurrentPrice] = useState([]);
  const { OPEN, HIGH, LOW, CLOSE } = OHLC_DATA_POINTS;

  useEffect(() => {
    fetchData();
  }, [selectedTime]);

  const fetchData = async () => {
    const { data, error } = await CandleStickData(selectedTime);
    if (!error) {
      setCurrentPrice(data[data.length - 1].y);
      setSeries(data);
    } else {
      console.log(`HTTP Response Code: ${error}`);
    }
  };

  return (
    <div>
      <div className="px-5">
        <OhlcHeader />
        <hr className="ml-4 mr-4" />
      </div>
      <div className="flex justify-center p-1">
        <Tools />
        <div>
          <IndicatorBar />
          <div className="px-4">
            BTC/USD 30 bitfinex O
            <span className="text-green-400 mx-1">{currentPrice[OPEN]}</span> H
            <span className="text-green-400 mx-1">{currentPrice[HIGH]}</span> L
            <span className="text-green-400 mx-1">{currentPrice[LOW]}</span> C
            <span className="text-green-400 mx-1">{currentPrice[CLOSE]}</span>
          </div>
          <CandleStickChart series={series} />
        </div>
      </div>
      <div>
        <OhlcFooter fetchData={setSelectedTime} />
      </div>
    </div>
  );
};

export default OhlcChart;
