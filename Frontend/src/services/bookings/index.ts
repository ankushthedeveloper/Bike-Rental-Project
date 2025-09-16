import { postService } from "../common";

export const bookingService = async (data: Record<string, unknown>) => {
  const url = `/booking/create`;
  return await postService(url, data);
};
