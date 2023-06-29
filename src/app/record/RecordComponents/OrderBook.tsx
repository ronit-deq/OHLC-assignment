import React from "react";
import { useOrderParserHook } from "./useOrderParserHook";
import BidSection from "./OrderBookBid";
import AskSection from "./OrderBookAsk";

const OrderBook = () => {
  const [bids, asks] = useOrderParserHook();

  return (
    <div className="order-book">
      <BidSection bids={bids} />
      <AskSection asks={asks} />
    </div>
  );
};

export default OrderBook;
