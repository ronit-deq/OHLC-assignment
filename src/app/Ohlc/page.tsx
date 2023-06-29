"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import OhlcHeader from "./ChartComponents/OhlcHeader";
import IndicatorBar from "./ChartComponents/IndicatorBar";
import CandleStickChart from "./ChartComponents/CandleStickChart";
import candleStickData from "./Services/candleStickData";
import { INITIAL_TIMEFRAME, OHLC_DATA_POINTS } from "../Utils/constants";
import { OHLCValueInterface } from "../Utils/Types/constants.type";
import SideToolBar from "./ChartComponents/SideToolBar";
import LoadingScreen from "./ChartComponents/LoadingScreen";
const OhlcFooter = dynamic(() => import("./ChartComponents/OhlcFooter"), {
  ssr: false,
});

const OhlcChart: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<string>(INITIAL_TIMEFRAME);
  const [series, setSeries] = useState<OHLCValueInterface[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number[]>([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [isChartloading, setIsChartLoading] = useState(false);
  const { OPEN, HIGH, LOW, CLOSE } = OHLC_DATA_POINTS;

  useEffect(() => {
    fetchCandleStickData();
  }, [selectedTime]);

  const fetchCandleStickData = async () => {
    setIsChartLoading(true);

    const { data, error } = await candleStickData(selectedTime);
    if (!error) {
      setSeries([...data]);
      setIsChartLoading(false);
      setIsDataLoading(false);
    } else {
      setIsChartLoading(false);
      console.log(`HTTP Response Code: ${error}`);
      setIsDataLoading(false);
    }
  };

  const tooltipValues = (event: any, chartContext: any, config: any) => {
    if (config.dataPointIndex > 0) {
      const ohlcVal: OHLCValueInterface = series[config?.dataPointIndex];
      setCurrentPrice(ohlcVal.y);
    }
  };

  const textColorChange = () => {
    return currentPrice[OPEN] > currentPrice[CLOSE]
      ? "text-red-400"
      : "text-green-400";
  };

  return isChartloading ? (
    <LoadingScreen />
  ) : (
    <div>
      <div className="px-5">
        <OhlcHeader />
        <hr className="ml-4 mr-4" />
      </div>
      <div className="flex justify-center p-1">
        <SideToolBar />
        <div>
          <IndicatorBar />
          <div className={"px-4 flex"}>
            BTC/USD 30 bitfinex &nbsp;
            <div className={textColorChange()}>
              O<span className="mx-1">{currentPrice[OPEN]}</span> H
              <span className="mx-1">{currentPrice[HIGH]}</span> L
              <span className="mx-1">{currentPrice[LOW]}</span> C
              <span className="mx-1">{currentPrice[CLOSE]}</span>
            </div>
          </div>
          {!isDataLoading && (
            <CandleStickChart series={series} tooltipValues={tooltipValues} />
          )}
        </div>
      </div>
      <div>
        <OhlcFooter setSelectedItem={setSelectedTime} />
      </div>
    </div>
  );
};

export default OhlcChart;
