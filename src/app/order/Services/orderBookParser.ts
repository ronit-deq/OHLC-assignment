import { OrderBookInterface } from "@/app/Utils/Types/constants.type";
import { updateBids } from "./updateBid";
import { updateAsks } from "./updateAsk";

type SetOrderBook = React.Dispatch<React.SetStateAction<OrderBookInterface[]>>;

export const orderBookParser = (
  orderBookData: number[],
  bids: OrderBookInterface[],
  setBids: SetOrderBook,
  asks: OrderBookInterface[],
  setAsks: SetOrderBook
) => {
  const [price, count, amount] = orderBookData;

  if (count > 0) {
    if (amount > 0) {
      const bidObject: OrderBookInterface = {
        price,
        amount: Math.abs(amount),
        count,
        total: Math.abs(amount),
      };

      let bidTotal = 0;
      if (bids.length) {
        const UPDATED_BIDS=updateBids(price, bidTotal, bids, bidObject);
        setBids(UPDATED_BIDS);
      } else {
        bidTotal += amount;
        setBids((prev) => [...prev, bidObject]);
      }
    } else if (amount < 0) {
      const askObject: OrderBookInterface = {
        price,
        amount: Math.abs(amount),
        count,
        total: Math.abs(amount),
      };
      let askTotal = 0;
      if (asks.length) {
        const updatedAsk=updateAsks(price, askTotal, asks, askObject);
        setAsks(updatedAsk)
      } else {
        askTotal += amount;
        setAsks((prev) => [...prev, askObject]);
      }
    }
  } else if (count === 0) {
    if (amount === -1) {
      const updatedValueBids = bids.filter((bid) => bid.price !== price);
      setBids(updatedValueBids);
    } else if (amount === 1) {
      const updatedValueAsks = asks.filter((ask) => ask.price !== price);
      setAsks(updatedValueAsks);
    }
  }
};
