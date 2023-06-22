"use client";

import React, { useEffect, useState } from "react";
import { useRecordParser } from "./Parser";

const RecordBook = () => {
  const [bids, asks] = useRecordParser();
  // implementing hook

  return (
    <div className="flex justify-around">
      <div className=" w-1/2 bid-section">
        <div className="flex justify-evenly">
          <div className="font-bold text-center w-2">COUNT</div>
          <div className="font-bold text-center w-2">AMOUNT</div>
          <div className="font-bold text-center w-2">TOTAL</div>
          <div className="font-bold text-center w-2">PRICE</div>
        </div>

        {bids.map((bid, key) => (
          <div
            key={key}
            className=" flex justify-evenly relative overflow-hidden"
          >
            <div
              className="progress-green"
              style={{
                width: `${(bid.total * 10) / 4}%`,
              }}
            ></div>

            <div className="text-center w-2">{bid.count}</div>
            <div className="text-center w-2">{bid.amount.toFixed(4)}</div>
            <div className="text-center w-2">{bid.total.toFixed(4)}</div>
            <div className="text-center w-2">{bid.price}</div>
          </div>
        ))}
      </div>

      <div className="w-1/2 ask-section">
        <div className="flex justify-evenly ">
          <div className="font-bold text-center w-2">PRICE</div>
          <div className="font-bold text-center w-2">TOTAL</div>
          <div className="font-bold text-center w-2">AMOUNT</div>
          <div className="font-bold text-center w-2">COUNT</div>
        </div>
        {asks.map((ask, key) => (
          <div
            key={key}
            className="flex justify-evenly relative overflow-hidden"
          >
            <div
              className="progress-red"
              style={{
                width: `${Math.abs(ask.total * 10) / 4}%`,
              }}
            ></div>
            <div className="text-center w-2">{ask.price}</div>
            <div className="text-center w-2">{ask.total.toFixed(4)}</div>
            <div className="text-center w-2">{ask.amount.toFixed(4)}</div>
            <div className="text-center w-2">{ask.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordBook;
