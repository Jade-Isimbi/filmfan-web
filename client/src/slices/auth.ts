import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  email?: string;
  isAuthenticated: boolean;
}

const isLoggedIn = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token && token !== "undefined" && token !== "null";
};

const initialState: { user: UserState } = {
  user: {
    name: localStorage.getItem("name") || "",
    email: localStorage.getItem("email") || "",
    isAuthenticated: isLoggedIn(),
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthenticated: (
      state,
      action: PayloadAction<{ name: string; email?: string; token: string }>
    ) => {
      const { name, email, token } = action.payload;
      state.user = {
        name,
        email,
        isAuthenticated: true,
      };
      localStorage.setItem("name", name);
      localStorage.setItem("email", email || "");
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.user = {
        name: "",
        email: "",
        isAuthenticated: false,
      };
    },
  },
});

export const { setIsAuthenticated, logout } = userSlice.actions;

export default userSlice.reducer;
