"use client";

import AskSection from "./OrderBookAsk";
import BidSection from "./OrderBookBid";
import { useOrderParserHook } from "../Services/useOrderParserHook";

const OrderBook = () => {
  const [bids, asks] = useOrderParserHook();

  return (
    <div className="flex justify-around">
      <BidSection bids={bids} />
      <AskSection asks={asks} />
    </div>
  );
};

export default OrderBook;
