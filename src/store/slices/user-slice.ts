import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchUser } from "../../api/User";

// Define the shape of your user state
interface UserState {
  username: string;
  userId: string;
  email: string;
  loading: boolean;
  error: string | null;
}

// Define the user data type for API responses


// Define the initial state
const loadUserDataFromLocalStorage = (): UserState | null => {
  const userData = localStorage.getItem("userData");
  return userData ? JSON.parse(userData) : null;
};

const saveUserDataToLocalStorage = (userData: UserState) => {
  localStorage.setItem("userData", JSON.stringify(userData));
};

// Async thunk to fetch user data
export const fetchUserThunk = createAsyncThunk<UserState>(
  "user/fetchUser",
  async () => {
    const response = await fetchUser();
    if (response.data.status === "success") {
      const userDataObj: UserState = {
        username: response.data.data.username,
        email: response.data.data.email,
        loading: false,
        error: null,
        userId: response.data.data._id,
      };
      saveUserDataToLocalStorage(userDataObj);
      return userDataObj;
    } else {
      throw new Error("Failed to fetch user");
    }
  }
);

// Initial state
const initialState: UserState = loadUserDataFromLocalStorage() || {
  username: "",
  userId: "",
  email: "",
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserState>) {
      const { username, email, error, loading, userId } = action.payload;
      state.username = username;
      state.userId = userId;
      state.email = email;
      state.loading = loading;
      state.error = error;

      saveUserDataToLocalStorage(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserThunk.pending, (state) => {
        state.loading = true;
        state.username = "";
        state.email = "";
        state.error = null;
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.userId = action.payload.userId;
        state.error = null;
      })
      .addCase(fetchUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.username = "";
        state.email = "";
        state.userId = "";
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export const { setUserData } = userSlice.actions;

// Selector
export const selectUser = (state: { user: UserState }) => state.user;

// Export reducer
export default userSlice.reducer;
