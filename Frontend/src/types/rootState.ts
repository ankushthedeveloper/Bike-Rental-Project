import { User } from "./user";

export interface ReduxState {
  user: {
    user: User | null;
  };
}
