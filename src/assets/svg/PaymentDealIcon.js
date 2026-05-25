import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const PaymentDealIcon = props => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 15 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M12.5 0.5H1.83333C1.09695 0.5 0.5 1.02233 0.5 1.66667V7.5C0.5 8.14433 1.09695 8.66667 1.83333 8.66667H12.5C13.2364 8.66667 13.8333 8.14433 13.8333 7.5V1.66667C13.8333 1.02233 13.2364 0.5 12.5 0.5Z"
      stroke="#3C3C3C"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M0.5 3.41699H13.8333"
      stroke="#3C3C3C"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default PaymentDealIcon;
