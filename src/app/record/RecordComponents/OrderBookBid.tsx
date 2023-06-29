import { OrderBookInterface } from "@/app/Utils/Types/constants.type";
import React from "react";

const BidSection = ({ bids }: { bids: OrderBookInterface[] }) => {
  return (
    <div className="bid-section">
      <div className="header-row">
        <div className="header-cell">COUNT</div>
        <div className="header-cell">AMOUNT</div>
        <div className="header-cell">TOTAL</div>
        <div className="header-cell">PRICE</div>
      </div>

      {bids.map((bid, index) => (
        <div key={index} className="bid-row">
          <div
            className="progress-bar"
            style={{ width: `${(bid.total * 10) / 4}%` }}
          ></div>
          <div className="cell">{bid.count}</div>
          <div className="cell">{bid.amount.toFixed(4)}</div>
          <div className="cell">{bid.total.toFixed(4)}</div>
          <div className="cell">{bid.price}</div>
        </div>
      ))}
    </div>
  );
};

export default BidSection;
