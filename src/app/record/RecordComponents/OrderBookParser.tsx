import { OrderBookInterface } from "@/app/Utils/Types/constants.type";

export const OrderBookParser = (
  orderBookData: any,
  bids: OrderBookInterface[],
  setBids: React.Dispatch<React.SetStateAction<OrderBookInterface[]>>,
  asks: OrderBookInterface[],
  setAsks: React.Dispatch<React.SetStateAction<OrderBookInterface[]>>
) => {
  const [price, count, amount] = orderBookData;
  if (count > 0) {
    if (amount > 0) {
      const bidObj = {
        price,
        count,
        amount,
        total: amount,
      };
      let bidTotal = 0;
      if (bids.length) {
        const updatedBids: OrderBookInterface[] = [];

        bids.forEach((bid) => {
          if (bid.price === price) {
            bidTotal += bidObj.amount;
            updatedBids.push(bidObj);
          } else {
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
      const askObj = {
        price,
        count,
        amount: Math.abs(amount),
        total: Math.abs(amount),
      };

      let askTotal = 0;
      if (asks.length) {
        const updatedAsks: OrderBookInterface[] = [];
        asks.forEach((ask) => {
          if (ask.price === price) {
            askTotal += askObj.amount;
            updatedAsks.push(askObj);
          } else {
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
      const removeBid = [...bids];
      const updatedValueBids = removeBid?.filter((bid) => bid.price !== price);
      setBids(updatedValueBids);
    } else if (amount === 1) {
      const removeAsk = [...asks];
      const updatedValueAsks = removeAsk?.filter((ask) => ask.price !== price);
      setAsks(updatedValueAsks);
    }
  }
};
