import { getService } from "../common";

export async function getUserService() {
  const url = "/users";
  return await getService(url);
}
