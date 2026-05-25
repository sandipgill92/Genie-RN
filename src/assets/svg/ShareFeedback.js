import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ShareFeedback = props => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M15.5 11C15.5 11.3978 15.342 11.7794 15.0607 12.0607C14.7794 12.342 14.3978 12.5 14 12.5H4.121C3.72321 12.5001 3.34174 12.6582 3.0605 12.9395L1.409 14.591C1.33453 14.6655 1.23965 14.7162 1.13637 14.7367C1.03308 14.7572 0.926023 14.7467 0.82873 14.7064C0.731437 14.6661 0.648277 14.5979 0.589764 14.5103C0.531251 14.4227 0.500014 14.3198 0.5 14.2145V2C0.5 1.60218 0.658035 1.22064 0.93934 0.93934C1.22064 0.658035 1.60218 0.5 2 0.5H14C14.3978 0.5 14.7794 0.658035 15.0607 0.93934C15.342 1.22064 15.5 1.60218 15.5 2V11Z"
      stroke="#A19999"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.5 8C9.89782 8 10.2794 7.84196 10.5607 7.56066C10.842 7.27936 11 6.89782 11 6.5V5H9.5"
      stroke="#A19999"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5 8C5.39782 8 5.77936 7.84196 6.06066 7.56066C6.34196 7.27936 6.5 6.89782 6.5 6.5V5H5"
      stroke="#A19999"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ShareFeedback;
