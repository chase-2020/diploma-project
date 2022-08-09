/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconYoujiantou = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M698.181818 546.909091a35.141818 35.141818 0 0 1-24.669091-10.24l-372.363636-372.363636a34.909091 34.909091 0 0 1 49.338182-49.338182l372.363636 372.363636a34.676364 34.676364 0 0 1 0 49.338182 35.141818 35.141818 0 0 1-24.669091 10.24z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M325.818182 919.272727a35.141818 35.141818 0 0 1-24.669091-10.24 34.676364 34.676364 0 0 1 0-49.338182l372.363636-372.363636a34.909091 34.909091 0 0 1 49.338182 49.338182l-372.363636 372.363636a35.141818 35.141818 0 0 1-24.669091 10.24z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconYoujiantou.defaultProps = {
  size: 18,
};

IconYoujiantou = React.memo ? React.memo(IconYoujiantou) : IconYoujiantou;

export default IconYoujiantou;
