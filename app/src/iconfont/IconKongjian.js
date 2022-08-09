/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconKongjian = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M697.6 403.1H342l234.1 40.1-251.5 205h381.6l-225.5-48.8 216.9-196.3z m0 0"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M512 0C229.3 0 0 229.2 0 512s229.3 512 512 512 512-229.2 512-512S794.8 0 512 0z m332.9 420.3L714.8 530.6 758 808.3c-8.7 8.6-8.9 8.6-17.6 8.6L514.5 678.1 288.2 816.9c-17.3 0-19.1 0-19.1-8.6l31.1-277.7-137.3-121.5-46.9-33.3h-13.2v-1.4l13.2 1.4h269.3L420 314l86.7-183.3h17.4L619.5 314l34.7 61.8h234.1c8.7 0 8.7-5.1 8.7 3.6l-52.1 40.9z m0 0"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconKongjian.defaultProps = {
  size: 18,
};

IconKongjian = React.memo ? React.memo(IconKongjian) : IconKongjian;

export default IconKongjian;
