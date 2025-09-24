export type UserRole = "user" | "admin" | "manager";
export type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  role: UserRole;
  authToken?: string;
};
