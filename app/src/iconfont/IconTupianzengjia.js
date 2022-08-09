/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconTupianzengjia = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M917.2 66.5H108.5C85 66.5 65.9 85.6 65.9 109v808.7c0 23.5 19.1 42.6 42.6 42.6h808.7c23.5 0 42.6-19.1 42.6-42.6V109c-0.1-23.4-19.2-42.5-42.6-42.5zM108.5 917.7V109h808.7v808.7H108.5z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M715 481.5H544.7V311.2c0-17.6-14.4-31.9-31.9-31.9-17.6 0-31.9 14.4-31.9 31.9v170.3H310.6c-17.6 0-31.9 14.4-31.9 31.9 0 17.6 14.4 31.9 31.9 31.9h170.3v170.3c0 17.6 14.4 31.9 31.9 31.9 17.6 0 31.9-14.4 31.9-31.9V545.3H715c17.6 0 31.9-14.4 31.9-31.9 0-17.6-14.3-31.9-31.9-31.9z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconTupianzengjia.defaultProps = {
  size: 18,
};

IconTupianzengjia = React.memo ? React.memo(IconTupianzengjia) : IconTupianzengjia;

export default IconTupianzengjia;
