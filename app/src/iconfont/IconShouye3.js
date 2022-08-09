/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconShouye3 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M1004.8 454.4L550.4 72s-1.6 0-1.6-1.6l-1.6-1.6-1.6-1.6C524.8 54.4 496 56 476.8 72l-456 382.4c-24 19.2-25.6 54.4-4.8 76.8s57.6 25.6 80 4.8l38.4-33.6V824c0 75.2 64 137.6 142.4 137.6h84.8c32 0 57.6-24 57.6-54.4V648c0-16 12.8-27.2 28.8-27.2h128c16 0 28.8 12.8 28.8 27.2v252.8c0 3.2 0 8 1.6 11.2l1.6 6.4c4.8 25.6 28.8 43.2 56 43.2h83.2c78.4 0 142.4-62.4 142.4-137.6V504l38.4 33.6c11.2 9.6 24 12.8 36.8 12.8 16 0 32-6.4 43.2-19.2 22.4-20.8 20.8-56-3.2-76.8z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconShouye3.defaultProps = {
  size: 18,
};

IconShouye3 = React.memo ? React.memo(IconShouye3) : IconShouye3;

export default IconShouye3;
