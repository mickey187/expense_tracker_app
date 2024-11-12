import { AsyncThunkAction, configureStore, ThunkDispatch, UnknownAction, } from "@reduxjs/toolkit";
import userReducer, { fetchUserThunk } from './slices/user-slice';



// Create an init action creator
const init = () => (dispatch: (arg0: AsyncThunkAction<any, void, { state?: unknown; dispatch?: ThunkDispatch<unknown, unknown, UnknownAction>; extra?: unknown; rejectValue?: unknown; serializedErrorType?: unknown; pendingMeta?: unknown; fulfilledMeta?: unknown; rejectedMeta?: unknown; }>) => void) => {
  dispatch(fetchUserThunk());
};

// const middleware = [thunk];
const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
 
});

// Dispatch fetchCartItemsThunk with customerId from the user slice

// Dispatch the init action after store creation
store.dispatch(init());

export default store;
