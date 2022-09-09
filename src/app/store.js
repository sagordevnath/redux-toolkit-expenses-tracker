import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filter/filterSlice";
import transactionReducer, {
  createTransaction,
  fetchTransactions,
  removeTransaction
} from "../features/transaction/transactionSlice";

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    filter: filterReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat((store) => (next) => (action) => {
      if (action.type === removeTransaction.fulfilled.type) {
        // fetch before removing data that's why necessary to use setTimeout function;
        setTimeout(() => {
          store.dispatch(fetchTransactions({}));
        }, 1000);

        return next(action);
      }

      if (action.type === createTransaction.fulfilled.type) {
        store.dispatch(fetchTransactions({}));

        return next(action);
      }

      return next(action);
    }),
});
