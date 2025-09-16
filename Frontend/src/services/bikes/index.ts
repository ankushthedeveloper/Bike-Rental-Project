import { ServiceResponse } from "@/types/response";
import { getService } from "../common";
import { Bike } from "@/types/bike";

export const getAllBikes = async () => {
  const url = "/bikes";
  return await getService(url);
};

export const getBikeById = async (id: number) => {
  const url = `/bikes/${id}`;
  return await getService(url);
};
