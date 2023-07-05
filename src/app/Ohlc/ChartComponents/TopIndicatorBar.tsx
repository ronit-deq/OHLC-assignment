import { TbMathFunction } from "react-icons/tb";
import { BsArrowsFullscreen, BsCamera } from "react-icons/bs";
import { AiTwotoneSliders, AiOutlineSetting } from "react-icons/ai";

const TopIndicatorBar: React.FC = () => {
  return (
    <div className="flex justify-between pb-2">
      <div className="flex flex-row mx-2 space-x-2 p-2">
        <p>30m</p>
        <AiTwotoneSliders size={20} />
        <TbMathFunction size={20} />
        <p>Indicators</p>
      </div>
      <div className="flex flex-row mx-2 space-x-2 p-2">
        <AiOutlineSetting size={15} />
        <BsArrowsFullscreen size={15} />
        <BsCamera size={15} />
      </div>
    </div>
  );
};

export default TopIndicatorBar;
