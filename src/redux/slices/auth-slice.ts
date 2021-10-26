import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  phone: '',
  code: '',
  isSignedIn: false,
  isAuthorizing: false,
  fromBasket: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },

    setIsAuthorizing: (state, action: PayloadAction<boolean>) => {
      state.isAuthorizing = action.payload;
    },
    setIsSignedIn: (state, action: PayloadAction<boolean>) => {
      state.isSignedIn = action.payload;
    },
    setFromBasket: (state, action: PayloadAction<boolean>) => {
      state.fromBasket = action.payload;
    },
    logOut: () => {
      return initialState;
    },
  },
});

const { actions, reducer } = authSlice;

export const {
  setName,
  setPhone,
  setCode,
  logOut,
  setIsAuthorizing,
  setIsSignedIn,
  setFromBasket,
} = actions;

export default reducer;
