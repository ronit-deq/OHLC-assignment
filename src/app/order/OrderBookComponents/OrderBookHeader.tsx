import React from "react";
import Link from "next/link";
import {
  BsArrowBarRight,
  BsArrowBarLeft,
  BsFillBellFill,
  BsZoomIn,
  BsZoomOut,
} from "react-icons/bs";
import { AiFillSetting, AiOutlineDown } from "react-icons/ai";

const OrderBookHeader = () => {
  return (
    <div className="flex flex-row justify-between pt-2 mx-10 my-2">
      <div className="flex flex-row">
        <AiOutlineDown color="white" className="m-1" />
        <h2 className="head2">
          <span>ORDER BOOK </span>BTC/USD
        </h2>
      </div>

      <div className="flex flex-row justify-between">
        <BsArrowBarRight className="m-2" size={18} />
        <BsArrowBarLeft className="m-2" size={18} />
        <BsFillBellFill className="m-2" size={18} />
        <AiFillSetting className="m-2" size={18} />
        <BsZoomIn className="m-2" size={18} />
        <BsZoomOut className="m-2" size={18} />

        <button className="record-button px-7">
          <Link href="/">CHART</Link>
        </button>
      </div>
    </div>
  );
};

export default OrderBookHeader;
