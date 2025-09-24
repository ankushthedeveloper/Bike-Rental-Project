import { postService } from "../common";

export const createBike = async (bikeData: any) => {
  return postService("/bikes", bikeData);
};
export const updateBike = async (bikeId: string, bikeData: any) => {
  return postService(`/bikes/${bikeId}`, bikeData);
};
