"use client";

import React, { useEffect, useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { socketUrl, apiDataPoints } from "../../Utils/constants";

interface ObjInterface {
  price: number;
  amount: number;
  count: number;
  total: number;
}

const RecordBook = () => {
  // const [recordData, setRecordData] = useState<any[]>([]);
  //declared use sate with nested array
  const [bids, setBids] = useState<ObjInterface[]>([]);
  console.log("bids: ", bids);
  const [asks, setAsks] = useState<ObjInterface[]>([]);
  console.log("asks: ", asks);

  const { COUNT, AMOUNT, TOTAL, PRICE } = apiDataPoints;

  // implementing hook
  const ws = useWebSocket(socketUrl, {
    onMessage: (msg) => {
      // console.log(msg, "message");
      // console.log(msg.data, "message-data");

      let data = JSON.parse(msg.data);
      // console.log(data);

      data = data[1];
      console.log("data?.length: ", data?.length);
      if (!Array.isArray(data)) return;

      //if data length is greater than 3 , then we use forEach
      if (data?.length > 3) {
        data.forEach((item: number[]) => {
          recordParser(item);
        });
      }
      //else we directly pass data as it a value
      else if (data.length === 3) {
        recordParser(data);
      }
    },
  });

  //event subscribe for BTC/USD
  useEffect(() => {
    ws.sendMessage(JSON.stringify({ event: "conf", flags: 65536 + 131072 }));

    ws.sendJsonMessage({
      event: "subscribe",
      channel: "book",
      symbol: "tBTCUSD",
      pair: "BTCUSD",
      prec: "P0",
      len: 25,
      freq: "F0",
    });
    // console.log(ws.lastJsonMessage);
  }, []);

  const recordParser = (data: number[]) => {
    const [price, count, amount] = data;
    // amount = Math.abs(amount);
    if (count > 0) {
      if (amount > 0) {
        let bidObj = {
          price,
          count,
          amount,
          total: amount,
        };
        let bidTotal = 0;
        console.log("bids.length: ", bids.length);
        if (bids.length) {
          const updatedBids: ObjInterface[] = [];
          bids.forEach((bid) => {
            //if bidPrice Already exists in data
            if (bid.price === price) {
              bidTotal += bidObj.amount;
              updatedBids.push(bidObj);
            } else {
              //if the entity is unique , we add the new entry
              bidTotal += bid.amount;
              bid.total = bidTotal;
              updatedBids.push(bid);
            }
          });
          setBids([...updatedBids]);
        } else {
          bidTotal += amount;
          setBids((prev) => [...prev, bidObj]);
        }
      } else if (amount < 0) {
        let askObj = {
          price,
          count,
          amount: Math.abs(amount),
          total: Math.abs(amount),
        };

        let askTotal = 0;
        if (asks.length) {
          const updatedAsks: ObjInterface[] = [];
          asks.forEach((ask) => {
            //if askPrice Already exists in data
            if (ask.price === price) {
              askTotal += askObj.amount;
              updatedAsks.push(askObj);
            } else {
              //if the entity is unique , we add the new entry
              askTotal += ask.amount;
              ask.total = askTotal;
              updatedAsks.push(ask);
            }
          });
          setAsks([...updatedAsks]);
        } else {
          askTotal += askObj.amount;
          setAsks((prev) => [...prev, askObj]);
        }
      }
    } else if (count === 0) {
      if (amount === -1) {
        //delete the bids same as per same price
        const removeBid = [...bids];
        const updatedBids = removeBid?.filter((bid) => bid.price !== price);
        setBids(updatedBids);
      } else if (amount === 1) {
        const removeAsk = [...asks];
        // delete the asks same as per same price
        const updatedAsks = removeAsk?.filter((ask) => ask.price !== price);
        setAsks(updatedAsks);
      }
    }
  };

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
          <div className=" flex justify-evenly relative overflow-hidden">
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
