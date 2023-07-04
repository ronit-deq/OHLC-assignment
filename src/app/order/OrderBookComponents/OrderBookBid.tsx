import { OrderBookInterface } from "@/app/Utils/Types/constants.type";

const BidSection = ({ bids }: { bids: OrderBookInterface[] }) => {
  return (
    <div className=" w-1/2 bid-section">
      <div className="flex justify-evenly">
        <div className="font-bold text-center w-2">COUNT</div>
        <div className="font-bold text-center w-2">AMOUNT</div>
        <div className="font-bold text-center w-2">TOTAL</div>
        <div className="font-bold text-center w-2">PRICE</div>
      </div>

      {bids.map((bid, bidIndex) => (
        <div
          key={bidIndex}
          className="flex justify-evenly relative overflow-hidden"
        >
          <div
            className="progress-green"
            style={{ width: `${bid.total * 2}%` }}
          ></div>
          <div className="text-center w-2">{bid.count}</div>
          <div className="text-center w-2">{bid.amount.toFixed(4)}</div>
          <div className="text-center w-2">{bid.total.toFixed(4)}</div>
          <div className="text-center w-2">{bid.price}</div>
        </div>
      ))}
    </div>
  );
};

export default BidSection;
