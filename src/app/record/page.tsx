import React from "react";
import RecordBook from "./RecordComponents/RecordBook";
import HeaderRecord from "./RecordComponents/HeaderRecord";
import FooterRecord from "./RecordComponents/FooterRecord";

const page = () => {
  return (
    <div className="flex flex-col justify-between record-book">
      <HeaderRecord />
      <RecordBook />
      <FooterRecord />
    </div>
  );
};

export default page;
