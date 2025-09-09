import userSlice from "@/lib/states/auth.slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  user: userSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type ReduxState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
