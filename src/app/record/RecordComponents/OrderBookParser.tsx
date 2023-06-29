import { OrderBookInterface } from "@/app/Utils/Types/constants.type";

interface OrderBookUpdate {
  price: number;
  count: number;
  amount: number;
  total: number;
}

type SetOrderBook = React.Dispatch<React.SetStateAction<OrderBookInterface[]>>;

const updateBids = (
  price: number,
  amount: number,
  bids: OrderBookInterface[],
  setBids: SetOrderBook
) => {
  const updatedBids: OrderBookInterface[] = [];

  let bidTotal = 0;
  bids.forEach((bid) => {
    if (bid.price === price) {
      bidTotal += amount;
      updatedBids.push({
        price,
        count: bid.count,
        amount: bidTotal,
        total: amount,
      });
    } else {
      bidTotal += bid.amount;
      bid.total = bidTotal;
      updatedBids.push(bid);
    }
  });

  setBids(updatedBids);
};

const updateAsks = (
  price: number,
  amount: number,
  asks: OrderBookInterface[],
  setAsks: SetOrderBook
) => {
  const updatedAsks: OrderBookInterface[] = [];

  let askTotal = 0;
  asks.forEach((ask) => {
    if (ask.price === price) {
      askTotal += Math.abs(amount);
      updatedAsks.push({
        price,
        count: ask.count,
        amount: askTotal,
        total: Math.abs(amount),
      });
    } else {
      askTotal += ask.amount;
      ask.total = askTotal;
      updatedAsks.push(ask);
    }
  });

  setAsks(updatedAsks);
};

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
      const bidObj: OrderBookUpdate = {
        price,
        count,
        amount,
        total: amount,
      };

      if (bids.length) {
        updateBids(price, amount, bids, setBids);
      } else {
        setBids((prev) => [...prev, bidObj]);
      }
    } else if (amount < 0) {
      const askObj: OrderBookUpdate = {
        price,
        count,
        amount: Math.abs(amount),
        total: Math.abs(amount),
      };

      if (asks.length) {
        updateAsks(price, amount, asks, setAsks);
      } else {
        setAsks((prev) => [...prev, askObj]);
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
