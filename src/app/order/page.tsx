"use client";
import OrderBook from "./OrderBookComponents/OrderBook";
import OrderBookHeader from "./OrderBookComponents/OrderBookHeader";
import OrderBookFooter from "./OrderBookComponents/OrderBookFooter";

const page = () => {
  return (
    <div>
      <div className="flex flex-col justify-between order-book">
        <OrderBookHeader />
        <OrderBook />
        <OrderBookFooter />
      </div>
    </div>
  );
};

export default page;
