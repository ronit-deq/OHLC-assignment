import { useEffect, useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { SOCKET_URL } from "@/app/Utils/constants";
import { OrderBookInterface } from "@/app/Utils/Types/constants.type";
import { orderBookParser } from "./orderBookParser";

export const useOrderParserHook = () => {
  const [bids, setBids] = useState<OrderBookInterface[]>([]);
  const [asks, setAsks] = useState<OrderBookInterface[]>([]);

  const ws = useWebSocket(SOCKET_URL, {
    onMessage: (msg) => {
      const orderBookData = JSON.parse(msg.data)[1];
      if (!Array.isArray(orderBookData)) return;
      if (orderBookData?.length > 3) {
        orderBookData.forEach((item: number[]) => {
          //return n set
          orderBookParser(item, bids, setBids, asks, setAsks);
        });
      } else if (orderBookData.length === 3) {
        orderBookParser(orderBookData, bids, setBids, asks, setAsks);
      }
    },
  });

  useEffect(() => {
    ws.sendMessage(JSON.stringify({ event: "conf" }));

    ws.sendJsonMessage({
      event: "subscribe",
      channel: "book",
      symbol: "tBTCUSD",
      pair: "BTCUSD",
      prec: "P0",
      len: 25,
      freq: "F0",
    });
  }, [ws]);

  return [bids, asks];
};
