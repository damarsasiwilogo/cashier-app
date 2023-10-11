import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //Registration
  users: [],
  totalData: 0,
  isLoaded: false,
  //Login
  isLoggedIn: window.localStorage.getItem("isLoggedIn") === "true",
  profile: window.localStorage.getItem("profile")
    ? JSON.parse(window.localStorage.getItem("profile"))
    : {},
};

const accountSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    //Registration
    setInitialData(state, action) {
      state.users = action.payload;
      state.totalData = action.payload.length.length;
      state.isLoaded = true;
    },
    add(state, action) {
      state.users.push(action.payload);
      state.totalData++;
    },
    //Login
    login(state, action) {
      state.isLoggedIn = true;
      state.profile = action.payload;
      window.localStorage.setItem("isLoggedIn", "true");
      window.localStorage.setItem("profile", JSON.stringify(action.payload));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.profile = {};
      window.localStorage.setItem("isLoggedIn", false);
      window.localStorage.setItem("profile", JSON.stringify({}));
    },
  },
});

export const { setInitialData, add, login, logout } = accountSlice.actions;
export default accountSlice.reducer;
