/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconZuojiantou = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M230.4 512 742.4 0l51.2 51.2-460.8 460.8 460.8 460.8-51.2 51.2L230.4 512z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconZuojiantou.defaultProps = {
  size: 18,
};

IconZuojiantou = React.memo ? React.memo(IconZuojiantou) : IconZuojiantou;

export default IconZuojiantou;
