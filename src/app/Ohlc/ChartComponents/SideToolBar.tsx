import React from "react";
import { HiOutlineTrendingUp } from "react-icons/hi";
import { MdOutlineFormatLineSpacing } from "react-icons/md";
import { FaPenNib } from "react-icons/fa";
import { BiText } from "react-icons/bi";
import { BsEmojiLaughing, BsMagnet } from "react-icons/bs";
import { LuRuler } from "react-icons/lu";
import { AiOutlineZoomIn, AiOutlinePlus } from "react-icons/ai";

const SideToolBar = () => {
  return (
    <div className="flex flex-col justify-around mt-10">
      <AiOutlinePlus className="tool-icon" size={22} />
      <HiOutlineTrendingUp className="tool-icon" size={22} />
      <MdOutlineFormatLineSpacing className="tool-icon" size={22} />
      <FaPenNib className="tool-icon" size={22} />
      <BiText className="tool-icon" size={22} />
      <BsEmojiLaughing className="tool-icon" size={22} />
      <LuRuler className="tool-icon" size={22} />
      <AiOutlineZoomIn className="tool-icon" size={22} />
      <BsMagnet className="tool-icon" size={22} />
    </div>
  );
};

export default SideToolBar;
