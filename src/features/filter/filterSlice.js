import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { filterByType } from "./filterAPI";

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
  editing: {},
  totalCount: 0,
  searchTerm: ''
};

// async thunks
export const filterType = createAsyncThunk(
  "transaction/filterByType",
  async ({ type, page, searchTerm, limit }) => {
    const transactions = await filterByType(type, page, searchTerm, limit);
    return transactions;
  }
);

// create slice
const filterSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload;
    },
    editInActive: (state) => {
      state.editing = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterType.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(filterType.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transactions = action.payload.data;
        state.totalCount = action.payload.totalCount;
        state.searchTerm = action.payload.searchTerm
      })
      .addCase(filterType.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.transactions = [];
      })
  },
});

export default filterSlice.reducer;
export const { editActive, editInActive } = filterSlice.actions;
