"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import OhlcToolTip from "./ChartComponents/OhlcToolTip";
import SideToolBar from "./ChartComponents/SideToolBar";
import OhlcHeader from "./ChartComponents/OhlcHeader";
import CandleStickChart from "./ChartComponents/CandleStickChart";
import TopIndicatorBar from "./ChartComponents/TopIndicatorBar";
import candleStickData from "./Services/candleStickData";
import { INITIAL_TIMEFRAME } from "../Utils/constants";
import { OHLCValueInterface } from "../Utils/Types/constants.type";
import LoadingScreen from "../LoadingScreen";
const OhlcFooter = dynamic(() => import("./ChartComponents/OhlcFooter"), {
  ssr: false,
});

const OhlcChart: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<string>(INITIAL_TIMEFRAME);
  const [candleSeries, setCandleSeries] = useState<OHLCValueInterface[]>([]);
  //type
  const [currentPrice, setCurrentPrice] = useState<number[]>([]);
  const [isChartloading, setIsChartLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchCandleStickData();
  }, [selectedTime]);

  const fetchCandleStickData = async () => {
    setIsChartLoading(true);
    const { data, error } = await candleStickData(selectedTime);
    if (!error) {
      setIsChartLoading(false);
      setCandleSeries([...data]);
    } else {
      setIsChartLoading(false);
      console.log(`HTTP Response Code: ${error}`);
    }
  };

  const tooltipValues = (event: object, chartContext: object, config: any) => {
    if (config.dataPointIndex > 0) {
      const ohlcValues: OHLCValueInterface =
        candleSeries[config?.dataPointIndex];
      setCurrentPrice(ohlcValues.y);
    }
  };

  return isChartloading ? (
    <LoadingScreen />
  ) : (
    <div>
      <div className="px-5">
        <OhlcHeader />
      </div>
      <div className="flex justify-center p-1">
        <SideToolBar />
        <div>
          <TopIndicatorBar />
          <div className={"px-4 flex"}>
            BTC/USD 30 bitfinex &nbsp;
            <OhlcToolTip currentPrice={currentPrice} />
          </div>
          <CandleStickChart
            candleSeries={candleSeries}
            tooltipValues={tooltipValues}
          />
        </div>
      </div>
      <div>
        <OhlcFooter setSelectedItem={setSelectedTime} />
      </div>
    </div>
  );
};

export default OhlcChart;
