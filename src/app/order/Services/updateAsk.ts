import { OrderBookInterface } from "@/app/Utils/Types/constants.type";
type SetOrderBook = React.Dispatch<React.SetStateAction<OrderBookInterface[]>>;

export const updateAsks = (
  price: number,
  askTotal: number,
  asks: OrderBookInterface[],
  askObject:OrderBookInterface

) => {
  const updatedAsk: OrderBookInterface[] = [];

  asks.map((ask) => {
    if (ask.price === price) {
      askTotal += Math.abs(askObject.amount);
      updatedAsk.push(askObject);
    } else {
      askTotal += ask.amount;
      ask.total = askTotal;
      updatedAsk.push(ask);
    }
  });
  return (updatedAsk);
};