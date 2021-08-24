import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../";
import {
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchUser,
  getHttpErrorMsg,
  setToken,
} from "../../service";
import { IAuthState } from "./types";

const initialState: IAuthState = {
  isLoading: false,
  error: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: { ...initialState },
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      if (action.payload) state.error = null;
      state.isLoading = action.payload;
    },

    setUser: (
      state,
      action: PayloadAction<{ username: string; email: string }>
    ) => {
      state.user = action.payload;
    },

    clearState: (state) => {
      state.error = null;
      state.user = null;
    },
  },
});

const { setError, setLoading, setUser, clearState } = authSlice.actions;

export { clearState };

export const selectAutIsLoading = (state: RootState) => state.auth.isLoading;

export const selectAuthError = (state: RootState) => state.auth.error;

export const selectUser = (state: RootState) => state.auth.user;

export const loginAsync =
  (username: string, password: string): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const {
        data: { token, user },
      } = await fetchLogin(username, password);
      setToken(token);
      dispatch(setUser(user));
    } catch (error) {
      dispatch(setError(getHttpErrorMsg(error)));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const registerAsync =
  (username: string, email: string, password: string): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const {
        data: { token, user },
      } = await fetchRegister(username, email, password);
      setToken(token);
      dispatch(setUser(user));
    } catch (error) {
      dispatch(setError(getHttpErrorMsg(error)));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const logoutAsync = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await fetchLogout();
    dispatch(clearState());
  } catch (error) {
    dispatch(setError(getHttpErrorMsg(error)));
  } finally {
    dispatch(setLoading(false));
  }
};

export const getUserAsync = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data: user } = await fetchUser();
    dispatch(setUser(user));
  } catch (error) {
    dispatch(clearState());
  } finally {
    dispatch(setLoading(false));
  }
};

export const authReducer = authSlice.reducer;
