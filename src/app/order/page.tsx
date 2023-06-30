"use client";
import React, { useEffect, useState } from "react";
import OrderBook from "./OrderBookComponents/OrderBook";
import OrderBookHeader from "./OrderBookComponents/OrderBookHeader";
import OrderBookFooter from "./OrderBookComponents/OrderBookFooter";
import LoadingScreen from "../LoadingScreen";

const page = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="flex flex-col justify-between record-book">
          <OrderBookHeader />
          <OrderBook />
          <OrderBookFooter />
        </div>
      )}
    </div>
  );
};

export default page;
