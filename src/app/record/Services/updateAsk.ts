import { OrderBookInterface, OrderBookUpdateInterface } from "@/app/Utils/Types/constants.type";
type SetOrderBook = React.Dispatch<React.SetStateAction<OrderBookInterface[]>>;

export const updateAsks = (
  price: number,
  askTotal: number,
  asks: OrderBookInterface[],
  setAsks: SetOrderBook,
  askObject:OrderBookUpdateInterface

) => {
  const updatedAsks: OrderBookUpdateInterface[] = [];

  asks.forEach((ask) => {
    if (ask.price === price) {
      askTotal += Math.abs(askObject.amount);
      updatedAsks.push(askObject);
    } else {
      askTotal += ask.amount;
      ask.total = askTotal;
      updatedAsks.push(ask);
    }
  });

  setAsks(updatedAsks);
};