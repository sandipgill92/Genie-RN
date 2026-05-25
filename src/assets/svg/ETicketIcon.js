import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ETicketIcon = props => (
  <Svg
    width={14}
    height={10}
    viewBox="0 0 14 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M0.5 3C0.997281 3 1.47419 3.19754 1.82583 3.54917C2.17746 3.90081 2.375 4.37772 2.375 4.875C2.375 5.37228 2.17746 5.84919 1.82583 6.20083C1.47419 6.55246 0.997281 6.75 0.5 6.75V8C0.5 8.33152 0.631696 8.64946 0.866116 8.88388C1.10054 9.1183 1.41848 9.25 1.75 9.25H11.75C12.0815 9.25 12.3995 9.1183 12.6339 8.88388C12.8683 8.64946 13 8.33152 13 8V6.75C12.5027 6.75 12.0258 6.55246 11.6742 6.20083C11.3225 5.84919 11.125 5.37228 11.125 4.875C11.125 4.37772 11.3225 3.90081 11.6742 3.54917C12.0258 3.19754 12.5027 3 13 3V1.75C13 1.41848 12.8683 1.10054 12.6339 0.866116C12.3995 0.631696 12.0815 0.5 11.75 0.5H1.75C1.41848 0.5 1.10054 0.631696 0.866116 0.866116C0.631696 1.10054 0.5 1.41848 0.5 1.75V3Z"
      stroke="#3C3C3C"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.375 0.5V1.75"
      stroke="#3C3C3C"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.375 8V9.25"
      stroke="#3C3C3C"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.375 4.25V5.5"
      stroke="#3C3C3C"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ETicketIcon;
