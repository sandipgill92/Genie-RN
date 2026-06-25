import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/Login/Index';
import Splash from './src/screens/Splash/Index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Guide from './src/screens/Guide/Index';
import Guide2 from './src/screens/Guide2/Index';
import Guide3 from './src/screens/Guide3/Index';
import SignUp from './src/screens/SignUp/SignUp';
import OTP from './src/screens/OTP/OTP';
import ForgotPassword from './src/screens/ForgotPassword/ForgotPassword';
import CreatePassword from './src/screens/CreatePassword/CreatePassword';
import LocationPermission from './src/screens/LocationPermission/LocationPermission';
import Location from './src/screens/Location/Location';
import Dashboard from './src/screens/Dashboard/Dashboard';
import Profile from './src/screens/Profile/Profile';
import EditProfile from './src/screens/EditProfile/EditProfile';
import EventTicket from './src/screens/EventTicket/EventTicket';
import EventTicketHIstoryViewDetail from './src/screens/EventTicketHIstoryViewDetail/EventTicketHIstoryViewDetail';
import MovieTicketDetail from './src/screens/MovieTicketDetail/MovieTicketDetail';
import GenieMoney from './src/screens/GenieMoney/GenieMoney';
import MovieReminder from './src/screens/MovieReminder/MovieReminder';
import PaymentSetting from './src/screens/PaymentSetting/PaymentSetting';
import HowCanWeHelpYou from './src/screens/HowCanWeHelpYou/HowCanWeHelpYou';
import Chat from './src/screens/Chat/Chat';
import EventDashboard from './src/screens/EventDashboard/EventDashboard';
import SeatSelection from './src/screens/SeatSelection/SeatSelection';
import InvoiceDetail from './src/screens/InvoiceDetail/InvoiceDetail';
import ReviewBooking from './src/screens/ReviewBooking/ReviewBooking';
import AddMoney from './src/screens/AddMoney/AddMoney';
import MoneyPaymentMethod from './src/screens/MoneyPaymentMethod/MoneyPaymentMethod';
import PaymentAddedSuccessfully from './src/screens/PaymentAddedSuccessfully/PaymentAddedSuccessfully';
import FinalReview from './src/screens/FinalReview/FinalReview';
import SuccessfulScreen from './src/screens/SuccessfulScreen/SuccessfulScreen';
import SelectPaymentMethod from './src/screens/SelectPaymentMethod/SelectPaymentMethod';
import PaymentMathodScreen2 from './src/screens/PaymentMathodScreen2/PaymentMathodScreen2';
import Ticket from './src/screens/TicketScreen/Ticket';
import TheatresNearMe from './src/screens/TheatresNearMe/TheatresNearMe';
import UpcomingMovies from './src/screens/UpcomingMovies/UpcomingMovies';
import MainMovieScreen from './src/screens/MainMovieScreen/MainMovieScreen';
import MainMovieScreenOption from './src/screens/MainMovieScreenOption/MainMovieScreenOption';
import SeatBooking from './src/screens/SeatBooking/SeatBooking';
import PreBookFood from './src/screens/PreBookFood/PreBookFood';
import ForgotPasswordEmailNumber from './src/screens/ForgotPasswordEmailNumber/ForgotPasswordEmailNumber';
import { Provider } from 'react-redux';
import store from './src/redux/store';

function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Guide" component={Guide} />
          <Stack.Screen name="Guide2" component={Guide2} />
          <Stack.Screen name="Guide3" component={Guide3} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="OTP" component={OTP} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="CreatePassword" component={CreatePassword} />
          <Stack.Screen
            name="LocationPermission"
            component={LocationPermission}
          />
          <Stack.Screen name="Location" component={Location} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="EventTicket" component={EventTicket} />
          <Stack.Screen
            name="EventTicketHIstoryViewDetail"
            component={EventTicketHIstoryViewDetail}
          />
          <Stack.Screen
            name="MovieTicketDetail"
            component={MovieTicketDetail}
          />
          <Stack.Screen name="GenieMoney" component={GenieMoney} />
          <Stack.Screen name="MovieReminder" component={MovieReminder} />
          <Stack.Screen name="PaymentSetting" component={PaymentSetting} />
          <Stack.Screen name="HowCanWeHelpYou" component={HowCanWeHelpYou} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="EventDashboard" component={EventDashboard} />
          <Stack.Screen name="SeatSelection" component={SeatSelection} />
          <Stack.Screen name="InvoiceDetail" component={InvoiceDetail} />
          <Stack.Screen name="ReviewBooking" component={ReviewBooking} />
          <Stack.Screen name="AddMoney" component={AddMoney} />
          <Stack.Screen
            name="MoneyPaymentMethod"
            component={MoneyPaymentMethod}
          />
          <Stack.Screen
            name="PaymentAddedSuccessfully"
            component={PaymentAddedSuccessfully}
          />
          <Stack.Screen name="FinalReview" component={FinalReview} />
          <Stack.Screen
            name="SelectPaymentMethod"
            component={SelectPaymentMethod}
          />
          <Stack.Screen name="SuccessfulScreen" component={SuccessfulScreen} />
          <Stack.Screen
            name="PaymentMathodScreen2"
            component={PaymentMathodScreen2}
          />
          <Stack.Screen name="Ticket" component={Ticket} />
          <Stack.Screen name="TheatresNearMe" component={TheatresNearMe} />
          <Stack.Screen name="UpcomingMovies" component={UpcomingMovies} />
          <Stack.Screen name="MainMovieScreen" component={MainMovieScreen} />
          <Stack.Screen
            name="MainMovieScreenOption"
            component={MainMovieScreenOption}
          />
          <Stack.Screen name="SeatBooking" component={SeatBooking} />
          <Stack.Screen name="PreBookFood" component={PreBookFood} />
          <Stack.Screen
            name="ForgotPasswordEmailNumber"
            component={ForgotPasswordEmailNumber}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
