import { createSlice } from "@reduxjs/toolkit";
import api from "../api/apiService";

export const STATUS = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const initialState = {
  ewaste: null,
  status: { type: STATUS.IDLE, message: null },
};

export const wasteSlice = createSlice({
  name: "waste",
  initialState,
  reducers: {
    uploadWaste(state, action) {},

    getWastes(state, action) {
      state.ewaste = action.payload;
    },
    sendMail(state, action) {},
    setStatus(state, action) {
      state.status.type = action.payload.type;
      state.status.message = action.payload.message;
    },
    clearAllErrors(state, action) {
      state.status = action.payload;
    },
  },
});

export const { clearAllErrors, setStatus, uploadWaste, getWastes, sendMail } =
  wasteSlice.actions;
export default wasteSlice.reducer;

export const upload_waste = (myForm) => {
  return async function uploadWasteThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUS.LOADING, message: "Loading" }));
    try {
      console.log(myForm);
      const { data } = await api.post("uploadfiles", myForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(uploadWaste());
      dispatch(
        setStatus({
          type: STATUS.IDLE,
          message: "upload successfull",
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

export const get_waste = () => {
  return async function getWastesThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUS.LOADING, message: "Loading" }));
    try {
      const { data } = await api.get("posts/1");
      dispatch(getWastes(data.posts));
      dispatch(
        setStatus({
          type: STATUS.IDLE,
          message: "data get successflly",
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

export const sent_mail = (sellerId, title) => {
  return async function sentMAilThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUS.LOADING, message: "Loading" }));
    try {
      const { data } = await api.post("notify", { sellerId, title });
      dispatch(sendMail());
      dispatch(
        setStatus({
          type: STATUS.IDLE,
          message: "mail sent ",
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
