import { OrderBookInterface } from "@/app/Utils/Types/constants.type";
type SetOrderBook = React.Dispatch<React.SetStateAction<OrderBookInterface[]>>;

export const updateBids = (
  price: number,
  bidTotal: number,
  bids: OrderBookInterface[],
  // setBids: SetOrderBook,
  bidObject:OrderBookInterface
) => {
  const updatedBids: OrderBookInterface[] = [];

  bids.map((bid) => {
    if (bid.price === price) {
      bidTotal += bidObject.amount;
      updatedBids.push(bidObject);
    } else {
      bidTotal += bid.amount;
      bid.total = bidTotal;
      updatedBids.push(bid);
    }
  });
  return updatedBids;
  // setBids([...UPDATED_BIDS]);
};