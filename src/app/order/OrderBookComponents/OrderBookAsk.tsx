import { OrderBookInterface } from "@/app/Utils/Types/constants.type";

const AskSection = ({ asks }: { asks: OrderBookInterface[] }) => {
  return (
    <div className="ask-section w-1/2">
      <div className="flex justify-evenly">
        <div className="font-bold text-center w-2">PRICE</div>
        <div className="font-bold text-center w-2">TOTAL</div>
        <div className="font-bold text-center w-2">AMOUNT</div>
        <div className="font-bold text-center w-2">COUNT</div>
      </div>

      {asks.map((ask, askIndex) => (
        <div
          key={askIndex}
          className="flex justify-evenly relative overflow-hidden"
        >
          <div
            className="progress-red"
            style={{ width: `${Math.abs(ask.total * 2)}%` }}
          ></div>
          <div className="text-center w-2">{ask.price}</div>
          <div className="text-center w-2">{ask.total.toFixed(4)}</div>
          <div className="text-center w-2">{ask.amount.toFixed(4)}</div>
          <div className="text-center w-2">{ask.count}</div>
        </div>
      ))}
    </div>
  );
};

export default AskSection;
