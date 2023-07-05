import { OHLC_DATA_POINTS } from "@/app/Utils/constants";

const OhlcToolTip = ({ currentPrice }: { currentPrice: number[] }) => {
  const { OPEN, HIGH, LOW, CLOSE } = OHLC_DATA_POINTS;

  return (
    <div>
      <div
        className={`${
          currentPrice[OPEN] > currentPrice[CLOSE]
            ? "text-red-400"
            : "text-green-400"
        }`}
      >
        O<span className="mx-1">{currentPrice[OPEN]}</span> H
        <span className="mx-1">{currentPrice[HIGH]}</span> L
        <span className="mx-1">{currentPrice[LOW]}</span> C
        <span className="mx-1">{currentPrice[CLOSE]}</span>
      </div>
    </div>
  );
};

export default OhlcToolTip;
