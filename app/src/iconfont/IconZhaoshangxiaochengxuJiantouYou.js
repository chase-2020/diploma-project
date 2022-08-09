/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconZhaoshangxiaochengxuJiantouYou = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M741.5 496.1L317.4 71.5c-9.4-9.4-24.6-9.4-33.9 0-9.4 9.4-9.4 24.6 0 33.9l407.2 407.7-405.2 405.5c-9.4 9.4-9.4 24.6 0 33.9 9.4 9.4 24.6 9.4 33.9 0L741.5 530c9.4-9.3 9.4-24.5 0-33.9z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconZhaoshangxiaochengxuJiantouYou.defaultProps = {
  size: 18,
};

IconZhaoshangxiaochengxuJiantouYou = React.memo ? React.memo(IconZhaoshangxiaochengxuJiantouYou) : IconZhaoshangxiaochengxuJiantouYou;

export default IconZhaoshangxiaochengxuJiantouYou;
