"use client";

import dynamic from "next/dynamic";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import OhlcHeader from "../ChartComponents/OhlcHeader";
import IndicatorBar from "../ChartComponents/IndicatorBar";
import CandleStickChart from "../ChartComponents/CandleStickChart";
import candleStickData from "../Services/candleStickData";
import { INITIAL_TIMEFRAME, OHLC_DATA_POINTS } from "../../Utils/constants";
import { OHLCValueInterface } from "@/app/Utils/Types/constants.type";
import SideToolBar from "../ChartComponents/SideToolBar";
const OhlcFooter = dynamic(() => import("../ChartComponents/OhlcFooter"), {
  ssr: false,
});

const OhlcChart: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<string>(INITIAL_TIMEFRAME);
  //type of seriess
  const [series, setSeries] = useState<any[]>([]);
  const [currentPrice, setCurrentPrice]: [
    number[],
    Dispatch<SetStateAction<any>>
  ] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { OPEN, HIGH, LOW, CLOSE } = OHLC_DATA_POINTS;

  useEffect(() => {
    fetchCandleStickData();
  }, [selectedTime]);

  //fetch CandleStick
  const fetchCandleStickData = async () => {
    setIsLoading(true);
    const { data, error } = await candleStickData(selectedTime);
    if (!error) {
      setSeries([...data]);
      setIsLoading(false);
    } else {
      console.log(`HTTP Response Code: ${error}`);
      setIsLoading(false);
    }
  };

  //arrow function

  function tooltipValues(event: any, chartContext: any, config: any) {
    if (config.dataPointIndex > 0) {
      const ohlcVal: OHLCValueInterface = series[config?.dataPointIndex];
      setCurrentPrice(ohlcVal.y);
    }
  }

  function textColorChange() {
    //let=>const
    let textColorChoice = "text-green-400";

    //if condition
    return currentPrice[OPEN] > currentPrice[CLOSE]
      ? (textColorChoice = "text-red-400")
      : (textColorChoice = "text-green-400");
  }

  return (
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
          {!isLoading && (
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
