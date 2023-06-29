import { OrderBookInterface, OrderBookUpdateInterface } from "@/app/Utils/Types/constants.type";
type SetOrderBook = React.Dispatch<React.SetStateAction<OrderBookInterface[]>>;

export const updateBids = (
  price: number,
  bidTotal: number,
  bids: OrderBookInterface[],
  setBids: SetOrderBook,
  bidObject:OrderBookUpdateInterface
) => {
  const updatedBids: OrderBookUpdateInterface[] = [];

  bids.forEach((bid) => {
    if (bid.price === price) {
      bidTotal += bidObject.amount;
      updatedBids.push(bidObject);
    } else {
      bidTotal += bid.amount;
      bid.total = bidTotal;
      updatedBids.push(bid);
    }
  });

  setBids([...updatedBids]);
};