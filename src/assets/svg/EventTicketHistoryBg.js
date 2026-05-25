import * as React from 'react';
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

const EventTicketHistoryBg = props => (
  <Svg
    width={402}
    height={304}
    viewBox="0 0 402 304"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect x={-9} width={416} height={304} fill="url(#paint0_linear_452_506)" />
    <Defs>
      <LinearGradient
        id="paint0_linear_452_506"
        x1={199}
        y1={0}
        x2={199}
        y2={304}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#03C479" />
        <Stop offset={1} stopColor="white" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default EventTicketHistoryBg;
