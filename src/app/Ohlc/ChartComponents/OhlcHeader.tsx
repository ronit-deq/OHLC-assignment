import React from "react";
import Link from "next/link";
import { AiOutlineDown } from "react-icons/ai";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";
import { paths } from "@/app/Utils/paths";

const OhlcHeader: React.FC = () => {
  return (
    <div className="flex flex-row justify-between pt-2 my-2">
      <div className="flex flex-row">
        <AiOutlineDown color="white" className="m-1" />
        <h2 className="head2">
          <span>CHART </span>BTC/USD
        </h2>
      </div>

      <div className="flex flex-row justify-between">
        <input type="checkbox" id="showLiquidation" className="mb-2" />
        <label htmlFor="showLiquidation" className="showLiquidation ml-1">
          Show Liquidation
        </label>
        <FaCaretUp color="white" className="m-1" />
        <FaCaretDown color="white" className="m-1" />
        <BiRefresh color="#ccc" className="m-1" />
        <button className="record-button">
          <Link href={paths.orderBook}>ORDER BOOK</Link>
        </button>
      </div>
    </div>
  );
};

export default OhlcHeader;
