/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconZhaoshangxiaochengxuJiantouXia = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M952.5 285.5c-9.4-9.4-24.6-9.4-33.9 0l-405.5 406-407.7-408c-9.4-9.4-24.6-9.4-33.9 0-9.4 9.4-9.4 24.6 0 33.9l424.6 425 0.1 0.1c9.4 9.4 24.6 9.4 33.9 0l422.5-423c9.3-9.4 9.3-24.6-0.1-34z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconZhaoshangxiaochengxuJiantouXia.defaultProps = {
  size: 18,
};

IconZhaoshangxiaochengxuJiantouXia = React.memo ? React.memo(IconZhaoshangxiaochengxuJiantouXia) : IconZhaoshangxiaochengxuJiantouXia;

export default IconZhaoshangxiaochengxuJiantouXia;
