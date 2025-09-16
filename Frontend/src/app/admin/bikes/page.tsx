"use client";
import React from "react";
import Bikes from "../../../components/bikes/Bikes";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ReduxState } from "@/types/rootState";

const page = () => {
  return (
    <div>
      <Bikes isAdmin={true} />
    </div>
  );
};

export default page;
