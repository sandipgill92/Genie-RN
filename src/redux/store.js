import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './RegisterSlice';
import loginReducer from './LoginSlice';
import verifyOtpReducer from './VerifyOTPSlice';
import sendOtpReducer from './SendOTPSlice';

const store = configureStore({
  reducer: {
    registerReducer: registerReducer,
    loginReducer: loginReducer,
    verifyOtpReducer: verifyOtpReducer,
    sendOtpReducer: sendOtpReducer,
    sendOtpReducer: sendOtpReducer,
  },
});

export default store;
