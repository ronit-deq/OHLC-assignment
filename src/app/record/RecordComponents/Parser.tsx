import { socketUrl } from "@/app/Utils/constants";
import React, { useEffect, useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

interface ObjInterface {
  price: number;
  amount: number;
  count: number;
  total: number;
}

//declared use sate with nested array

export const useRecordParser = () => {
  const [bids, setBids] = useState<ObjInterface[]>([]);
  console.log("bids: ", bids);
  const [asks, setAsks] = useState<ObjInterface[]>([]);
  console.log("asks: ", asks);
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
        data.forEach((item: ObjInterface[]) => {
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
  }, [ws]);

  const recordParser = (data: any) => {
    const [price, count, amount] = data;

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
  return [bids, asks];
  // amount = Math.abs(amount);
};
