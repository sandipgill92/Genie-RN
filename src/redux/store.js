import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './RegisterSlice';
import loginReducer from './LoginSlice';
import verifyOtpReducer from './VerifyOTPSlice';
import sendOtpReducer from './SendOTPSlice';
import resetPasswordReducer from './ResetPasswordSlice';
import forgetPasswordReducer from './ForgetPasswordSlice';
import movieDashboardReducer from './MovieDashboardSlice';
import profileReducer from './ProfileSlice';
import eventTicketReducer from './EventTicketSlice';
import movieTicketReducer from './MovieTicketSlice';
import sportTicketReducer from './SportTicketSlice';
import voucherReducer from './VoucherSlice';
import walletReducer from './WalletSlice';
import reviewReducer from './ReviewSlice';
import typeMovieLocationReducer from './TypeMovieLocationSlice';
import paymentSettingReducer from './PaymentSettingSlice';
import appearanceReducer from './AppearanceSlice';
import faqReducer from './FaqSlice';
import supportTicketReducer from './SupportTicketSlice';
import supportFeedbackReducer from './SupportFeedbackSlice';
import accountSettingReducer from './AccountSettingSlice';
import logoutReducer from './LogoutSlice';

const store = configureStore({
  reducer: {
    registerReducer: registerReducer,
    loginReducer: loginReducer,
    verifyOtpReducer: verifyOtpReducer,
    sendOtpReducer: sendOtpReducer,
    resetPasswordReducer: resetPasswordReducer,
    forgetPasswordReducer: forgetPasswordReducer,
    movieDashboardReducer: movieDashboardReducer,
    profileReducer: profileReducer,
    eventTicketReducer: eventTicketReducer,
    movieTicketReducer: movieTicketReducer,
    sportTicketReducer: sportTicketReducer,
    voucherReducer: voucherReducer,
    walletReducer: walletReducer,
    reviewReducer: reviewReducer,
    typeMovieLocationReducer: typeMovieLocationReducer,
    supportFeedbackReducer: supportFeedbackReducer,
    paymentSettingReducer: paymentSettingReducer,
    appearanceReducer: appearanceReducer,
    faqReducer: faqReducer,
    supportTicketReducer: supportTicketReducer,
    accountSettingReducer: accountSettingReducer,
    logoutReducer: logoutReducer,
  },
});

export default store;
