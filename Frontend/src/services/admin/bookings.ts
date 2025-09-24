import { Booking } from "@/types/booking";
import { deleteService, getService, putService } from "../common";

export const getAllBookings = async (): Promise<Booking[]> => {
  const url = `/booking`;
  const response = await getService(url);
  return response.data as Booking[];
};

export const deleteBooking = async (id: number) => {
  const url = `/booking/${id}`;
  return await deleteService(url);
};

export const markBookingAsCompleted = async (id: number) => {
  const url = `/booking/complete/${id}`;
  return await putService(url, {});
};
