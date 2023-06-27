import React from "react";
import OrderBook from "./RecordComponents/OrderBook";
import OrderBookHeader from "./RecordComponents/OrderBookHeader";
import OrderBookFooter from "./RecordComponents/OrderBookFooter";

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
