import { SOCKET_URL } from "@/app/Utils/constants";
import { useEffect, useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { OrderBookParser } from "./OrderBookParser";

export interface OrderBookInterface {
  price: number;
  amount: number;
  count: number;
  total: number;
}

export const useRecordParserHook = () => {
  const [bids, setBids] = useState<OrderBookInterface[]>([]);
  const [asks, setAsks] = useState<OrderBookInterface[]>([]);

  const ws = useWebSocket(SOCKET_URL, {
    onMessage: (msg) => {
      let data = JSON.parse(msg.data);
      data = data[1];
      if (!Array.isArray(data)) return;
      if (data?.length > 3) {
        data.forEach((item: OrderBookInterface[]) => {
          OrderBookParser(item, bids, setBids, asks, setAsks);
        });
      } else if (data.length === 3) {
        OrderBookParser(data, bids, setBids, asks, setAsks);
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
