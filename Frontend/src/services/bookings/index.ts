import { getService, postService, putService } from "../common";

export const bookingService = async (data: Record<string, unknown>) => {
  const url = `/booking/create`;
  return await postService(url, data);
};

export const getActiveBookings = async (userId: string) => {
  const url = `/booking/active/user/${userId}`;
  return await getService(url);
};

export const getCompletedBookings = async (userId: string) => {
  const url = `/booking/completed/user/${userId}`;
  return await getService(url);
};
