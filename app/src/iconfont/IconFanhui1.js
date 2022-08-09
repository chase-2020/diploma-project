/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconFanhui1 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M288.96 96v118.784h287.232c194.304 0 351.808 159.68 351.808 356.608S770.496 928 576.192 928H96v-90.048h480.192c145.28 0 262.976-119.36 262.976-266.56s-117.76-266.56-262.976-266.56H94.656v-46.144L259.456 96h29.504z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconFanhui1.defaultProps = {
  size: 18,
};

IconFanhui1 = React.memo ? React.memo(IconFanhui1) : IconFanhui1;

export default IconFanhui1;
