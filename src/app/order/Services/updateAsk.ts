import { OrderBookInterface } from "@/app/Utils/Types/constants.type";
type SetOrderBook = React.Dispatch<React.SetStateAction<OrderBookInterface[]>>;

export const updateAsks = (
  price: number,
  askTotal: number,
  asks: OrderBookInterface[],
  setAsks: SetOrderBook,
  askObject:OrderBookInterface

) => {
  const UPDATED_ASKS: OrderBookInterface[] = [];

  asks.map((ask) => {
    if (ask.price === price) {
      askTotal += Math.abs(askObject.amount);
      UPDATED_ASKS.push(askObject);
    } else {
      askTotal += ask.amount;
      ask.total = askTotal;
      UPDATED_ASKS.push(ask);
    }
  });

  setAsks([...UPDATED_ASKS]);
};