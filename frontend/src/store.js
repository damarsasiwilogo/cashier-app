import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./slices/transactionSlice";
import accountReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    // transaction: transactionReducer,
    account: accountReducer,
  },
});

export default store;
