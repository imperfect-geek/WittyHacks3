import { createSlice } from "@reduxjs/toolkit";
import api from "../api/apiService";

export const STATUS = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const initialState = {
  isAuth: false,
  user: null,
  status: { type: STATUS.IDLE, message: null },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin(state, action) {
      state.isAuth = true;
      state.user = action.payload;
    },
    userRegister(state, action) {
      state.isAuth = true;
      state.user = action.payload;
    },
    userLogout(state, action) {
      state.isAuth = false;
      state.user = null;
    },
    setStatus(state, action) {
      state.status.type = action.payload.type;
      state.status.message = action.payload.message;
    },
    clearAllErrors(state, action) {
      state.status = action.payload;
    },
  },
});

export const {
  clearAllErrors,
  setStatus,
  userLogin,
  userRegister,
  userLogout,
} = userSlice.actions;
export default userSlice.reducer;

export const user_login = (credential, password) => {
  return async function userLoginThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUS.LOADING, message: "Loading" }));
    try {
      console.log("logging in");

      const { data } = await api.post("login", { credential, password });
      console.log("logged in");
      console.log(data);

      dispatch(userLogin(data.user));
      dispatch(
        setStatus({
          type: STATUS.IDLE,
          message: "User Login Successfully",
        })
      );
    } catch (error) {
      if (error) {
        dispatch(
          setStatus({
            type: STATUS.ERROR,
            message: error.response.data.message,
          })
        );
      }
    }
  };
};

export const user_registration = (name, contact, email, address, password) => {
  return async function userRegistrationThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUS.LOADING, message: "Loading" }));
    try {
      const { data } = await api.post("signup", {
        name,
        email,
        contact,
        password,
        address,
      });
      dispatch(userRegister());
      dispatch(
        setStatus({
          type: STATUS.IDLE,
          message: "User Login Successfully",
        })
      );
    } catch (error) {
      if (error) {
        dispatch(
          setStatus({
            type: STATUS.ERROR,
            message: error.response.data.message,
          })
        );
      }
    }
  };
};

export const user_logout = (name, contact, email, address, password) => {
  return async function userLogoutThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUS.LOADING, message: "Loading" }));
    try {
      dispatch(userLogout());
      dispatch(
        setStatus({
          type: STATUS.IDLE,
          message: "User logout Successfully",
        })
      );
    } catch (error) {
      if (error) {
        dispatch(
          setStatus({
            type: STATUS.ERROR,
            message: error.response.data.message,
          })
        );
      }
    }
  };
};

// clear Users
export function clear_all_errors() {
  return async function clearErrorsThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUS.Idle, message: null }));
  };
}
