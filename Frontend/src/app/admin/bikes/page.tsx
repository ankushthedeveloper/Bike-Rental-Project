import React from "react";
import Bikes from "../../../components/bikes/Bikes";

const page = () => {
  return (
    <div className="pl-40">
      <Bikes isAdmin={true} />
    </div>
  );
};

export default page;
