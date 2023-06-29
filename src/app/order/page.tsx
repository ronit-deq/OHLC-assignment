import React from "react";
import OrderBook from "./OrderBookComponents/OrderBook";
import OrderBookHeader from "./OrderBookComponents/OrderBookHeader";
import OrderBookFooter from "./OrderBookComponents/OrderBookFooter";

const page = () => {
  return (
    <div className="flex flex-col justify-between record-book">
      <OrderBookHeader />
      <OrderBook />
      <OrderBookFooter />
    </div>
  );
};

export default page;
