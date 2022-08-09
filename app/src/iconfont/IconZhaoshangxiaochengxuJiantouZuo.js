/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconZhaoshangxiaochengxuJiantouZuo = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M333.4 513.1l408.1-407.7c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.4-33.9 0l-425 424.6-0.1 0.1c-9.4 9.4-9.4 24.6 0 33.9l423 422.5c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.4-24.6 0-33.9l-406-405.6z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconZhaoshangxiaochengxuJiantouZuo.defaultProps = {
  size: 18,
};

IconZhaoshangxiaochengxuJiantouZuo = React.memo ? React.memo(IconZhaoshangxiaochengxuJiantouZuo) : IconZhaoshangxiaochengxuJiantouZuo;

export default IconZhaoshangxiaochengxuJiantouZuo;
