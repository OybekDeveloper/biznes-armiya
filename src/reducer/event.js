import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  registerData: {
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
  },
  registerCode: "",
  regsiterDataError: {},
  registerLoading: false,
  generateCode: "",
  userData: {},
  groupData: [],
  registerSuccessData: {},
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    postRegisterSlice: (state, action) => {
      return {
        ...state,
        registerData: {
          ...state.registerData,
          [action.payload.name]: action.payload.value,
        },
      };
    },
    postRegisterError: (state, action) => {
      return {
        ...state,
        regsiterDataError: action.payload,
      };
    },
    registerLoadingSlice: (state, action) => {
      return {
        ...state,
        registerLoading: action.payload,
      };
    },
    verifyEmailSlices: (state, action) => {
      return {
        ...state,
        registerCode: action.payload,
      };
    },
    verifyGemerateCode: (state, action) => {
      return {
        ...state,
        generateCode: action.payload,
      };
    },
    userDetailSlice: (state, action) => {
      return {
        ...state,
        userData: action.payload,
      };
    },
    groupDetailSlice: (state, action) => {
      return {
        ...state,
        group: action.payload,
      };
    },
    setRegisterSuccessData: (state, action) => {
      return {
        ...state,
        registerSuccessData: action.payload,
      };
    },
    resetRegisterData: (state, action) => {
      return {
        ...state,
        registerData: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  postRegisterSlice,
  postRegisterError,
  registerLoadingSlice,
  verifyEmailSlices,
  verifyGemerateCode,
  userDetailSlice,
  groupDetailSlice,
  setRegisterSuccessData,
  resetRegisterData,
  
} = eventSlice.actions;

export default eventSlice.reducer;
