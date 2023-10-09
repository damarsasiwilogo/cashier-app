import { createSlice } from "@reduxjs/toolkit";

const transactionSlices = createSlice({
  name: "transaction",
  initialState: {
    ticketQuantities: 0,
    totalPrices: 0,
    discountedTotalPrices: 0,
    paymentMethod: "",
    productName: "",

    creditCardData: {
      cardHolder: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cvvNumber: "",
    },
    reducers: {
      setTicketQuantities: (state, action) => {
        state.ticketQuantities = action.payload;
      },
      setTotalPrices: (state, action) => {
        state.totalPrices = action.payload;
      },
      setDiscountedTotalPricesByReff: (state, action) => {
        state.discountedTotalPricesByReff = action.payload;
      },
      setDiscountedTotalPricesByCoupon: (state, action) => {
        state.discountedTotalPricesByCoupon = action.payload;
      },
      setDiscountedTotalPrices: (state) => {
        state.discountedTotalPrices =
          state.totalPrices -
          state.discountedTotalPricesByCoupon -
          state.discountedTotalPricesByReff;
      },
      setFormData: (state, action) => {
        state.formData = action.payload;
      },
      setCreditCardData: (state, action) => {
        state.creditCardData = action.payload;
      },
      setPaymentMethod: (state, action) => {
        state.paymentMethod = action.payload;
      },
      setEventName: (state, action) => {
        state.eventName = action.payload;
      },
      resetTransaction: (state) => {
        state.ticketQuantities = {
          Gold: 0,
          Platinum: 0,
          Diamond: 0,
        };
        state.totalPrices = 0;
        state.discountedTotalPrices = 0;
        state.discountedTotalPricesByCoupon = 0;
        state.discountedTotalPricesByReff = 0;
        state.formData = {
          name: "",
          email: "",
          telepon: "",
          date: "",
          month: "",
          year: "",
        };
      },
    },
  },
});

export const {
  setTicketQuantities,
  setTotalPrices,
  setDiscountedTotalPrices,
  setDiscountedTotalPricesByReff,
  setDiscountedTotalPricesByCoupon,
  setFormData,
  resetTransaction,
  setPaymentMethod,
  setCreditCardData,
  setEventName,
} = transactionSlices.actions;
export default transactionSlices.reducer;
