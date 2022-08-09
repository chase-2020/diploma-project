/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconGou = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M384 768c-12.8 0-21.333333-4.266667-29.866667-12.8l-213.333333-213.333333c-17.066667-17.066667-17.066667-42.666667 0-59.733334s42.666667-17.066667 59.733333 0L384 665.6 823.466667 226.133333c17.066667-17.066667 42.666667-17.066667 59.733333 0s17.066667 42.666667 0 59.733334l-469.333333 469.333333c-8.533333 8.533333-17.066667 12.8-29.866667 12.8z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconGou.defaultProps = {
  size: 18,
};

IconGou = React.memo ? React.memo(IconGou) : IconGou;

export default IconGou;
