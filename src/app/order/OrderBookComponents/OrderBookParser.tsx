import {
  OrderBookInterface,
  OrderBookUpdateInterface,
} from "@/app/Utils/Types/constants.type";
import { updateBids } from "../Services/updateBid";
import { updateAsks } from "../Services/updateAsk";

type SetOrderBook = React.Dispatch<React.SetStateAction<OrderBookInterface[]>>;

export const OrderBookParser = (
  orderBookData: any,
  bids: OrderBookInterface[],
  setBids: SetOrderBook,
  asks: OrderBookInterface[],
  setAsks: SetOrderBook
) => {
  const [price, count, amount] = orderBookData;

  if (count > 0) {
    if (amount > 0) {
      const bidObject: OrderBookUpdateInterface = {
        price,
        count,
        amount,
        total: amount,
      };

      let bidTotal = 0;
      if (bids.length) {
        updateBids(price, bidTotal, bids, setBids, bidObject);
      } else {
        bidTotal += amount;
        setBids((prev) => [...prev, bidObject]);
      }
    } else if (amount < 0) {
      const askObject: OrderBookUpdateInterface = {
        price,
        count,
        amount: Math.abs(amount),
        total: Math.abs(amount),
      };
      let askTotal = 0;
      if (asks.length) {
        updateAsks(price, askTotal, asks, setAsks, askObject);
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
