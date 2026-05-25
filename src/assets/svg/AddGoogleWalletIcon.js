import * as React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';

const AddGoogleWalletIcon = props => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 41 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Rect width={41} height={40} fill="url(#pattern0_239_483)" />
    <Defs>
      <Pattern
        id="pattern0_239_483"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use
          xlinkHref="#image0_239_483"
          transform="matrix(0.00315731 0 0 0.00323625 -0.00201279 0)"
        />
      </Pattern>
      <Image
        id="image0_239_483"
        width={318}
        height={309}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,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"
      />
    </Defs>
  </Svg>
);
export default AddGoogleWalletIcon;
