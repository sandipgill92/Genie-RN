import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const AboutUsIcon = props => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M8 15.5C12.1421 15.5 15.5 12.1421 15.5 8C15.5 3.85786 12.1421 0.5 8 0.5C3.85786 0.5 0.5 3.85786 0.5 8C0.5 12.1421 3.85786 15.5 8 15.5Z"
      stroke="#A19999"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 5V8"
      stroke="#A19999"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 11H8.0075"
      stroke="#A19999"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default AboutUsIcon;
