"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Chart from "../ChartComponents/Chart";
import Tools from "../ChartComponents/Tools";
import HeaderOHLC from "../ChartComponents/HeaderOHLC";
import axios from "axios";
import { timeFrame } from "../../Utils/constants";
import IndicatorBar from "../ChartComponents/IndicatorBar";
const FooterOHLC = dynamic(() => import("../ChartComponents/FooterOHLC"), {
  ssr: false,
});

const OhlcChart: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState("1h");
  const [series, setSeries] = useState([]);
  const [currPrice, setCurrPrice] = useState([]);

  useEffect(() => {
    fetchData(selectedTime);
  });

  const fetchData = async (time: string) => {
    try {
      const response = await axios.get(
        `https://api-pub.bitfinex.com/v2/candles/trade:${timeFrame[time]}:tBTCUSD/hist`
      );
      if (response.status === 200) {
        const data = response.data.map((candle: number[]) => {
          let obj: { x: number; y: number[] } = { x: candle[0], y: [] };
          let value = candle.slice(1, 5);
          const close = value[1];
          const high = value[2];
          const low = value[3];
          value[1] = high;
          value[2] = low;
          value[3] = close;
          obj.y = value;
          return obj;
        });

        setCurrPrice(data[data.length - 1].y);
        setSeries(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="px-5">
        <HeaderOHLC />
        <hr className="ml-4 mr-4" />
      </div>
      <div className="flex justify-center p-1">
        <Tools />
        <div>
          <IndicatorBar />
          <div className="px-4">
            BTC/USD 30 bitfinex O :
            <span className="text-green-400 mx-1">{currPrice[0]}</span> H :
            <span className="text-green-400 mx-1">{currPrice[1]}</span> L :
            <span className="text-green-400 mx-1">{currPrice[2]}</span> C :
            <span className="text-green-400 mx-1">{currPrice[3]}</span>
          </div>
          <Chart series={series} />
        </div>
      </div>
      <div>
        <FooterOHLC fetchData={fetchData} />
      </div>
    </div>
  );
};

export default OhlcChart;
